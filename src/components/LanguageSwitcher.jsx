import { languageNames, supportedLanguages } from '../i18n/translations';
import './LanguageSwitcher.css';

function LanguageSwitcher({ currentLanguage, onLanguageChange }) {
  return (
    <div className="language-switcher">
      <select 
        value={currentLanguage} 
        onChange={(e) => onLanguageChange(e.target.value)}
        className="language-select"
        aria-label="Select language"
      >
        {supportedLanguages.map(lang => (
          <option key={lang} value={lang}>
            {languageNames[lang].flag} {languageNames[lang].name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;