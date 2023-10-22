import {Pressable, StyleSheet, Text, View} from "react-native";
import {PropsWithChildren} from "react";

export type PillButtonProps = {
    onClick?: () => void;
    error: boolean;
}

export const PillButton = (props: PropsWithChildren<PillButtonProps>) => {
    return (
        <Pressable onPress={props.onClick}>
            <View style={[styles.container, props.error ? { backgroundColor: '#ffe9e5', borderColor: '#cd291c' } : {}]}>
                <Text style={[styles.text, props.error ? { color: '#cd291c' } : {}]}>
                    {props.children}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth:  1,
        borderColor: '#dbebfa',
        backgroundColor: '#dbebfa',
        paddingVertical: 7,
        paddingHorizontal: 16,
        alignSelf: 'center',
        borderRadius: 18,
    },
    text: {color: '#284c6e'}
})
