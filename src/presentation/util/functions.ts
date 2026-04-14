import {Share} from "react-native";

export function shareText(text: string) {
    try {
        Share.share({
            message: text,
        });
    } catch (e) {
        console.error(e);
    }
}