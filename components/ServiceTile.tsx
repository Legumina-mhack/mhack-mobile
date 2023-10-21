import {StyleSheet, Text, View} from "react-native";
import {FunctionComponent} from "react";
import {SvgProps} from "react-native-svg";

export type ServiceTileProps = {
    icon: FunctionComponent<SvgProps>,
    text: string;
}

export function ServiceTile(props: ServiceTileProps) {
    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <props.icon height={30} style={styles.image}/>
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        width: 80,
        height: 80,
        backgroundColor: '#ffffff',
        borderRadius: 18,
    },
    image: {
        alignSelf: 'center',
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
        height: 50,
    },
    text: {
        textAlign: 'center',
        alignSelf: 'center',
        color: '#101317'
    }
})

