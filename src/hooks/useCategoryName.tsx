import { useTranslation } from "react-i18next";
import { VehicleCategory } from "../../types";

const useCategoryName = () => {
    const { t } = useTranslation();
    const categoryNames = [t("cargo"), t("passenger"), t("special_transport"),];

    const getCategoryName = (category: VehicleCategory) => {
        return categoryNames[category - 1]
    }

    return getCategoryName
}

export default useCategoryName;