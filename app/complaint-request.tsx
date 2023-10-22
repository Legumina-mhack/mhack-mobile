import {Stack, useRouter} from "expo-router";
import {SafeAreaView, ScrollView, StyleSheet, View, DatePickerIOS} from "react-native";
import {CardHeader} from "@app/components/CardHeader";
import {CardBody} from "@app/components/CardBody";
import {FormHeader} from "@app/components/FormHeader";
import {FormControl} from "@app/components/FormControl";
import {StyledButton} from "@app/components/StyledButton";
import {useState} from "react";
import {FormDropdown} from "@app/components/FormDropdown";
import {createIssue} from "@app/tools/api";
import * as ImagePicker from "expo-image-picker";
import {ImagePreview} from "@app/components/ImagePreview";
import {PillButton} from "@app/components/PillButton";
import {FormError} from "@app/components/FormError";

const apiMock = [
    {reason: 'Krótki czas działania słuchawek po naładowaniu baterii', count: 4},
    {reason: 'Nieprawidłowe działanie mikrofonu', count: 2},
    {reason: 'Awaria przewodu ładowania', count: 1},
]

const initialErrors = {
    name: null as string | null,
    model: null as string | null,
    serialNumber: null as string | null,
    manufacture: null as string | null,
    reseller: null as string | null,
    date: null as string | null,
    details: null as string | null,
    requestType: null as string | null,
    images: null as string | null,
}

export default function ComplaintRequest() {
    const router = useRouter()

    const [form, setForm] = useState({
        name: '',
        model: '',
        serialNumber: '',
        manufacture: '',
        reseller: '',
        details: '',
        requestType: '',
        invoiceId: '',
        date: '',
        images: [] as { uri: string, fileName?: string | null }[],
    })
    const [errors, setErrors] = useState(initialErrors)

    const pickImage = async () => {
        setErrors({ ...errors, images: null })

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


    const onFormChange = (key: keyof typeof form, value: any) => {
        setForm({...form, [key]: value})
        setErrors({ ...errors, [key]: null })
    }

    const validate = () => {
        const errors: Partial<{ [k in keyof typeof initialErrors]: string }> & { valid: boolean } = {valid: true};

        if (!form.name) {
            errors.name = 'To pole jest wymagane';
            errors.valid = false;
        }

        if (!form.model) {
            errors.model = 'To pole jest wymagane';
            errors.valid = false;
        }

        if (!form.serialNumber) {
            errors.serialNumber = 'To pole jest wymagane';
            errors.valid = false;
        }

        if (!form.manufacture) {
            errors.manufacture = 'To pole jest wymagane';
            errors.valid = false;
        }

        if (!form.reseller) {
            errors.reseller = 'To pole jest wymagane';
            errors.valid = false;
        }

        if (!form.date) {
            errors.date = 'To pole jest wymagane';
            errors.valid = false;
        }

        if (!form.details) {
            errors.details = 'To pole jest wymagane';
            errors.valid = false;
        }

        if (form.images.length === 0) {
            errors.images = 'To pole jest wymagane';
            errors.valid = false;
        }


        return errors;
    }

    const onSubmit = async () => {
        const errors = validate();

        if (!errors.valid) {
            setErrors({...initialErrors, ...errors})
            return;
        }

        // const presignedUrls = (await fetchPresignedUrls(form.images.length)).map(({urlToUpload}) => urlToUpload);

        try {
            const response = await createIssue({
                title: 'test',
                description: form.details,
                mediaUrls: ['https://www.national-geographic.pl/media/cache/big/uploads/media/default/0014/57/naukowcy-chca-wyslac-kosmitom-obrazek-z-nagimi-ludzmi-co-jeszcze-znajdzie-sie-w-wiadomosci.jpeg',],
                sellerName: form.reseller,
                productName: form.name,
                productSN: form.serialNumber,
                productCompany: form.manufacture,
                transactionDate: "2023-01-01T23:00:00Z",
                consumerAddress: '12-345 From, ul. mObywatel 6',
                email: 'from.mobywatel@example.com',
                returnOrExchange: 'return',
            })
            console.log(response);
        } catch (e) {
            console.log(e.response?.data)
            // console.log(e.response.data)
        }

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
                            <FormControl error={!!errors.name} value={form.name}
                                         onChange={(name) => onFormChange('name', name)}/>
                            {errors.name && <FormError>{errors.name}</FormError>}
                            <FormHeader>Model</FormHeader>
                            <FormControl error={!!errors.model} value={form.model} onChange={(model) => onFormChange('model', model)}/>
                            {errors.model && <FormError>{errors.model}</FormError>}
                            <FormHeader>Numer seryjny</FormHeader>
                            <FormControl error={!!errors.serialNumber} value={form.serialNumber}
                                         onChange={(serialNumber) => onFormChange('serialNumber', serialNumber)}/>
                            {errors.serialNumber && <FormError>{errors.serialNumber}</FormError>}
                            <FormHeader>Wytwórca</FormHeader>
                            <FormControl error={!!errors.manufacture} value={form.manufacture}
                                         onChange={(manufacture) => onFormChange('manufacture', manufacture)}/>
                            {errors.manufacture && <FormError>{errors.manufacture}</FormError>}
                            <FormHeader>Sprzedawca</FormHeader>
                            <FormControl error={!!errors.reseller} value={form.reseller}
                                         onChange={(reseller) => onFormChange('reseller', reseller)}/>
                            {errors.reseller && <FormError>{errors.reseller}</FormError>}
                            <FormHeader>Data zakupu</FormHeader>
                            <FormControl error={!!errors.date} value={form.date}
                                         onChange={(date) => onFormChange('date', date)}/>
                            {errors.date && <FormError>{errors.date}</FormError>}
                        </CardBody>
                        <CardBody>
                            <FormHeader>Szczegóły</FormHeader>
                            <FormControl error={!!errors.details} value={form.details} onChange={(details) => onFormChange('details', details)}
                                         multiline={true}/>
                            {errors.details && <FormError>{errors.details}</FormError>}
                        </CardBody>
                        <CardHeader>Rodzaj żądania</CardHeader>
                        <CardBody>
                            <FormHeader>Twoje oczekiwania w związku z wnioskiem</FormHeader>
                            <FormDropdown items={[
                                'Naprawa lub wymiana',
                                'Obniżenie ceny',
                                'Odstąpienie od umowy',
                                'Obniżenie ceny lub odstąpienie od umowy',
                            ]} onSelect={(requestType) => setForm({...form, requestType})}/>
                        </CardBody>
                        <CardHeader>Dowód zakupu</CardHeader>
                        <CardBody>
                            <View style={styles.gallery}>
                                {form.images.map(({uri, fileName}, index) => (
                                    <ImagePreview key={index} uri={uri} name={fileName}
                                                  onRemove={() => removeImage(index)}/>
                                ))}
                                <PillButton error={!!errors.images} onClick={pickImage}>Dodaj zdjęcie</PillButton>
                                {errors.images && <FormError center={true}>{errors.images}</FormError>}
                            </View>
                        </CardBody>
                        <StyledButton variant={'blue'} onClick={onSubmit}>Szukaj</StyledButton>
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
