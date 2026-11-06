'use client';

import React, { useMemo, useState } from 'react';
import type { CursorEvent } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { TextLink } from '@/components/ui';
import { mapCityBySlug } from '@/lib/brazil-map';
import BrazilEventMap from '@/components/BrazilEventMap';

type PastEventsProps = {
	events: CursorEvent[];
};

type ListFilter = 'todos' | 'proximos' | 'passados';
type CityFilter = 'proximos' | 'passados';

const INITIAL_COUNT = 4;
const LOAD_STEP = 8;

function byDate(left: CursorEvent, right: CursorEvent, direction: 'asc' | 'desc'): number {
	const result = (left.date ?? '').localeCompare(right.date ?? '');
	return direction === 'asc' ? result : -result;
}

function ordered(events: CursorEvent[]): CursorEvent[] {
	const upcoming = events.filter((event) => event.status === 'upcoming').sort((a, b) => byDate(a, b, 'asc'));
	const past = events.filter((event) => event.status === 'past').sort((a, b) => byDate(a, b, 'desc'));
	return [...upcoming, ...past];
}

function matchesList(event: CursorEvent, filter: ListFilter): boolean {
	if (filter === 'proximos') return event.status === 'upcoming';
	if (filter === 'passados') return event.status === 'past';
	return true;
}

const EventRow: React.FC<{ event: CursorEvent }> = ({ event }) => {
	const { t } = useI18n();
	return (
		<article className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-cursor-border py-4">
			<div className="min-w-0">
				<p className="text-xs uppercase tracking-wide text-cursor-text-muted">
					{event.status === 'upcoming' ? (
						<span className="text-cursor-accent-orange">{t('home.nextLabel')}</span>
					) : null}
					{event.status === 'upcoming' ? ' · ' : ''}
					{event.displayDate}
				</p>
				<h4 className="mt-1 text-base font-normal tracking-tight text-cursor-text">{event.title}</h4>
			</div>
			{event.lumaUrl ? (
				<TextLink href={event.lumaUrl} external caret={false}>
					{t('home.luma')}
				</TextLink>
			) : null}
		</article>
	);
};

const FilterButton: React.FC<{
	active: boolean;
	onClick: () => void;
	children: React.ReactNode;
}> = ({ active, onClick, children }) => (
	<button
		type="button"
		onClick={onClick}
		aria-pressed={active}
		className={`pb-1 text-sm ${active ? 'border-b border-cursor-text text-cursor-text' : 'text-cursor-text-muted'}`}
	>
		{children}
	</button>
);

const PastEvents: React.FC<PastEventsProps> = ({ events }) => {
	const { t } = useI18n();
	const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
	const [listFilter, setListFilter] = useState<ListFilter>('todos');
	const [cityFilter, setCityFilter] = useState<CityFilter>('proximos');
	const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

	const list = useMemo(() => ordered(events.filter((event) => matchesList(event, listFilter))), [events, listFilter]);
	const visible = list.slice(0, visibleCount);
	const city = selectedSlug ? mapCityBySlug(selectedSlug) : undefined;
	const cityEvents = useMemo(() => {
		if (!selectedSlug) return [];
		return ordered(
			events.filter(
				(event) =>
					event.citySlug === selectedSlug && event.status === (cityFilter === 'proximos' ? 'upcoming' : 'past'),
			),
		);
	}, [events, selectedSlug, cityFilter]);

	if (events.length === 0) return null;

	return (
		<section id="recaps" className="mb-20 scroll-mt-20">
			<p className="cursor-eyebrow mb-2">{t('home.pastEvents')}</p>
			<h2 className="cursor-section-title mb-2 text-cursor-text">{t('home.pastEventsHeading')}</h2>
			<p className="mb-8 text-sm text-cursor-text-muted">{t('home.pastEventsIntro')}</p>

			<div className={`border border-cursor-border ${city ? 'md:grid md:grid-cols-2' : ''}`}>
				<BrazilEventMap events={events} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
				{city ? (
					<div className="border-t border-cursor-border p-6 md:border-t-0 md:border-l">
						<h3 className="text-2xl font-normal tracking-tight text-cursor-text">{city.name}</h3>
						<div className="mt-4 flex gap-6">
							<FilterButton active={cityFilter === 'proximos'} onClick={() => setCityFilter('proximos')}>
								{t('home.filterUpcoming')}
							</FilterButton>
							<FilterButton active={cityFilter === 'passados'} onClick={() => setCityFilter('passados')}>
								{t('home.filterPast')}
							</FilterButton>
						</div>
						<div className="mt-2">
							{cityEvents.length === 0 ? (
								<p className="py-6 text-sm text-cursor-text-muted">{t('home.emptyEvents')}</p>
							) : (
								cityEvents.map((event) => <EventRow key={event.id} event={event} />)
							)}
						</div>
					</div>
				) : null}
			</div>

			<div className="mt-8 flex gap-6">
				<FilterButton
					active={listFilter === 'todos'}
					onClick={() => {
						setListFilter('todos');
						setVisibleCount(INITIAL_COUNT);
					}}
				>
					{t('home.filterAll')}
				</FilterButton>
				<FilterButton
					active={listFilter === 'proximos'}
					onClick={() => {
						setListFilter('proximos');
						setVisibleCount(INITIAL_COUNT);
					}}
				>
					{t('home.filterUpcoming')}
				</FilterButton>
				<FilterButton
					active={listFilter === 'passados'}
					onClick={() => {
						setListFilter('passados');
						setVisibleCount(INITIAL_COUNT);
					}}
				>
					{t('home.filterPast')}
				</FilterButton>
			</div>

			<div className="mt-2">
				{visible.map((event) => (
					<EventRow key={event.id} event={event} />
				))}
			</div>

			{visibleCount < list.length ? (
				<div className="mt-6 flex flex-col items-center gap-3">
					<button
						type="button"
						onClick={() => setVisibleCount((count) => count + LOAD_STEP)}
						className="border border-cursor-border px-4 py-2 text-sm text-cursor-text-secondary"
					>
						{t('home.loadMore')}
					</button>
					<p className="text-xs text-cursor-text-muted">
						{t('home.showingCount', { shown: String(visible.length), total: String(list.length) })}
					</p>
				</div>
			) : null}
		</section>
	);
};

export default PastEvents;
