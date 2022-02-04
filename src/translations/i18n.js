import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LangEn from './LangEN';
import LangHi from './LangHi';
import LangGuj from './LangGuj';
import LangMr from './LangMr';
import LangMl from './LangMl';
import LangTa from './LangTa';
import LangKn from './LangKn';
import LangBn from './LangBn';
import LangTe from './LangTe';


const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem('currentLanguage', (err, language) => {
      if (err || !language) {
        if (err) {
          console.log('Error fetching Languages from asyncstorage ', err);
        } else {
          console.log('No language is set, choosing English as fallback');
        }
        callback('en');
        return;
      }
      callback(language);
    });
  },
  init: () => { },
  cacheUserLanguage: language => {
    AsyncStorage.setItem('currentLanguage', language);
  }
};

i18n.use(LANGUAGE_DETECTOR).use(initReactI18next).init({
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  resources: {
    en: {
      common: LangEn
    },
    hi: {
      common: LangHi
    },
    gu: {
      common: LangGuj
    },
    mr: {
      common: LangMr
    },
    ml: {
      common: LangMl
    },
    ta: {
      common: LangTa
    },
    kn: {
      common: LangKn
    },
    bn: {
      common: LangBn
    },
    te: {
      common: LangTe
    },
  },
  ns: ['common'],
  defaultNS: 'common',
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react as it does escape per default to prevent xss!
  },
  shouldUseIntlApi() {
    return !deprecatedJsonVersions.includes(this.options.compatibilityJSON) && Intl && Intl.PluralRules;
  },
  react: { useSuspense: false },//this line
});

export default i18n;
