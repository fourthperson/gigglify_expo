import React from 'react';
import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {BottomSheetFlatList, BottomSheetScrollView} from '@gorhom/bottom-sheet';
// import {useTranslation} from 'react-i18next';

import {
    blackColor,
    mediumFont,
    primaryColor,
    regularFont,
} from '../config/theme';
import {useCategories} from "@/src/presentation/hook/use_categories";
import {ANY_CATEGORY_ID, AVAILABLE_CATEGORIES, Category} from "@/src/domain/entity/category";
import CategoryListTile from "@/src/presentation/component/category_list_tile";

const PreferencesSheet = (): React.JSX.Element => {
    // const {t} = useTranslation();
    const {handleToggle, isSelected, isLoading} = useCategories();

    // Combine 'Any' with the rest of the categories for the list
    const allOptions: Category[] = [
        {id: ANY_CATEGORY_ID, translationKey: 'category_any'},
        ...AVAILABLE_CATEGORIES
    ];

    return (
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.titleStyle}>Preferences</Text>
            <Text style={styles.optionLabel}>Allowed Categories</Text>
            <View style={styles.spacer}/>

            {isLoading ? (
                <ActivityIndicator
                    style={styles.loadingIndicator}
                    size={Platform.OS === 'ios' ? 'small' : 'large'}
                    color={primaryColor}
                />
            ) : (
                <BottomSheetFlatList
                    data={allOptions}
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <CategoryListTile
                            isChecked={isSelected(item.id)}
                            label={item.id}
                            onChecked={() => handleToggle(item)}
                        />
                    )}
                />
            )}
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
        fontFamily: regularFont,
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