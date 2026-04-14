import {Share} from "react-native";
import * as Localization from 'expo-localization';

export async function shareText(text: string) {
    try {
        await Share.share({
            message: text,
        });
    } catch (e) {
        console.error(e);
    }
}

/**
 * Detects the system date and time format tokens.
 * Uses the Intl API to remain type-safe and accurate.
 */
let cachedFormat: string | null = null;
export const getSystemDateFormat = (): string => {
    if (cachedFormat) return cachedFormat;

    const locales = Localization.getLocales();
    const locale = locales[0]?.languageTag || 'en-US';

    // 1. Determine the Date Pattern (DD/MM/YYYY etc.)
    const testDate = new Date(2026, 11, 25); // Dec 25, 2026
    const dateParts = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(testDate);

    const datePattern = dateParts
        .map((part) => {
            switch (part.type) {
                case 'day':
                    return 'DD';
                case 'month':
                    return 'MM';
                case 'year':
                    return 'YYYY';
                case 'literal':
                    return part.value;
                default:
                    return '';
            }
        })
        .join('');

    // 2. Determine the Time Pattern (12h vs 24h)
    // We check the system's preferred hour cycle by inspecting a formatted time string
    const testTime = new Intl.DateTimeFormat(locale, {hour: 'numeric'}).resolvedOptions();

    // resolvedOptions().hour12 is the most reliable way to check this across platforms
    const is24Hour = !testTime.hour12;
    const timePattern = is24Hour ? 'HH:mm' : 'h:mm A';

    cachedFormat = `${datePattern} ${timePattern}`;
    return cachedFormat;
};