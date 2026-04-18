import {
    blackColor,
    primaryDarkColor,
    redColor,
    regularFont,
    whiteColor
} from "@/src/presentation/config/theme";
import {StyleSheet, Text, View} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox/lib";
import React from "react";

function CategoryListTile(props: {
    isChecked: boolean;
    label: string;
    onChecked: (b: boolean) => void;
    isBlacklist?: boolean,
}): React.JSX.Element {
    const {isChecked, label, onChecked, isBlacklist = false} = props;
    return (
        <View style={styles.optionContainer}>
            <BouncyCheckbox
                isChecked={isChecked}
                onPress={checked => onChecked(checked)}
                textComponent={<Text style={styles.optionLabel}>{label}</Text>}
                fillColor={isBlacklist ? redColor : primaryDarkColor}
                unFillColor={whiteColor}
                innerIconStyle={styles.innerIconStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    optionContainer: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    optionLabel: {
        fontFamily: regularFont,
        fontSize: 16,
        color: blackColor,
        marginStart: 10,
    },
    innerIconStyle: {
        borderWidth: 2,
    },
});

export default CategoryListTile;