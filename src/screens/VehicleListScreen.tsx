import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import { Vehicle, VehicleCategory } from "../../types";
import { useTranslation } from 'react-i18next';
import useCategoryName from '../hooks/useCategoryName';

type Filter = {
    cargo: boolean;
    passenger: boolean;
    special: boolean;
};

const initialFilter: Filter = {
    cargo: false,
    passenger: false,
    special: false,
};
const VehicleListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [filter, setFilter] = useState<Filter>(initialFilter);
    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const { t } = useTranslation();
    const getCategoryName = useCategoryName();

    const filters = [
        { title: t("cargo"), key: "cargo" },
        { title: t("passenger"), key: "passenger" },
        { title: t("special_transport"), key: "special" },
    ]

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://648a820117f1536d65e930a8.mockapi.io/api/v2/vehincles');
            const data = response.data;
            setFilteredVehicles(data);
            setVehicles(data);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const applyFilter = () => {
        const filteredData = filteredVehicles.filter((vehicle) => {
            if (
                (filter.cargo && vehicle.car_category === VehicleCategory.Cargo) ||
                (filter.passenger && vehicle.car_category === VehicleCategory.Passenger) ||
                (filter.special && vehicle.car_category === VehicleCategory.Special)
            ) {
                return true;
            }
            return false;
        });

        // Если все фильтры деактивированы, отображать все ТС без фильтрации
        const finalData = filter.cargo || filter.passenger || filter.special ? filteredData : vehicles;

        setFilteredVehicles(finalData);
        setShowFilters(!showFilters);
    };

    const handleVehiclePress = (vehicle: Vehicle) => {
        // Обработка нажатия на ТС
        // Переход на экран с деталями ТС и передача данных о выбранном ТС
        navigation.navigate('VehicleDetails', { vehicle });
    };

    const renderVehicleItem = ({ item }: { item: Vehicle }) => {
        return (
            <TouchableOpacity
                style={styles.vehicleItem}
                onPress={() => handleVehiclePress(item)}
            >
                <Text style={styles.vehicleName}>{item.name}</Text>
                <Text style={styles.vehicleDriver}>{t("driver")}: {item.name}</Text>
                <Text style={styles.vehicleCategory}>{t("category")}: {getCategoryName(item.car_category)}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.filterToggle}
                onPress={() => navigation.navigate("Settings")}
            >
                <Text style={styles.filterToggleText}>{t("language_settings")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.filterToggle}
                onPress={() => setShowFilters(!showFilters)}
            >
                <Text style={styles.filterToggleText}>{showFilters ? t("hide_filters") : t("show_filters")}</Text>
            </TouchableOpacity>
            {showFilters && (
                <View style={styles.filterContainer}>
                    <Text style={styles.filterTitle}>{t("select_filters")}:</Text>
                    {filters.map((item) => (
                        <View style={styles.filterItem} key={item.key}>
                            <CheckBox
                                checked={filter[item.key]}
                                onPress={() => setFilter({ ...filter, [item.key]: !filter[item.key] })}
                            />
                            <Text style={styles.filterItemText}>{item.title}</Text>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
                        <Text style={styles.applyButtonText}>{t("apply")}</Text>
                    </TouchableOpacity>
                </View>
            )}
            <FlatList
                data={filteredVehicles}
                renderItem={renderVehicleItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    filterToggle: {
        alignItems: 'center',
        marginBottom: 16,
    },
    filterToggleText: {
        color: '#337ab7',
        fontSize: 16,
        fontWeight: 'bold',
    },
    filterContainer: {
        marginBottom: 16,
    },
    filterTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    filterItemText: {
        marginLeft: 4,
    },
    applyButton: {
        backgroundColor: '#337ab7',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: "center"
    },
    vehicleItem: {
        padding: 16,
        backgroundColor: '#f8f8f8',
        marginBottom: 8,
        borderRadius: 5,
    },
    vehicleName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    vehicleDriver: {
        fontSize: 14,
        marginBottom: 4,
    },
    vehicleCategory: {
        fontSize: 14,
        marginBottom: 4,
    },
});

export default VehicleListScreen;
