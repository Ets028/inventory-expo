// defaultStyles.ts
import { StyleSheet } from 'react-native';
import { Theme } from './Theme';

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
        padding: 10,
    },
    Pillbutton: {
        backgroundColor: Theme.colors.primary,
        borderRadius: Theme.button.pill.borderRadius,
        paddingHorizontal: 30,
        paddingVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Theme.colors.text,
        fontSize: Theme.font.large,
    },
    header: {
        fontSize: Theme.font.large,
        fontWeight: '800',
        color: Theme.colors.primary,
    },
});
