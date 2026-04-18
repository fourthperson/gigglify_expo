import React, {useRef, useCallback, useEffect} from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Loader from "@/src/presentation/component/loader";
import {useJoke} from '@/src/presentation/hook/use_joke';
import {
    blackColor,
    boldFont,
    mediumFont,
    primaryColor,
    whiteColor,
} from '@/src/presentation/config/theme';
import HistorySvg from '@/assets/images/history.svg';
import SettingsSvg from '@/assets/images/settings.svg';
import ShareSvg from '@/assets/images/share.svg';
import {shareText} from "@/src/presentation/util/functions";
import HistorySheet from "@/src/presentation/component/history";
import ModalBackdrop from "@/src/presentation/component/modal_backdrop";
import PreferencesSheet from "@/src/presentation/component/preferences";
import {useTranslation} from "react-i18next";

const HomePage = (): React.JSX.Element => {
    const {t} = useTranslation();
    const {joke, isLoading, fetchJoke} = useJoke();

    const settingsModalRef = useRef<BottomSheetModal>(null);
    const historyModalRef = useRef<BottomSheetModal>(null);

    // Initial load
    useEffect(() => {
        fetchJoke().then();
    }, [fetchJoke]);

    const share = useCallback(() => {
        if (joke) {
            shareText(joke.content).then();
        }
    }, [joke]);

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="dark-content"
                    translucent
                />
                <SafeAreaView style={styles.container}>
                    {
                        isLoading ? <Loader/> : (
                            <View style={styles.container}>
                                <TouchableOpacity
                                    style={styles.container}
                                    onPress={() => fetchJoke()}>
                                    <View style={styles.centeredItems}>
                                        <Text style={styles.categoryText}>
                                            {joke ? joke.category : ''}
                                        </Text>
                                        <Text style={styles.jokeText}>
                                            {joke ? joke.content : t('usage_description1')}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={styles.actionsContainer}>
                                    <TouchableOpacity onPress={() => settingsModalRef.current?.present()}>
                                        <SettingsSvg height={28} width={28} color={blackColor}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={share}>
                                        <ShareSvg height={36} width={36} color={primaryColor}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => historyModalRef.current?.present()}>
                                        <HistorySvg height={28} width={28} color={blackColor}/>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.directionsContainer}>
                                    <Text style={styles.directionsText}>
                                        {t('usage_description')}
                                    </Text>
                                </View>
                            </View>
                        )
                    }
                </SafeAreaView>
            </View>
            <BottomSheetModal
                ref={settingsModalRef}
                snapPoints={['50%']}
                backdropComponent={ModalBackdrop}>
                <PreferencesSheet/>
            </BottomSheetModal>
            <BottomSheetModal
                ref={historyModalRef}
                snapPoints={['50%']}
                backdropComponent={ModalBackdrop}>
                <HistorySheet/>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
    },
    centeredItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    categoryText: {
        fontSize: 18,
        fontFamily: boldFont,
        textAlign: 'center',
        marginBottom: 36,
    },
    jokeText: {
        fontSize: 18,
        fontFamily: mediumFont,
    },
    directionsText: {
        fontFamily: mediumFont,
        fontSize: 12,
    },
    directionsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 4,
    },
    actionsContainer: {
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingStart: 30,
        paddingEnd: 30,
    },
    backdropStyle: {
        backgroundColor: blackColor,
    },
});

export default HomePage;