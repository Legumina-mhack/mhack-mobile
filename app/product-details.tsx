import {Stack, useLocalSearchParams, useRouter} from "expo-router";
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {StyledButton} from "@app/components/StyledButton";
import React, {useEffect, useState} from "react";
import {CardHeader} from "@app/components/CardHeader";
import {CardBody} from "@app/components/CardBody";
import {FormHeader} from "@app/components/FormHeader";
import {fetchProductFaults} from "@app/tools/api";
import {Issue} from "@app/components/Issue";

const apiMock = [
    {reason: 'Krótki czas działania słuchawek po naładowaniu baterii', count: 4},
    {reason: 'Nieprawidłowe działanie mikrofonu', count: 2},
    {reason: 'Awaria przewodu ładowania', count: 1},
]

export default function ProductDetails() {
    const router = useRouter()
    const glob = useLocalSearchParams()
    const data = JSON.parse(glob.data as string) as any;
    const [complaints, setComplaints] = useState<any[]>([])

    useEffect(() => {
        const callback = async () => {
            if (data.type !== "own") return;
            const response = await fetchProductFaults(data.name);
            setComplaints(response)
        }

        callback();
    }, [])

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
                            <Text style={{fontSize: 16, marginBottom: 16}}>{data.name ?? 'Brak danych'}</Text>
                            <FormHeader>Model</FormHeader>
                            <Text style={{fontSize: 16, marginBottom: 16}}>{data.model ?? 'Brak danych'}</Text>
                            <FormHeader>Producent</FormHeader>
                            <Text style={{fontSize: 16, marginBottom: 16}}>{data.manufacture ?? 'Brak danych'}</Text>
                            {data.type === "own" && (complaints.length > 0 ? (
                                <>
                                    <FormHeader>Najczęściej zgłaszane nieprawidłowości</FormHeader>
                                    {complaints.map((data, index) => (
                                        <Issue key={index} reason={data.reason} count={data.count}/>
                                    ))}
                                </>
                            ) : <ActivityIndicator size={"small"} color={'blue'}/>)}
                            {data.type === "non-compliant" && (
                                <>
                                    <FormHeader>Informacje o produkcie</FormHeader>
                                    <Issue reason={'Wyrób niezgodny z wymaganiami'} count={-1} color={'#CD291C'}/>
                                    <FormHeader>Opis niezgodności</FormHeader>
                                    <Text>
                                        Wyrób nie spełnia wymagań § 6 ust. 1 oraz w § 7 ust. 1 pkt 1, 2 i 4 rozporządzenia Ministra Rozwoju z dnia 2 czerwca 2016 r. w sprawie wymagań dla sprzętu elektrycznego (Dz. U. poz. 806), z uwagi na nieprawidłową instrukcję obsługi, nadmierne nagrzewanie się przycisku załączania grzania, zbyt duży przepływ prądu w próbie wytrzymałości elektrycznej, na brak zabezpieczenia przed polewaniem nasadki wodą, brak zabezpieczenia izolacji wyrobu przed skraplającą się wodą, nieprawidłową izolację, uszkodzenie ogranicznika temperatury, zbyt mały odstęp izolacyjny od styku sieciowego w nasadce do powierzchni dostępnej dla dotyku, oraz nieodpowiedni materiał wtyku czajnika.
                                    </Text>
                                </>
                            )}
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
