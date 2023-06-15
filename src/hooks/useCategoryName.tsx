import { useTranslation } from "react-i18next";
import { VehicleCategory } from "../../types";

// Кастомный хук: принимает цифру от 1 до 3 и возвращает название категории относящееся к цифре

const useCategoryName = () => {
    const { t } = useTranslation();
    const categoryNames = [t("cargo"), t("passenger"), t("special_transport"),];

    const getCategoryName = (category: VehicleCategory) => {
        return categoryNames[category - 1]
    }

    return getCategoryName
}

export default useCategoryName;