import type { AggregatedPastEvents, CursorEvent, PastEventWithLocalThumbnail } from '@/lib/types';
import { chapters } from '@/content/chapters';
import { pastEvents as manualPastEvents, upcomingEvents as manualUpcomingEvents } from '@/content/events';
import { siteConfig } from '@/content/site.config';
import { fetchCalendarEvents, mapLumaEventToCursor, type LumaEventPeriod } from '@/lib/luma';

const MAX_PAST_EVENTS = 12;
const PAST_EVENTS_PER_CHAPTER = 3;

export interface AggregatedEvents {
	events: CursorEvent[];
	errors: Array<{ chapterSlug: string; error: string }>;
}

// Entradas manuais em content/events.ts vencem as vindas do Luma, o que
// permite curar titulo, thumbnail, recapPath ou host de um evento sem perder
// o feed automatico.
function dedupeByLumaUrl(events: CursorEvent[]): CursorEvent[] {
	const seenUrls = new Set<string>();
	const deduped: CursorEvent[] = [];

	for (const event of events) {
		const key = event.lumaUrl?.replace(/\/+$/, '').toLowerCase();
		if (key) {
			if (seenUrls.has(key)) continue;
			seenUrls.add(key);
		}
		deduped.push(event);
	}

	return deduped;
}

function hasLocalThumbnail(event: CursorEvent): event is PastEventWithLocalThumbnail {
	return typeof event.thumbnail === 'string' && event.thumbnail.startsWith('/');
}

async function aggregateFromLuma(
	period: LumaEventPeriod,
	status: CursorEvent['status'],
	paginationLimit: number,
): Promise<AggregatedEvents> {
	const settled = await Promise.allSettled(
		chapters.map(async (chapter) => {
			const lumaEvents = await fetchCalendarEvents(chapter.lumaCalendarId, period, paginationLimit);
			return lumaEvents
				.map((lumaEvent) => mapLumaEventToCursor(lumaEvent, chapter, siteConfig.defaultLocale, status))
				.filter((event): event is CursorEvent => event !== null);
		}),
	);

	const errors: AggregatedEvents['errors'] = [];
	const events: CursorEvent[] = [];
	settled.forEach((result, index) => {
		if (result.status === 'fulfilled') {
			events.push(...result.value);
		} else {
			errors.push({
				chapterSlug: chapters[index].slug,
				error: result.reason instanceof Error ? result.reason.message : String(result.reason),
			});
		}
	});

	if (errors.length > 0) {
		console.warn(`[luma] partial calendar failures (${period}):`, errors);
	}

	return { events, errors };
}

export async function getAggregatedUpcomingEvents(): Promise<AggregatedEvents> {
	const { events: fromLuma, errors } = await aggregateFromLuma('future', 'upcoming', 20);

	const events = dedupeByLumaUrl([...manualUpcomingEvents, ...fromLuma]).sort((a, b) =>
		(a.date ?? '9999').localeCompare(b.date ?? '9999'),
	);

	return { events, errors };
}

export async function getAggregatedPastEvents(): Promise<AggregatedPastEvents> {
	const { events: fromLuma, errors } = await aggregateFromLuma('past', 'past', PAST_EVENTS_PER_CHAPTER);

	const events = dedupeByLumaUrl([...manualPastEvents, ...fromLuma])
		.filter(hasLocalThumbnail)
		.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
		.slice(0, MAX_PAST_EVENTS);

	return { events, errors };
}
