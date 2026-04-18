import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {BottomSheetFlatList, BottomSheetScrollView} from '@gorhom/bottom-sheet';
// import {useTranslation} from 'react-i18next';

import {
    blackColor,
    mediumFont,
} from '../config/theme';
import {useCategories} from "@/src/presentation/hook/use_preference";
import {
    ANY_CATEGORY_ID,
    AVAILABLE_CATEGORIES,
    BLACKLIST_CATEGORIES,
    Category
} from "@/src/domain/entity/category";
import CategoryListTile from "@/src/presentation/component/category_list_tile";
import Loader from "@/src/presentation/component/loader";

const PreferencesSheet = (): React.JSX.Element => {
    // const {t} = useTranslation();
    const {
        onCategoryToggle,
        isCategorySelected,
        onBlacklistToggle,
        isBlacklisted,
        isLoading
    } = useCategories();

    const allOptions: Category[] = [
        {id: ANY_CATEGORY_ID, translationKey: 'category_any'},
        ...AVAILABLE_CATEGORIES
    ];

    return (
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.titleStyle}>Preferences</Text>
            {
                isLoading ?
                    <Loader/>
                    :
                    <>
                        <Text style={styles.optionLabel}>Allowed Categories</Text>
                        <View style={styles.spacer}/>
                        <BottomSheetFlatList
                            data={allOptions}
                            scrollEnabled={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => (
                                <CategoryListTile
                                    isChecked={isCategorySelected(item.id)}
                                    label={item.id}
                                    onChecked={() => onCategoryToggle(item)}
                                />
                            )}
                        />
                        <Text style={styles.optionLabel}>Blacklisted Categories</Text>
                        <View style={styles.spacer}/>
                        <BottomSheetFlatList
                            data={BLACKLIST_CATEGORIES}
                            scrollEnabled={false}
                            keyExtractor={(item: string) => item}
                            renderItem={({item}) => (
                                <CategoryListTile
                                    isChecked={isBlacklisted(item)}
                                    label={item}
                                    isBlacklist={true}
                                    onChecked={() => onBlacklistToggle(item)}
                                />
                            )}
                        />
                    </>
            }
        </BottomSheetScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        // Note: flex: 1 can sometimes clip content in ScrollViews,
        // removed to allow natural height expansion
        paddingHorizontal: 24,
        paddingBottom: 16,
        paddingTop: 8,
    },
    titleStyle: {
        fontSize: 20,
        fontFamily: mediumFont,
        color: blackColor,
        alignSelf: 'center',
    },
    optionLabel: {
        fontFamily: mediumFont,
        fontSize: 16,
        color: blackColor,
        marginTop: 10,
        marginStart: 10,
    },
    spacer: {
        height: 10,
    },
    loadingIndicator: {
        paddingVertical: 50,
        alignSelf: 'center',
    },
});

export default PreferencesSheet;