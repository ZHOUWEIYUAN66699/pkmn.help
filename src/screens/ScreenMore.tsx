import { ReactNode } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { Divider } from "../components/Divider";
import { ExternalLink } from "../components/ExternalLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { RadioGroup } from "../components/RadioGroup";

import { TranslationCard } from "../components/TranslationCard";
import { useAppContext } from "../hooks/useAppContext";
import { useGeneration } from "../hooks/useGeneration";

import { useTheme } from "../hooks/useTheme";
import { useTypeCount } from "../hooks/useTypeCount";
import { compare } from "../misc/compare";
import { generations, isGeneration } from "../misc/data-generations";
import { supportedLanguages } from "../misc/detectLanguage";
import { fail } from "../misc/fail";
import {
  languageBounty,
  languageCompletions,
  officialLanguagesSet,
} from "../misc/lang";
import { resetApp } from "../misc/resetApp";

export function ScreenMore(): ReactNode {
  const { needsAppUpdate, updateApp } = useAppContext();
  const { t } = useTranslation();
  const [generation, setGeneration] = useGeneration();
  const [theme, setTheme] = useTheme();
  const [typeCount, setTypeCount] = useTypeCount();
  const year = new Date().getFullYear();

  return (
    <main className="content-narrow center">
      <Flex direction="column" padding="large">
        <Flex direction="column">
          <Flex padding="medium" />
          <Flex direction="column" gap="large">
            {needsAppUpdate && (
              <Card>
                <Flex gap="medium" align="center">
                  <Flex direction="column" flex="auto">
                    <FancyText tag="span" fontSize="large" fontWeight="medium">
                      {t("banners.updateReady.description")}
                    </FancyText>
                    <ExternalLink href="https://github.com/wavebeem/pkmn.help/blob/HEAD/CHANGELOG.md">
                      {t("banners.updateReady.whatsNew")}
                    </ExternalLink>
                  </Flex>
                  <Button type="button" onClick={updateApp}>
                    {t("banners.updateReady.update")}
                  </Button>
                </Flex>
              </Card>
            )}

            <FancyText tag="h2" fontWeight="medium">
              {t("more.contact.heading")}
            </FancyText>

            <FancyText tag="p">
              <Trans
                i18nKey="more.contact.intro"
                values={{}}
                components={{
                  homepage: <ExternalLink href="https://www.wavebeem.com" />,
                }}
              />
            </FancyText>

            <FancyText tag="p">
              <Trans
                i18nKey="more.contact.email"
                components={{
                  email: <ExternalLink href="mailto:pkmn@wavebeem.com" />,
                }}
              />
            </FancyText>
          </Flex>

          <Flex direction="column" paddingY="large">
            <Divider />
          </Flex>

          <Flex direction="column" gap="large">
            <FancyText tag="h2" fontSize="xlarge" fontWeight="medium">
              {t("more.settings.heading")}
            </FancyText>



            <RadioGroup
              label={t("more.settings.theme.label")}
              value={theme}
              helpText={t("more.settings.theme.help")}
              options={[
                {
                  value: "auto",
                  label: t(`more.settings.theme.values.auto`),
                },
                {
                  value: "light",
                  label: t(`more.settings.theme.values.light`),
                },
                {
                  value: "dark",
                  label: t(`more.settings.theme.values.dark`),
                },
                {
                  value: "night",
                  label: t(`more.settings.theme.values.night`),
                },
              ]}
              onChange={(option) => void setTheme(option.value)}
            />

            <RadioGroup
              label={t("games.label")}
              value={generation}
              helpText={t("games.help")}
              onChange={(option) => {
                const { value } = option;
                if (isGeneration(value)) {
                  setGeneration(value);
                } else {
                  // eslint-disable-next-line no-console
                  console.error("not a generation:", value);
                }
              }}
              options={generations.map((gen) => {
                return {
                  value: gen,
                  label: t(`games.byID.${gen}`),
                };
              })}
            />

            <RadioGroup
              label={t("more.settings.typeCount.label")}
              value={typeCount}
              helpText={t("more.settings.typeCount.help")}
              onChange={(option) => {
                setTypeCount(option.value);
              }}
              options={[
                {
                  value: "2",
                  label: t("more.settings.typeCount.values.2"),
                },
                {
                  value: "3",
                  label: t("more.settings.typeCount.values.3"),
                },
              ]}
            />
          </Flex>

          <Flex paddingY="medium" />
          <Divider />

          <CollapsibleSection
            heading={
              <FancyText
                inline
                tag="h2"
                fontSize="xlarge"
                fontWeight="medium"
                id="translate"
              >
                <span aria-hidden="true">🌎</span> Help me translate
              </FancyText>
            }
          >
            <Flex direction="column" gap="large">
              <FancyText tag="p">
                Download a translation file below to get started. You can edit
                CSV files with{" "}
                <ExternalLink href="https://docs.google.com/">
                  Google Docs
                </ExternalLink>
                ,{" "}
                <ExternalLink href="https://www.libreoffice.org/download/download-libreoffice/">
                  LibreOffice Calc
                </ExternalLink>
                ,{" "}
                <ExternalLink href="https://www.moderncsv.com/">
                  Modern CSV
                </ExternalLink>
                , and many other apps.
              </FancyText>
              <FancyText tag="p">
                Send me the translated file via email when you&apos;re done (
                <ExternalLink href="mailto:pkmn@wavebeem.com">
                  pkmn
                  <wbr />
                  @wavebeem
                  <wbr />
                  .com
                </ExternalLink>
                ). If you have questions, feel free to ask. Confused about CSV
                files? I can set up a Google Sheet for you.
              </FancyText>
              <Flex direction="column" gap="large">
                {supportedLanguages
                  .slice(0)
                  .filter((lang) => !(lang === "en" || lang === "ja-Hrkt"))
                  .sort((a, b) => {
                    return (
                      compare(languageBounty[b], languageBounty[a]) ||
                      compare(
                        officialLanguagesSet.has(a) ? 0 : 1,
                        officialLanguagesSet.has(b) ? 0 : 1,
                      ) ||
                      compare(
                        languageCompletions[a] || 0,
                        languageCompletions[b] || 0,
                      ) ||
                      compare(a, b)
                    );
                  })
                  .map((lang) => {
                    return <TranslationCard key={lang} lang={lang} />;
                  })}
              </Flex>
            </Flex>
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            initiallyOpen
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.changes.heading")}
              </FancyText>
            }
          >
            <FancyText tag="p">
              <Trans
                i18nKey="more.changes.description"
                components={{
                  changelog: (
                    <ExternalLink href="https://github.com/wavebeem/pkmn.help/blob/HEAD/CHANGELOG.md" />
                  ),
                }}
              />
            </FancyText>
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.help.heading")}
              </FancyText>
            }
          >
            <Flex direction="column" gap="large">
              <Flex direction="column" align="flex-start">
                <Button onClick={resetApp}>
                  {t("more.help.serviceWorker.button")}
                </Button>
              </Flex>
              <FancyText tag="p">
                {t("more.help.serviceWorker.description")}
              </FancyText>
            </Flex>
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            initiallyOpen
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.privacy.heading")}
              </FancyText>
            }
          >
            <FancyText tag="p">
              <Trans
                i18nKey="more.privacy.description"
                components={{
                  plausible: (
                    <ExternalLink href="https://plausible.io/pkmn.help" />
                  ),
                }}
              />
            </FancyText>
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            initiallyOpen
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.givingBack.heading")}
              </FancyText>
            }
          >
            <FancyText tag="p">{t("more.givingBack.description")}</FancyText>
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            initiallyOpen
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.thanks.heading")}
              </FancyText>
            }
          >
            <FancyText tag="p">
              <Trans
                i18nKey="more.thanks.description"
                components={{
                  credits: (
                    <ExternalLink href="https://github.com/wavebeem/pkmn.help/blob/HEAD/CREDITS.md" />
                  ),
                }}
              />
            </FancyText>
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            initiallyOpen
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.openSource.heading")}
              </FancyText>
            }
          >
            <FancyText tag="p">
              <Trans
                i18nKey="more.openSource.description"
                components={{
                  github: (
                    <ExternalLink href="https://github.com/wavebeem/pkmn.help" />
                  ),
                }}
              />
            </FancyText>
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            initiallyOpen
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.legalInfo.heading")}
              </FancyText>
            }
          >
            <Flex direction="column" gap="large">
              <FancyText tag="p">
                Pokémon &copy; 2002&ndash;{year} Pokémon. &copy; 1995&ndash;
                {year} Nintendo/Creatures Inc./GAME FREAK inc. &trade;, &reg;
                and Pokémon character names are trademarks of Nintendo.
              </FancyText>

              <FancyText tag="p">
                No copyright or trademark infringement is intended in using
                Pokémon content on this page.
              </FancyText>

              <FancyText tag="p">
                Pokédex data is from {}
                <ExternalLink href="https://pokeapi.co/">PokéAPI</ExternalLink>.
              </FancyText>

              <FancyText tag="p">
                pkmn.help &copy; 2013&ndash;{year} {}
                <ExternalLink href="https://www.wavebeem.com">
                  Sage Fennel
                </ExternalLink>
                .
              </FancyText>
            </Flex>
          </CollapsibleSection>
          <Divider />
          <Flex padding="medium" />
          <div aria-hidden="true">
            (ノ^_^)ノ Have you tried pressing the Pokéball button at the top of
            the page?
          </div>
        </Flex>
      </Flex>
    </main>
  );
}
