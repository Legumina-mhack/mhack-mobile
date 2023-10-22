import {Stack, useRouter} from "expo-router";
import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
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
    valid: true as boolean,
    name: null as string | null,
    model: null as string | null,
    serialNumber: null as string | null,
    manufacture: null as string | null,
    reseller: null as string | null,
    date: null as string | null,
    details: null as string | null,
    requestType: null as string | null,
    images: null as string | null,
    email: null as string | null,
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
        email: '',
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
        const errors: Partial<{ [k in keyof Omit<typeof initialErrors, 'valid'>]: string }> & { valid: boolean } = {valid: true};

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

        if (!form.email) {
            errors.email = 'To pole jest wymagane';
            errors.valid = false;
        } else if (!form.email.includes('@')) {
            errors.email = 'Podany adres jest nieprawidłowy';
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

        const response = await createIssue({
            title: 'test',
            description: form.details,
            mediaUrls: [
                'https://mobywatel-pk6zduh9z4.s3.eu-central-1.amazonaws.com/aaaaaaaa.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJIMEYCIQD0NuYCr4GiqRJgNN6t7T4ENWhd49%2BkZreYuZHOaqf9iQIhAMG%2FLirovx%2F%2FYWdqW6WgXNtpYXReSoIqSaEILZQ1W7t0KvECCPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNDUxMjM3Njc0MTcyIgz0DvdvDT6ZV1IhHtwqxQKZcKTLVHgSaR31n3p2rPHOzcUqB1bLqB6%2Bp8L6K%2F3XMJsoCpLCHY451so0DeZgSDrAOc%2BGnKYUpvE2vnQuLbNMFKAOBuJIQ5I0Fc4IuCMEujBdy92ljdaIPLlko4aCwcLchGmlx5oVfqUJ7qpO%2FWN2GIKj8isUd%2FvG8TwqjgjXy1soLMwO8Z48G5wxGKStChDEaMG0AqskOtRuww9W%2BORjf8i4pBKfLJRcRnd9kXnAY0QkrHCzLR%2BIZ4iI8K43Dua%2FRLorvkV5k4g2bjmKMa3oaf2XzFLyKqtfFsvTSGKR0OSCLUkp5cdypQCvn0nLmjL6pJfkgUED21mQsclLH5C8kQF52GTWSoD%2FGV2eCKIi9jaqqWt%2BcNov%2Fqz1NIHO9zo1R8RDOm%2Bic0Rx7d8o5A9hVzSEipwHHWrdtYsed6iogiaDqjaOMPD20akGOrICLToaqa8MFoEHREqpYAYUbdG1kNS0BblYc6jp38v0qvHNP4ipyW5GM%2BXh5O3wUabBP6nHJTE7DYZmC2ZrTmphJViE3IerWyo58dkl8mLvEgkWLkoZx3LCJ5DoCgsBaapftzg7RUZuqYqrWzUk3%2FwrSHVvMqzMnOpY1nXTse1AZK8Z8Z1dSeJjAcGbM7Sz9rGxYf38EN8LSm%2FM6aCjPc4NHFScj48wjUwGinWDe3sftbnqr%2BqhofEmsdJSArVKU6QoRdWbXy53NKYXG9UzxdKuq1JGLOaUgWtwdzy8%2FtQjtOsQpl02DLtVB5U1OTCqoHMxtU55TAwmvwpsB7Xm5PxaJASaTQBYldPXTEKrZ%2Flzw4JzwmtogSzCEARfLqHaLW4gL6BniMod%2BFA8tW%2B1w6wRx27s&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231022T013228Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAWSD64PS6I2GFG7FT%2F20231022%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=288df7a2023e3d4ff7e7ee6d2a3a0a603eaa5d20c110a91455fce9aae61b1c1b',
                'https://mobywatel-pk6zduh9z4.s3.eu-central-1.amazonaws.com/aaaaaaaaaccc.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJIMEYCIQD0NuYCr4GiqRJgNN6t7T4ENWhd49%2BkZreYuZHOaqf9iQIhAMG%2FLirovx%2F%2FYWdqW6WgXNtpYXReSoIqSaEILZQ1W7t0KvECCPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNDUxMjM3Njc0MTcyIgz0DvdvDT6ZV1IhHtwqxQKZcKTLVHgSaR31n3p2rPHOzcUqB1bLqB6%2Bp8L6K%2F3XMJsoCpLCHY451so0DeZgSDrAOc%2BGnKYUpvE2vnQuLbNMFKAOBuJIQ5I0Fc4IuCMEujBdy92ljdaIPLlko4aCwcLchGmlx5oVfqUJ7qpO%2FWN2GIKj8isUd%2FvG8TwqjgjXy1soLMwO8Z48G5wxGKStChDEaMG0AqskOtRuww9W%2BORjf8i4pBKfLJRcRnd9kXnAY0QkrHCzLR%2BIZ4iI8K43Dua%2FRLorvkV5k4g2bjmKMa3oaf2XzFLyKqtfFsvTSGKR0OSCLUkp5cdypQCvn0nLmjL6pJfkgUED21mQsclLH5C8kQF52GTWSoD%2FGV2eCKIi9jaqqWt%2BcNov%2Fqz1NIHO9zo1R8RDOm%2Bic0Rx7d8o5A9hVzSEipwHHWrdtYsed6iogiaDqjaOMPD20akGOrICLToaqa8MFoEHREqpYAYUbdG1kNS0BblYc6jp38v0qvHNP4ipyW5GM%2BXh5O3wUabBP6nHJTE7DYZmC2ZrTmphJViE3IerWyo58dkl8mLvEgkWLkoZx3LCJ5DoCgsBaapftzg7RUZuqYqrWzUk3%2FwrSHVvMqzMnOpY1nXTse1AZK8Z8Z1dSeJjAcGbM7Sz9rGxYf38EN8LSm%2FM6aCjPc4NHFScj48wjUwGinWDe3sftbnqr%2BqhofEmsdJSArVKU6QoRdWbXy53NKYXG9UzxdKuq1JGLOaUgWtwdzy8%2FtQjtOsQpl02DLtVB5U1OTCqoHMxtU55TAwmvwpsB7Xm5PxaJASaTQBYldPXTEKrZ%2Flzw4JzwmtogSzCEARfLqHaLW4gL6BniMod%2BFA8tW%2B1w6wRx27s&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231022T013309Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43199&X-Amz-Credential=ASIAWSD64PS6I2GFG7FT%2F20231022%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=4cd4dc908d0b41767618baad7d3516b436298862893c83bf8bb6352c73e43102'
            ],
            sellerName: form.reseller,
            productName: form.name,
            productSN: form.serialNumber,
            productCompany: form.manufacture,
            transactionDate: "2023-01-01T23:00:00Z",
            consumerAddress: '12-345 From, ul. mObywatel 6',
            email: form.email,
            returnOrExchange: 'return',
        })

        router.replace('/complaint-summary')
    }

    return (
        <>
            <Stack.Screen options={{
                title: 'Reklamacja towaru',
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
                            <FormDropdown
                                items={[
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
                        <CardHeader>Dane kontaktowe</CardHeader>
                        <CardBody>
                            <FormHeader>Na wskazany adres otrzymasz dalsze instrukcje</FormHeader>
                            <FormControl error={!!errors.email} value={form.email} onChange={(email) => onFormChange('email', email)}/>
                            {errors.email && <FormError>{errors.email}</FormError>}
                        </CardBody>
                        <StyledButton variant={'blue'} onClick={onSubmit}>Zatwierdź</StyledButton>
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
