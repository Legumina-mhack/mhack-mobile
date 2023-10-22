import {Stack, useGlobalSearchParams, useLocalSearchParams, useRouter} from "expo-router";
import {Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {CardHeader} from "@app/components/CardHeader";
import {CardBody} from "@app/components/CardBody";
import {StyledButton} from "@app/components/StyledButton";
import React from "react";
import {Issue} from "@app/components/Issue";

const apiMock = [
    {reason: 'Krótki czas działania słuchawek po naładowaniu baterii', count: 4},
    {reason: 'Nieprawidłowe działanie mikrofonu', count: 2},
    {reason: 'Awaria przewodu ładowania', count: 1},
]

export default function ProductList() {
    const router = useRouter()
    const glob = useLocalSearchParams()
    const data = JSON.parse(glob.data as string) as any[];

    const onOpen = (data: any) => {
        router.push({pathname: '/product-details', params: {data: JSON.stringify(data)}})
    }

    return (
        <>
            <Stack.Screen options={{
                title: 'Lista produktów',
                headerBackTitle: 'Wróć',
                headerStyle: {backgroundColor: '#f6f8f9'}
            }}/>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.list}>
                        <CardHeader>{`Wyniki wyszukiwania dla: "${glob.product}"`}</CardHeader>
                        <Text style={{
                            fontSize: 13,
                            color: '#52575f',
                            marginBottom: 16,
                            paddingHorizontal: 30,
                        }}>{`Liczba znalezionych produktów: ${data.length}`}</Text>
                        {
                            (data || []).map((data, index) => (
                                <Pressable key={index} onPress={() => onOpen(data)}>
                                    <CardBody smallGap>
                                        <Issue reason={data.name} count={-1}
                                               color={data.type === 'compliant' ? '#0452a8' : data.type === 'non-compliant' ? '#CD291C' : '#FFC672'}/>
                                    </CardBody>
                                </Pressable>
                            ))
                        }
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
