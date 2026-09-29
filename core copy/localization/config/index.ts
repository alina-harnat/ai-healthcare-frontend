'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from '../resources';

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
});

console.log('i18next resources:', resources);

export default i18n;
