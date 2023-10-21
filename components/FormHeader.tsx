import {StyleSheet, Text} from "react-native";
import {PropsWithChildren} from "react";


export const FormHeader = (props: PropsWithChildren) => {
    return (
        <Text style={styles.container}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    container: {fontSize: 13, color: '#52575f', marginBottom: 5}
})
