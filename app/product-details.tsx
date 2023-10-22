import {Stack, useGlobalSearchParams, useLocalSearchParams, useRouter} from "expo-router";
import {SafeAreaView, ScrollView, StyleSheet, View, Text} from "react-native";
import {StyledButton} from "@app/components/StyledButton";
import React from "react";
import {CardHeader} from "@app/components/CardHeader";
import {CardBody} from "@app/components/CardBody";
import {FormHeader} from "@app/components/FormHeader";

const apiMock = [
    {reason: 'Krótki czas działania słuchawek po naładowaniu baterii', count: 4},
    {reason: 'Nieprawidłowe działanie mikrofonu', count: 2},
    {reason: 'Awaria przewodu ładowania', count: 1},
]

export default function ProductDetails() {
    const router = useRouter()
    const glob = useLocalSearchParams()
    const data = JSON.parse(glob.data as string) as any;

    console.log({data})

    return (
        <>
            <Stack.Screen options={{
                title: 'Informacje o produkcie',
                headerBackTitle: 'Wróć',
                headerStyle: {backgroundColor: '#f6f8f9'}
            }}/>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.list}>
                        <CardHeader>Szczegóły</CardHeader>
                        <CardBody>
                            <FormHeader>Nazwa produktu</FormHeader>
                            <Text style={{ fontSize: 16, marginBottom: 16 }}>{ data.name ?? 'Brak danych' }</Text>
                            <FormHeader>Model</FormHeader>
                            <Text style={{ fontSize: 16, marginBottom: 16 }}>{ data.model ?? 'Brak danych' }</Text>
                            <FormHeader>Producent</FormHeader>
                            <Text style={{ fontSize: 16, marginBottom: 16 }}>{ data.manufacture ?? 'Brak danych' }</Text>
                            <FormHeader>Producent</FormHeader>
                            {/*{data && (data.length > 0 ? (*/}
                            {/*    <>*/}
                            {/*        <FormHeader>Najczęściej zgłaszane nieprawidłowości</FormHeader>*/}
                            {/*        {data.map((data, index) => (*/}
                            {/*            <Issue key={index} reason={data.reason} count={data.count}/>*/}
                            {/*        ))}*/}
                            {/*    </>*/}
                            {/*) : (*/}
                            {/*    <FormError>Brak informacji o produkcie</FormError>*/}
                            {/*))}*/}
                        </CardBody>
                        <StyledButton variant={'outline-blue'} onClick={() => router.back()}>Wróć</StyledButton>
                    </View>
                </ScrollView>
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
    gallery: {
        gap: 16
    }
})
