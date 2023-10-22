import {Stack, useRouter} from "expo-router";
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {CardHeader} from "@app/components/CardHeader";
import {CardBody} from "@app/components/CardBody";
import {FormHeader} from "@app/components/FormHeader";
import {FormControl} from "@app/components/FormControl";
import {StyledButton} from "@app/components/StyledButton";
import React, {useState} from "react";
import {fetchProductsFaults} from "@app/tools/api";

const apiMock = [
    {reason: 'Krótki czas działania słuchawek po naładowaniu baterii', count: 4},
    {reason: 'Nieprawidłowe działanie mikrofonu', count: 2},
    {reason: 'Awaria przewodu ładowania', count: 1},
]

export default function ProductCheck() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        name: '',
    })

    // const [data, setData] = useState<any[] | null>(null)

    const onFormChange = (partialForm: Partial<typeof form>) => setForm({...form, ...partialForm})

    const onSubmit = async () => {
        setLoading(true)
        try {
            const data = await fetchProductsFaults(form.name)
            router.replace({
                pathname: '/product-list', params: {
                    product: form.name,
                    data: JSON.stringify(data)
                }
            })
        } catch (e) {
            console.log(e.response.data)
        }
        setLoading(false)
    }

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
                        <StyledButton variant={'blue'} onClick={onSubmit}>
                            {loading ? <ActivityIndicator style={{}} size="small" color="#fff"/> : 'Szukaj'}
                        </StyledButton>
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
