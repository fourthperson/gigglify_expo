import React from "react";

import {BottomSheetBackdrop, BottomSheetBackdropProps} from "@gorhom/bottom-sheet";
import {StyleSheet} from "react-native";
import {blackColor} from "@/src/presentation/config/theme";

const ModalBackdrop = (props: BottomSheetBackdropProps): React.JSX.Element => {
    return (
        <BottomSheetBackdrop style={styles.backdropStyle}
                             {...{
                                 ...props,
                                 appearsOnIndex: 0,
                                 disappearsOnIndex: -1,
                                 opacity: 0.5,
                             }}
        />
    );
};

const styles = StyleSheet.create({
    backdropStyle: {
        backgroundColor: blackColor,
    }
});

export default ModalBackdrop;