import i18next from "i18next";
import eng from "./eng.json";
import ru from "./ru.json";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: "ru",
    fallbackLng: 'en',
    resources: {
        en: eng,
        ru: ru
    },
    interpolation: {
        escapeValue: false
    },
    react: {
        useSuspense: false,
    }
})

export default i18next