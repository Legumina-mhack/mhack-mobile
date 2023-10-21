import {Pressable, StyleSheet, Text, View} from "react-native";
import {FunctionComponent} from "react";
import {SvgProps} from "react-native-svg";
import {ChevronIcon} from "@app/components/Icons";

export type HorizontalTileProps = {
    icon: FunctionComponent<SvgProps>,
    text: string,
    onClick?: () => void,
}

export const HorizontalTile = (props: HorizontalTileProps) => {
    return (
        <Pressable onPress={props.onClick}>
            <View style={styles.container}>
                <View style={styles.iconWrapper}>
                    <props.icon width={44} height={30} style={styles.icon}/>
                </View>
                <View style={styles.textWrapper}><Text style={styles.text}>{props.text}</Text></View>
                <View style={styles.chevronWrapper}>
                    <ChevronIcon/>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        backgroundColor: '#ffffff',
        paddingVertical: 25,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 28,
    },
    iconWrapper: {},
    icon: {},
    textWrapper: {
        flexGrow: 1,
        paddingHorizontal: 6,
        justifyContent: 'center'
    },
    text: {
        fontSize: 17,
    },
    chevronWrapper: {
        justifyContent: 'center'
    }
})
