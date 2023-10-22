import {Stack, useRouter} from "expo-router";
import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {CardHeader} from "@app/components/CardHeader";
import {CardBody} from "@app/components/CardBody";
import {FormHeader} from "@app/components/FormHeader";
import {FormControl} from "@app/components/FormControl";
import {StyledButton} from "@app/components/StyledButton";
import {useState} from "react";
import {Issue} from "@app/components/Issue";

const apiMock = [
    {reason: 'Krótki czas działania słuchawek po naładowaniu baterii', count: 4},
    {reason: 'Nieprawidłowe działanie mikrofonu', count: 2},
    {reason: 'Awaria przewodu ładowania', count: 1},
]

export default function CheckProduct() {
    const router = useRouter()

    const [form, setForm] = useState({
        name: '',
        model: '',
        manufacture: '',
    })

    const onFormChange = (partialForm: Partial<typeof form>) => setForm({...form, ...partialForm})

    return (
        <>
            <Stack.Screen options={{
                title: 'Sprawdź produkt',
                headerBackTitle: 'Wróć',
                headerStyle: {backgroundColor: '#f6f8f9'}
            }}/>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.list}>
                        <CardHeader>Informacje o produkcie</CardHeader>
                        <CardBody>
                            <FormHeader>Nazwa produktu</FormHeader>
                            <FormControl value={form.name} onChange={(name) => onFormChange({name})}/>
                            <FormHeader>Model</FormHeader>
                            <FormControl value={form.model} onChange={(model) => onFormChange({model})}/>
                            <FormHeader>Wytwórca</FormHeader>
                            <FormControl value={form.manufacture}
                                         onChange={(manufacture) => onFormChange({manufacture})}/>
                            <FormHeader>Najczęściej zgłaszane nieprawidłowości</FormHeader>
                            {apiMock.map((data, index) => (
                                <Issue key={index} reason={data.reason} count={data.count}/>
                            ))}
                        </CardBody>
                        <StyledButton variant={'blue'}>Szukaj</StyledButton>
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
