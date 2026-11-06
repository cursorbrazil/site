import { pastEvents } from '@/content/events';
import { driveEvents } from '@/content/drive-events';
import type { CursorEvent } from '@/lib/types';

function lumaKey(url: string | undefined): string | undefined {
	return url?.replace(/\/+$/, '').toLowerCase();
}

export function getRecapEvents(): CursorEvent[] {
	const photos = new Map<string, CursorEvent>();
	for (const event of pastEvents) {
		const key = lumaKey(event.lumaUrl);
		if (key) photos.set(key, event);
	}

	return driveEvents.map((event) => {
		const manual = lumaKey(event.lumaUrl);
		const photo = manual ? photos.get(manual) : undefined;
		if (!photo) return event;
		return {
			...event,
			id: photo.id,
			thumbnail: photo.thumbnail,
			galleryImages: photo.galleryImages,
		};
	});
}
