import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {FlashList} from '@shopify/flash-list';
import {blackColor, mediumFont, whiteColor} from '@/src/presentation/config/theme';
import {useHistory} from "@/src/presentation/hook/use_history";
import HistoryItem from "@/src/presentation/component/history_list_item";
import Loader from "@/src/presentation/component/loader";
import {useTranslation} from "react-i18next";

const HistorySheet = (): React.JSX.Element => {
    const {t} = useTranslation();
    const {jokes, dateFormat, isLoading, fetchHistory} = useHistory();

    useEffect(() => {
        fetchHistory().then();
    }, [fetchHistory]);

    return (
        <BottomSheetScrollView style={styles.contentContainer}>
            <Text style={styles.titleStyle}>{t('history')}</Text>
            {
                isLoading ?
                    <Loader/>
                    :
                    jokes.length === 0 ?
                        <Text style={styles.emptyStyle}>You don not have any joke history at this time</Text> :
                        <FlashList
                            data={jokes}
                            scrollEnabled={false}
                            keyExtractor={item => item.time}
                            renderItem={({item}) => (
                                <HistoryItem joke={item} format={dateFormat}/>
                            )}
                        />
            }
        </BottomSheetScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: whiteColor,
        paddingHorizontal: 24,
        paddingBottom: 16,
        paddingTop: 8,
    },
    titleStyle: {
        fontSize: 20,
        fontFamily: mediumFont,
        color: blackColor,
        alignSelf: 'center',
        marginBottom: 16,
    },
    emptyStyle: {
        fontSize: 20,
        fontFamily: mediumFont,
        color: blackColor,
        alignSelf: 'center',
        marginBottom: 16,
    },
});

export default HistorySheet;