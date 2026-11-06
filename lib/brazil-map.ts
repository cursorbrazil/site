export interface MapCity {
	slug: string;
	name: string;
	lat: number;
	lng: number;
}

const WEST = -74;
const EAST = -34;
const NORTH = 6;
const SOUTH = -34;
const PAD = 8;

export const mapCities: MapCity[] = [
	{ slug: 'aracaju', name: 'Aracaju', lat: -10.947, lng: -37.073 },
	{ slug: 'belo-horizonte', name: 'Belo Horizonte', lat: -19.917, lng: -43.934 },
	{ slug: 'canela', name: 'Canela', lat: -29.365, lng: -50.814 },
	{ slug: 'curitiba', name: 'Curitiba', lat: -25.429, lng: -49.271 },
	{ slug: 'florianopolis', name: 'Florianópolis', lat: -27.595, lng: -48.548 },
	{ slug: 'goiania', name: 'Goiânia', lat: -16.686, lng: -49.264 },
	{ slug: 'jacobina', name: 'Jacobina', lat: -11.181, lng: -40.536 },
	{ slug: 'nova-lima', name: 'Nova Lima', lat: -19.986, lng: -43.847 },
	{ slug: 'passo-fundo', name: 'Passo Fundo', lat: -28.262, lng: -52.409 },
	{ slug: 'pelotas', name: 'Pelotas', lat: -31.765, lng: -52.337 },
	{ slug: 'porto-alegre', name: 'Porto Alegre', lat: -30.034, lng: -51.217 },
	{ slug: 'recife', name: 'Recife', lat: -8.054, lng: -34.881 },
	{ slug: 'rio-de-janeiro', name: 'Rio de Janeiro', lat: -22.907, lng: -43.173 },
	{ slug: 'salvador', name: 'Salvador', lat: -12.977, lng: -38.502 },
	{ slug: 'sao-paulo', name: 'São Paulo', lat: -23.551, lng: -46.633 },
	{ slug: 'sorocaba', name: 'Sorocaba', lat: -23.502, lng: -47.458 },
	{ slug: 'vitoria-da-conquista', name: 'Vitória da Conquista', lat: -14.861, lng: -40.844 },
];

const outline: Array<[number, number]> = [
	[-60.2, 5.2],
	[-56.0, 2.0],
	[-51.0, 4.3],
	[-49.9, 1.6],
	[-48.0, -0.5],
	[-44.5, -2.2],
	[-41.5, -2.8],
	[-38.7, -3.6],
	[-37.2, -4.8],
	[-35.2, -5.8],
	[-35.0, -6.5],
	[-34.8, -7.5],
	[-34.85, -8.1],
	[-35.1, -8.8],
	[-35.7, -9.6],
	[-37.0, -10.9],
	[-37.4, -11.5],
	[-38.5, -13.0],
	[-38.9, -15.6],
	[-39.3, -17.8],
	[-39.7, -19.6],
	[-40.3, -20.3],
	[-40.9, -21.3],
	[-41.8, -22.4],
	[-43.2, -22.95],
	[-44.5, -23.2],
	[-45.8, -23.7],
	[-47.0, -24.5],
	[-48.4, -25.6],
	[-48.5, -27.4],
	[-48.6, -28.5],
	[-49.3, -29.3],
	[-50.2, -31.2],
	[-52.2, -33.7],
	[-53.4, -33.6],
	[-55.5, -31.0],
	[-57.6, -30.2],
	[-56.0, -27.3],
	[-54.3, -25.6],
	[-54.6, -23.8],
	[-55.5, -22.2],
	[-56.5, -20.2],
	[-57.8, -18.0],
	[-57.6, -16.2],
	[-60.1, -13.0],
	[-62.5, -12.5],
	[-65.0, -11.0],
	[-68.7, -11.0],
	[-70.5, -9.5],
	[-72.8, -8.2],
	[-73.5, -7.3],
	[-72.0, -5.5],
	[-70.0, -4.2],
	[-67.5, -1.5],
	[-65.0, 0.5],
	[-62.0, 2.2],
	[-60.2, 5.2],
];

export function projectBrazil(lat: number, lng: number): { x: number; y: number } {
	const x = PAD + ((lng - WEST) / (EAST - WEST)) * (100 - PAD * 2);
	const y = PAD + ((NORTH - lat) / (NORTH - SOUTH)) * (100 - PAD * 2);
	return { x, y };
}

export const brazilOutline = outline
	.map(([lng, lat]) => {
		const point = projectBrazil(lat, lng);
		return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
	})
	.join(' ');

export function mapCityBySlug(slug: string): MapCity | undefined {
	return mapCities.find((city) => city.slug === slug);
}
