import {PropsWithChildren} from "react";
import {StyleSheet, View} from "react-native";

export const CardBody = (props: PropsWithChildren) => {
    return (
        <View style={styles.shadow1}>
            <View style={styles.shadow2}>
                <View style={styles.container}>{props.children}</View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    shadow1: {
        borderRadius: 18,
        backgroundColor: '#ffffff',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 23.68,
        },
        shadowOpacity: 0.04,
        shadowRadius: 47.36,
        marginBottom: 16,
    },
    shadow2: {
        borderRadius: 18,
        backgroundColor: '#ffffff',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.04,
        shadowRadius: 11.84,
    },
    container: {
        borderRadius: 18,
        backgroundColor: '#ffffff',
        paddingHorizontal: 30,
        paddingVertical: 16,
    },
})
