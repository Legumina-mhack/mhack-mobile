import {StyleSheet, Text, View} from "react-native";

export type IssueProps = {
    reason: string;
    count: number;
    color: string
}

const countToTextMap = (num: number) => {
    switch (num) {
        case -1:
            return '';
        case 1:
            return `${num} zgłoszenie`;
        case 2:
        case 3:
        case 4:
            return `${num} zgłoszenia`;
        default:
            return `${num} zgłoszeń`;
    }
}

export const Issue = (props: IssueProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.dotWrapper}>
                <View style={[styles.dot, { backgroundColor: props.color }]}/>
            </View>
            <View>
                <Text style={styles.reasonText}>{props.reason}</Text>
                <Text style={styles.countText}>{countToTextMap(props.count)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flexDirection: 'row', marginTop: 16},
    dotWrapper: {width: 36, height: 20, alignItems: 'center', justifyContent: 'center'},
    dot: {
        width: 12,
        height: 12,
        backgroundColor: '#0452a8',
        borderRadius: 12
    },
    reasonText: {fontSize: 16, color: '#000000'},
    countText: {fontSize: 13, color: '#52575f'},
})
