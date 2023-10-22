import {StyleSheet, TextInput} from "react-native";

export type InputProps = {
    value: string;
    onChange: (text: string) => void;
    multiline?: boolean;
    error?: boolean;
}

export const FormControl = (props: InputProps) => {
    return (
        <TextInput
            style={[styles.container, props.error ? {borderColor: '#cd291c', marginBottom: 4} : {}, props.multiline ? {height: 122} : {}]}
            value={props.value}
            onChangeText={(text) => props.onChange(text)} multiline={props.multiline}></TextInput>
    )
}

const styles = StyleSheet.create({
    container: {
        fontSize: 16,
        height: 44,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#a4aab2',
        paddingVertical: 7,
        paddingHorizontal: 11,
        marginBottom: 16
    }
})
