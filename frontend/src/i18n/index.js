import { createI18n } from 'vue-i18n';

// Определите сообщения локализации
export const messages = {
  en: {
    message: {
      hello: 'hello world',
    },
  },
  ja: {
    message: {
      hello: 'こんにちは、世界',
    },
  },
};

// Инициализируйте и экспортируйте i18n экземпляр
export const i18n = createI18n({
  locale: 'en', // установите локаль
  fallbackLocale: 'ja', // установите резервную локаль
  messages, // установите сообщения локализации
});