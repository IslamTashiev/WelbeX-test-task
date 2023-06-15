import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VehicleListScreen from './src/screens/VehicleListScreen';
import VehicleDetailsScreen from './src/screens/VehicleDetailsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="VehicleList" component={VehicleListScreen} options={{ title: 'Список ТС' }} />
        <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} options={{ title: 'Детали ТС' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Настройки' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
