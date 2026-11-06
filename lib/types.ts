export type LocaleCode = string;

export interface CursorEvent {
	id: string;
	title: string;
	titleLocal?: string;
	date?: string;
	displayDate: string;
	attendees?: number;
	location: string;
	lumaUrl?: string;
	recapPath?: string;
	thumbnail?: string;
	galleryImages?: string[];
	status: 'upcoming' | 'past';
	host?: { name: string; logo: string; url?: string };
	citySlug?: string;
}

export interface SocialLinks {
	x?: string;
	instagram?: string;
	linkedin?: string;
	github?: string;
	/** Perfil publico em cursor.com (ex.: https://cursor.com/@hdoria). */
	cursor?: string;
	website?: string;
}

export interface Ambassador {
	name: string;
	role?: string;
	/** Optional; cards without a photo render the person's initials. */
	photo?: string;
	links: SocialLinks;
}

export interface ChapterOrganizer {
	name: string;
	url?: string;
}

export interface Chapter {
	slug: string;
	city: string;
	state?: string;
	organizers: ChapterOrganizer[];
	/** Luma calendar api id (cal-...), used by the server-side event aggregation. */
	lumaCalendarId: string;
	/** Public Luma calendar page for the chapter. */
	lumaUrl: string;
	/** Site proprio do capitulo, quando existir (ex.: cursorpoa.com.br). */
	website?: string;
	whatsapp?: string;
	instagram?: string;
}

export interface Partner {
	name: string;
	logo: string;
	url: string;
	logoBg?: string;
	logoHeight?: string;
}

export interface FeaturedResource {
	title: string;
	description: string;
	href: string;
	ctaLabel: string;
}

export interface BentoImage {
	src: string;
	alt: string;
	/** CSS object-position para ajustar o corte no tile (ex.: 'center 30%'). */
	objectPosition?: string;
}

export interface BentoSlot {
	row: number;
	col: number;
	rowSpan?: number;
	colSpan?: number;
	mobile?: {
		row: number;
		col: number;
		rowSpan?: number;
		colSpan?: number;
	};
	mobileHidden?: boolean;
}

export interface HeaderPhoto extends BentoSlot, BentoImage {}

export interface HeroBentoPhotos {
	desktop: HeaderPhoto[];
	mobile: HeaderPhoto[];
}

export interface GalleryPhoto {
	src: string;
	alt: string;
}

export interface RecapPhotoCredit {
	name: string;
	url?: string;
}

export interface RecapSpeaker {
	name: string;
	topic: string;
	photo?: string;
	url?: string;
}

export interface RecapProject {
	name: string;
	description: string;
	author?: string;
	url?: string;
}

export interface RecapHighlight {
	quote: string;
	author?: string;
}

export interface RecapResource {
	label: string;
	url: string;
}

export interface RecapData {
	slug: string;
	title: string;
	date: string;
	attendees?: number;
	summary: string[];
	host?: { name: string; logo: string; url?: string };
	speakers?: RecapSpeaker[];
	projects?: RecapProject[];
	highlights?: RecapHighlight[];
	resources?: RecapResource[];
	photoCredits?: RecapPhotoCredit[];
	photos: GalleryPhoto[];
}

export interface WorldEventPhoto {
	src: string;
	location: string;
	date?: string;
	alt: string;
}

export interface SiteSections {
	matchmaking?: boolean;
	photoDisclaimer?: boolean;
	lumaCalendar?: boolean;
	communityTweets?: boolean;
}
