import {Stack, useRouter} from "expo-router";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {CardBody} from "@app/components/CardBody";
import {FormHeader} from "@app/components/FormHeader";
import {StyledButton} from "@app/components/StyledButton";


let num = 224;

export default function CheckProduct() {
    const router = useRouter()


    return (
        <>
            <Stack.Screen options={{
                title: 'Podsumowanie reklamacji',
                headerBackTitle: 'Wróć',
                headerStyle: {backgroundColor: '#f6f8f9'}
            }}/>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.list}>
                        <CardBody>
                            <Text style={{ fontSize: 16, marginBottom: 16 }}>
                                {`Twój wniosek DNR-2/${++num}/2023 został zarejestrowany i zostanie przesłany do odpowiedniego organu.`}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                Na Twoją skrzynkę mailową zostaną wysłane szczegółowe informacje i dalsze instrukcje.
                            </Text>
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
})
