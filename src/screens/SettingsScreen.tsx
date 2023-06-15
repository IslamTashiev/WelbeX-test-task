import React from 'react';
import { View, Text, Switch } from 'react-native';

const SettingsScreen: React.FC = () => {
    const handleLanguageSwitch = (value: boolean) => {
        // Код для обработки переключения языка
    };

    return (
        <View style={styles.container}>
            <Text>Язык</Text>
            <Switch onValueChange={handleLanguageSwitch} value={false} />
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        padding: 16,
    },
};

export default SettingsScreen;
