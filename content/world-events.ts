import type { EventAssetSrc, WorldEventPhoto } from '@/lib/types';

export const worldEventPhotos = [
	{
		src: '/images/events/aracaju/world/aracaju-world-01.jpg',
		location: 'Aracaju',
		date: 'Julho de 2026',
		alt: 'Participantes do encontro da comunidade Cursor em Aracaju',
	},
	{
		src: '/images/events/canela/world/canela-world-01.jpg',
		location: 'Canela',
		date: 'Julho de 2026',
		alt: 'Palestrante no workshop da comunidade Cursor em Canela',
	},
	{
		src: '/images/events/sp/world/sp-world-01.jpg',
		location: 'São Paulo',
		date: 'Maio de 2026',
		alt: 'Participantes conversando no Cursor Meetup São Paulo',
	},
	{
		src: '/images/events/floripa/world/floripa-world-01.jpg',
		location: 'Florianópolis',
		date: 'Janeiro de 2026',
		alt: 'Participantes programando juntos no Cafe Cursor em Florianópolis',
	},
] satisfies EventAssetSrc<WorldEventPhoto>[];
