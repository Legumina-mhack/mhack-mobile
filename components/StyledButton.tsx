import {Pressable, StyleSheet, Text, View} from "react-native";
import {PropsWithChildren} from "react";
import {TextStyle, ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export type StyledButtonProps = {
    children: string;
    variant: 'blue' | 'outline-blue',
    onClick?: () =>  void;
}

const variantToStyleMap = new Map<StyledButtonProps['variant'], { view: ViewStyle, text: TextStyle }>([
    ['blue', {
        view: {backgroundColor: '#0452a8', borderColor: '#0452a8'},
        text: {color: '#ffffff',}
    }],
    ['outline-blue', {
        view: { backgroundColor: 'transparent', borderColor: '#0452a8'},
        text: { color: '#0452a8'}
}],
])

export const StyledButton = (props: PropsWithChildren<StyledButtonProps>) => {
    const dynamicStyles = variantToStyleMap.get(props.variant);
    return (
        <Pressable onPress={props.onClick}>
            <View style={[styles.view, dynamicStyles?.view]}><Text
                style={[styles.text, dynamicStyles?.text]}>{props.children}</Text></View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'blue',
        borderWidth: 2,
        borderRadius: 32
    },
    text: {
        color: '#0452a8',
        fontSize: 16,
        textAlign: 'center',
        padding: 16,
    }
})
