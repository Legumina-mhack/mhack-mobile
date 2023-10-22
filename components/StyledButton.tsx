import {Pressable, StyleSheet, Text, View} from "react-native";
import {PropsWithChildren} from "react";
import {TextStyle, ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export type StyledButtonProps = {
    variant: 'blue' | 'outline-blue',
    onClick?: () => void;
}

const variantToStyleMap = new Map<StyledButtonProps['variant'], { view: ViewStyle, text: TextStyle }>([
    ['blue', {
        view: {backgroundColor: '#0452a8', borderColor: '#0452a8'},
        text: {color: '#ffffff',}
    }],
    ['outline-blue', {
        view: {backgroundColor: 'transparent', borderColor: '#0452a8'},
        text: {color: '#0452a8'}
    }],
])

export const StyledButton = (props: PropsWithChildren<StyledButtonProps>) => {
    const dynamicStyles = variantToStyleMap.get(props.variant);
    return (
        <Pressable onPress={props.onClick}>
            <View style={[styles.view, dynamicStyles?.view]}>{
                typeof props.children === 'string' ? <Text
                    style={[styles.text, dynamicStyles?.text]}>{props.children}</Text> : props.children
            }</View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    view: {
        height: 58,
        backgroundColor: 'blue',
        borderWidth: 2,
        borderRadius: 32,
        justifyContent: 'center'
    },
    text: {
        color: '#0452a8',
        fontSize: 16,
        textAlign: 'center',
        padding: 16,
    }
})
