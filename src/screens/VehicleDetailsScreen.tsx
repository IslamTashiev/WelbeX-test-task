import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Vehicle } from '../../types';

interface VehicleScreenProps {
    route: any
}

const VehicleScreen: React.FC<VehicleScreenProps> = ({ route }) => {
    const vehicle: Vehicle = route.params.vehicle;

    const handleCall = () => {
        Linking.openURL(`tel:${vehicle.phone_number}`);
    };

    const handleChat = () => {
        Linking.openURL(`whatsapp://send?phone=${vehicle.phone_number}&text=Добрый день, подскажите пожалуйста, какой номер заказа у вас сейчас в работе`);
    };

    const getCategoryText = (category: number): string => {
        switch (category) {
            case 1:
                return 'Грузовая';
            case 2:
                return 'Пассажирская';
            case 3:
                return 'Спецтранспорт';
            default:
                return '';
        }
    };


    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: vehicle?.lat,
                    longitude: vehicle?.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker coordinate={{ latitude: vehicle?.lat, longitude: vehicle?.lng }} />
            </MapView>
            <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleCategory}>{getCategoryText(vehicle?.car_category)}</Text>
                <Text style={styles.vehicleDriver}>Имя водителя: {vehicle?.name}</Text>
                <Text style={styles.vehicleDriver}>Контактный номер: {vehicle?.phone_number}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCall}>
                <Text style={styles.buttonText}>Позвонить</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleChat}>
                <Text style={styles.buttonText}>Написать</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    vehicleInfo: {
        backgroundColor: '#fff',
        padding: 16,
    },
    vehicleCategory: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    vehicleDriver: {
        fontSize: 14,
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#337ab7',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default VehicleScreen;
