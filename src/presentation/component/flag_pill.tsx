import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {blackColor, mediumFont} from "@/src/presentation/config/theme";

const FlagPill = (props: {
    flag: string
}): React.JSX.Element => {
    let color: string = props.flag === 'nsfw' ? '#FF4D4D' :
        props.flag === 'religious' ? '#4D94FF' :
            props.flag === 'political' ? '#FFD700' :
                props.flag === 'racist' ? '#8B4513' :
                    props.flag === 'sexist' ? '#FF69B4' :
                        props.flag === 'explicit' ? '#9400D3' : 'transparent';
    color = `${color}59`;

    return (
        <View style={[styles.pill, {backgroundColor: color}]}>
            <Text
                numberOfLines={1}
                style={styles.label}>
                {props.flag}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    pill: {
        marginEnd: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        alignSelf: 'flex-start', // Allows the pill to wrap its content width
        flexShrink: 0,           // Prevents the pill from being squeezed in a flex container
    },
    label: {
        color: blackColor,
        fontSize: 14,
        fontFamily: mediumFont,
    }
});

export default FlagPill;