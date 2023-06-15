import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VehicleListScreen from './src/screens/VehicleListScreen';
import VehicleDetailsScreen from './src/screens/VehicleDetailsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="VehicleList" component={VehicleListScreen} options={{ title: t("list_of_vehicles") }} />
        <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} options={{ title: t("vehicle_details") }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: t("settings") }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
