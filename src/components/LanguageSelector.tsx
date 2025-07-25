import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../hooks/useLanguage";
import {
  getDesiredLanguage,
  isLang,
  supportedLanguages,
} from "../misc/detectLanguage";
import {
  formatLanguageCompletion,
  officialLanguages,
  showLang,
  unofficialLanguages,
} from "../misc/lang";
import styles from "./LanguageSelector.module.css";

export function LanguageSelector(): ReactNode {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useLanguage();
  const autoLang = getDesiredLanguage() || "en";

  return (
    <div className={styles.root}>
      <span className={styles.icon} aria-hidden="true">🌐</span>
      <select
        className={styles.select}
        value={language}
        onChange={(event) => {
          setLanguage(event.target.value);
          i18n.changeLanguage(event.target.value || autoLang);
        }}
        aria-label="Language"
      >
        <option value="">
          * {showLang(autoLang)}
        </option>
        <optgroup label="Official">
          {officialLanguages.map((lang) => {
            if (!isLang(lang)) {
              throw new Error(`${lang} is not a valid language`);
            }
            return (
              <option value={lang} key={lang}>
                {showLang(lang)}
              </option>
            );
          })}
        </optgroup>
        <optgroup label="Community">
          {unofficialLanguages.map((lang) => {
            if (!isLang(lang)) {
              throw new Error(`${lang} is not a valid language`);
            }
            return (
              <option value={lang} key={lang}>
                {showLang(lang)}
              </option>
            );
          })}
        </optgroup>
      </select>
    </div>
  );
}
