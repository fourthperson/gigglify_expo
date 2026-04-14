import React from "react";
import {ActivityIndicator, Platform, StyleSheet, View} from "react-native";
import {primaryColor} from "@/src/presentation/config/theme";

const Loader = (): React.JSX.Element => {
    return (
        <View style={styles.centeredItems}>
            <ActivityIndicator
                size={Platform.OS === 'ios' ? 'small' : 'large'}
                color={primaryColor}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    centeredItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
});

export default Loader;