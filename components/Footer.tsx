'use client';

import React from 'react';
import Image from 'next/image';
import type { CursorEvent } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { siteConfig } from '@/content/site.config';
import Partners from '@/components/Partners';
import { Button, TextLink } from '@/components/ui';
import { MarketingColumn, MarketingGrid } from '@/components/layout/MarketingGrid';

type FooterProps = {
	upcomingEvents?: CursorEvent[];
};

const Footer: React.FC<FooterProps> = ({ upcomingEvents = [] }) => {
	const { t } = useI18n();
	const nextEvent = upcomingEvents[0];
	const joinUrl = nextEvent?.lumaUrl ?? siteConfig.lumaUrl;
	const joinIsExternal = joinUrl.startsWith('http');

	return (
		<footer className="border-t border-cursor-border py-10">
			<MarketingGrid>
				<MarketingColumn width="full">
					<Partners />

					<div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
						<div>
							<div className="mb-3 flex items-center gap-2">
								<Image
									src="/cursor-logo.svg"
									alt="Cursor"
									width={90}
									height={24}
									className="cursor-wordmark h-5 w-auto"
								/>
								<span className="text-sm text-cursor-text-muted">{siteConfig.communityNameLocal}</span>
							</div>
							<div className="flex flex-wrap gap-x-5 gap-y-2">
								<TextLink href="/#events" muted>
									{t('footer.allEvents')}
								</TextLink>
								<TextLink href={siteConfig.cursorCommunityUrl} external muted>
									{t('footer.community')}
								</TextLink>
								<TextLink href="https://x.com/cursor_ai" external muted>
									{t('footer.followUs')}
								</TextLink>
							</div>
							<p className="mt-4 text-xs text-cursor-text-faint">{siteConfig.footerTagline || t('footer.madeWith')}</p>
							{/* Atribuicao obrigatoria do template (NOTICE / ATTRIBUTION.md) */}
							<p className="mt-1 text-xs text-cursor-text-faint">
								{t('footer.templateCreditBefore')}{' '}
								<TextLink
									href="https://github.com/luisfer/cursor-ambassador-evergreen"
									external
									caret={false}
									className="align-baseline text-xs font-medium"
								>
									{t('footer.templateCreditName')}
								</TextLink>{' '}
								{t('footer.templateCreditMid')}{' '}
								<TextLink href="https://lfrc.me" external caret={false} className="align-baseline text-xs font-medium">
									{t('footer.templateCreditAuthor')}
								</TextLink>
							</p>
						</div>

						<Button href={joinUrl} external={joinIsExternal || undefined} variant="primary" size="md">
							{t('footer.joinNext')}
							{joinIsExternal ? <span aria-hidden="true">↗</span> : null}
						</Button>
					</div>
				</MarketingColumn>
			</MarketingGrid>
		</footer>
	);
};

export default Footer;
