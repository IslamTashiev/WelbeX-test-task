import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import i18n from "../locale/i18n"
import { useNavigation } from '@react-navigation/native';

const SettingsScreen: React.FC = () => {
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
    const navigate = useNavigation();

    const changeLanguage = (lang: string) => {
        setCurrentLanguage(lang);
        i18n.changeLanguage(lang);
    }
    const apply = () => {
        navigate.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <Text style={styles.filterTitle}>Выберите язык:</Text>
                <View style={styles.filterItem}>
                    <CheckBox
                        checked={currentLanguage === "ru"}
                        onPress={() => changeLanguage("ru")}
                    />
                    <Text style={styles.filterItemText}>Русский</Text>
                </View>
                <View style={styles.filterItem}>
                    <CheckBox
                        checked={currentLanguage === "en"}
                        onPress={() => changeLanguage("en")}
                    />
                    <Text style={styles.filterItemText}>English</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.applyButton} onPress={apply}>
                <Text style={styles.applyButtonText}>Сохранить</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "space-between"
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
        marginBottom: 4,
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
});

export default SettingsScreen;
