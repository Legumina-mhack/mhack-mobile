import {Image, StyleSheet, Text, View} from "react-native";
import {PillButton} from "@app/components/PillButton";

export type ImagePreviewProps = {
    uri: string;
    name?: string | null;
    onRemove: () => void
}

export const ImagePreview = (props: ImagePreviewProps) => {
    return (
        <View style={styles.container}>
            <Image source={{uri: props.uri}} style={styles.image}/>
            <Text style={styles.text}>{props.name}</Text>
            <View style={styles.button}>
                <PillButton onClick={props.onRemove}>Usuń</PillButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flexDirection: 'row'},
    image: {
        width: 120,
        height: 120,
        borderRadius: 16,
        resizeMode: 'cover',
    },
    text: {
        flexGrow: 1,
        flexShrink: 1,
        paddingHorizontal: 16,
        alignSelf: 'center'
    },
    button: {alignSelf: 'center'}
})
