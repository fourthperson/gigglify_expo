import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from "react-native";
import {blackColor, boldFont, whiteColor} from "@/src/presentation/config/theme";
import {useTranslation} from "react-i18next";
import {useRouter} from "expo-router";

export default function SplashScreen(): React.JSX.Element {
    const {t} = useTranslation();
    const routes = useRouter();

    useEffect(() => {
        setTimeout(() => {
            routes.replace('/home');
        }, 2500);
    }, [routes]);

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={'transparent'}
                translucent={true}
                barStyle={'dark-content'}
            />
            <Text style={styles.logoText}>{t('app_name')}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: whiteColor,
    },
    logoText: {
        color: blackColor,
        fontSize: 36,
        fontFamily: boldFont,
    }
});
