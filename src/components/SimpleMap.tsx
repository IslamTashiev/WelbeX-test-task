import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { Vehicle } from "../../types";
import useCategoryName from "../hooks/useCategoryName";

interface SimpleMapProps {
    vehicles: Vehicle[]
}

const SimpleMap: React.FC<SimpleMapProps> = ({ vehicles }: SimpleMapProps) => {
    const markerIcons = [
        "https://cdn-icons-png.flaticon.com/64/8782/8782044.png",
        "https://cdn-icons-png.flaticon.com/64/2555/2555048.png",
        "https://cdn-icons-png.flaticon.com/64/5044/5044793.png"
    ]
    const initialRegion = {
        latitude: vehicles[vehicles.length - 1]?.lat,
        longitude: vehicles[vehicles.length - 1]?.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }

    const getCategoryName = useCategoryName();


    return (
        <MapView style={styles.map} initialRegion={initialRegion} maxZoomLevel={12}>
            {vehicles.map(vehicle => (
                <Marker
                    key={vehicle.id}
                    coordinate={{ latitude: vehicle.lat, longitude: vehicle.lng }}
                    image={{ uri: markerIcons[vehicle.car_category - 1] }}
                    title={vehicle.name}
                    description={getCategoryName(vehicle.car_category)}
                />
            ))}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})

export default SimpleMap;