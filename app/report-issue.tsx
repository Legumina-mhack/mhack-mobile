import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {Stack, useRouter} from "expo-router";
import {useState} from "react";
import {CardBody} from "@app/components/CardBody";
import {FormControl} from "@app/components/FormControl";
import {PillButton} from "@app/components/PillButton";
import {FormHeader} from "@app/components/FormHeader";
import {CardHeader} from "@app/components/CardHeader";
import * as ImagePicker from 'expo-image-picker';
import {StyledButton} from "@app/components/StyledButton";
import {ImagePreview} from "@app/components/ImagePreview";
import {createIssue, fetchPresignedUrls} from "@app/tools/api";


export default function ReportIssue() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        model: '',
        serialNumber: '',
        manufacture: '',
        details: '',
        images: [] as { uri: string, fileName?: string | null }[],
    })

    const onFormChange = (partialForm: Partial<typeof form>) => setForm({...form, ...partialForm})

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            allowsMultipleSelection: true
        });

        if (!result.canceled) {
            setForm({...form, images: [...form.images, ...result.assets.map(({uri, fileName}) => ({uri, fileName}))]})
        }
    };

    const removeImage = async (index: number) => {
        setForm({
            ...form,
            images: [...form.images.slice(0, index), ...form.images.slice(index + 1, form.images.length)]
        })
    }

    const onSubmit = async () => {
        const presignedUrls = (await fetchPresignedUrls(form.images.length)).map(({urlToUpload}) => urlToUpload);

        try {
            const response = await createIssue({
                title: 'NaN',
                description: form.details,
                mediaUrls: [],
                sellerName: 'NaN',
                productName: form.name,
                productSN: form.serialNumber,
                productCompany: form.manufacture,
                transactionDate: "2023-01-01T23:00:00Z",
                consumerAddress: '12-345 From, ul. mObywatel 6',
                email: 'from.mobywatel@example.com',
            })
            console.log(response);
        } catch (e) {
            console.log(e.response.data)
        }

    }

    return (
        <>
            <Stack.Screen options={{
                title: 'Zgłoś problem',
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
                            <FormHeader>Numer seryjny</FormHeader>
                            <FormControl value={form.serialNumber}
                                         onChange={(serialNumber) => onFormChange({serialNumber})}/>
                            <FormHeader>Wytwórca</FormHeader>
                            <FormControl value={form.manufacture}
                                         onChange={(manufacture) => onFormChange({manufacture})}/>
                        </CardBody>
                        <CardHeader>Opis zgłoszenia</CardHeader>
                        <CardBody>
                            <FormHeader>Szczegóły</FormHeader>
                            <FormControl value={form.details} onChange={(details) => onFormChange({details})}
                                         multiline={true}/>
                        </CardBody>
                        <CardHeader>Załączniki</CardHeader>
                        <CardBody>
                            <View style={styles.gallery}>
                                {form.images.map(({uri, fileName}, index) => (
                                    <ImagePreview key={index} uri={uri} name={fileName}
                                                  onRemove={() => removeImage(index)}/>
                                ))}
                                <PillButton onClick={pickImage}>Dodaj zdjęcie</PillButton>
                            </View>
                        </CardBody>
                        <StyledButton variant={'blue'} onClick={onSubmit}>Dalej</StyledButton>
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

