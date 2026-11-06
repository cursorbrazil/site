'use client';

import React from 'react';
import type { CursorEvent } from '@/lib/types';
import { brazilOutline, mapCities, projectBrazil } from '@/lib/brazil-map';
import { useI18n } from '@/lib/i18n';

type BrazilEventMapProps = {
	events: CursorEvent[];
	selectedSlug: string | null;
	onSelect: (slug: string | null) => void;
};

const BrazilEventMap: React.FC<BrazilEventMapProps> = ({ events, selectedSlug, onSelect }) => {
	const { t } = useI18n();
	const counts = new Map<string, { total: number; upcoming: number }>();
	for (const event of events) {
		if (!event.citySlug) continue;
		const current = counts.get(event.citySlug) ?? { total: 0, upcoming: 0 };
		current.total += 1;
		if (event.status === 'upcoming') current.upcoming += 1;
		counts.set(event.citySlug, current);
	}

	return (
		<div className="flex min-h-[280px] flex-col p-4 md:p-6">
			<div className="relative mx-auto aspect-square w-full max-w-[520px]">
				<svg viewBox="0 0 100 100" className="h-full w-full text-cursor-border" aria-hidden="true">
					<polygon points={brazilOutline} fill="none" stroke="currentColor" strokeWidth="0.35" />
				</svg>
				{mapCities.map((city) => {
					const count = counts.get(city.slug);
					if (!count) return null;
					const point = projectBrazil(city.lat, city.lng);
					const selected = selectedSlug === city.slug;
					const upcoming = count.upcoming > 0;
					return (
						<button
							key={city.slug}
							type="button"
							aria-pressed={selected}
							aria-label={city.name}
							onClick={() => onSelect(selected ? null : city.slug)}
							className={`absolute flex h-6 min-w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center border px-1 text-[10px] leading-none ${
								selected
									? 'border-cursor-accent-orange bg-cursor-accent-orange text-cursor-bg'
									: upcoming
										? 'border-cursor-accent-orange bg-cursor-bg text-cursor-accent-orange'
										: 'border-cursor-border bg-cursor-bg text-cursor-text-muted'
							}`}
							style={{ left: `${point.x}%`, top: `${point.y}%` }}
						>
							{count.total}
						</button>
					);
				})}
			</div>
			<div className="mt-4 flex gap-4 text-xs text-cursor-text-muted">
				<span className="inline-flex items-center gap-2">
					<span className="inline-block h-2.5 w-2.5 border border-cursor-border" aria-hidden="true" />
					{t('home.mapLegendRecaps')}
				</span>
				<span className="inline-flex items-center gap-2">
					<span className="inline-block h-2.5 w-2.5 border border-cursor-accent-orange" aria-hidden="true" />
					{t('home.mapLegendUpcoming')}
				</span>
			</div>
		</div>
	);
};

export default BrazilEventMap;
