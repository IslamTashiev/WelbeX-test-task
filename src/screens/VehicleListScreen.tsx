import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, Image, Switch } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import { Vehicle, VehicleCategory } from "../../types";
import { useTranslation } from 'react-i18next';
import useCategoryName from '../hooks/useCategoryName';
import MapView, { Marker } from 'react-native-maps';
import SimpleMap from '../components/SimpleMap';

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
    const [viewMode, setViewMode] = useState("list");

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

    const handleToggleViewMode = () => {
        setViewMode(viewMode === 'list' ? 'map' : 'list');
    };

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
            <View style={styles.controlButtons}>
                <View style={styles.controlButtonsLeft}>
                    <TouchableOpacity
                        style={styles.filterToggle}
                        onPress={() => navigation.navigate("Settings")}
                    >
                        <Image
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2889/2889312.png" }}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.filterToggle}
                        onPress={() => setShowFilters(!showFilters)}
                    >
                        <Image
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2676/2676818.png" }}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.controlButtonsLeft}>
                    <Text>{t("display_mode")}: <Text style={{ fontWeight: "600" }}>{viewMode === 'map' ? t("map") : t("list")}</Text></Text>
                    <Switch onValueChange={handleToggleViewMode} value={viewMode === 'map'} />
                </View>
            </View>
            <Modal visible={showFilters} animationType='slide'>
                <View style={styles.filterContainer}>
                    <View>
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
                    </View>
                    <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
                        <Text style={styles.applyButtonText}>{t("apply")}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {viewMode === "map" ? (
                <View style={styles.mapWrapper}>
                    <SimpleMap vehicles={filteredVehicles} />
                </View>
            ) : (
                <FlatList
                    data={filteredVehicles}
                    renderItem={renderVehicleItem}
                    keyExtractor={(item) => item.id}
                />
            )}

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
    },
    filterToggleText: {
        color: '#337ab7',
        fontSize: 16,
        fontWeight: 'bold',
    },
    filterContainer: {
        marginBottom: 16,
        paddingTop: 24,
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: "space-between",
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
    controlButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    controlButtonsLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    mapWrapper: {
        paddingBottom: 32,
        height: "100%"
    }
});

export default VehicleListScreen;
