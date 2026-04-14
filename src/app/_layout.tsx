import {SplashScreen, Stack} from "expo-router";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'CooperHewitt-Bold': require('../../assets/fonts/CooperHewitt-Bold.otf'),
        'CooperHewitt-Light': require('../../assets/fonts/CooperHewitt-Light.otf'),
        'CooperHewitt-Medium': require('../../assets/fonts/CooperHewitt-Medium.otf'),
        'CooperHewitt-Book': require('../../assets/fonts/CooperHewitt-Book.otf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <GestureHandlerRootView>
            <Stack screenOptions={{headerShown: false}}/>
        </GestureHandlerRootView>
    );
}
