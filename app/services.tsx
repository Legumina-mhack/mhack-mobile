import {SafeAreaView, StyleSheet, View} from "react-native";
import {Stack, useRouter} from "expo-router";
import {HorizontalTile} from "@app/components/HorizontalTile";
import {ChargerIcon, FormIcon, MagnifierIcon, PlaneIcon, SnowflakeIcon} from "@app/components/Icons";

export default function Services() {
    const router = useRouter();
    return (
        <>
            <Stack.Screen options={{
                title: 'Konsument',
                headerBackTitle: 'Wróć',
                headerStyle: {backgroundColor: '#f6f8f9'}
            }}/>
            <SafeAreaView style={styles.container}>
                <View style={styles.list}>
                    <HorizontalTile icon={FormIcon} text={'Reklamacja towaru'} onClick={() => router.push('/complaint-info')}/>
                    <HorizontalTile icon={MagnifierIcon} text={'Sprawdź produkt'} onClick={() => router.push('/product-check')}/>
                    <HorizontalTile icon={SnowflakeIcon} text={'Zgłoś problem'} onClick={()=> router.push('/issue-report')}/>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f8f9',
    },
    list: {
        flex: 1,
        margin: 16,
        gap: 8,
    },
    image: {
        flex: 1,
        flexGrow: 1,
        height: null,
        resizeMode: 'cover',
    },
})
