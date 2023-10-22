import {Stack, useRouter} from "expo-router";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {BoxIcon, CameraIcon, CartShieldIcon, DraftIcon, PlaneIcon, SearchIcon, UserIcon} from "@app/components/Icons";
import {Info} from "@app/components/Info";
import {StyledButton} from "@app/components/StyledButton";

export default function ComplaintRequest() {
    const router = useRouter()


    return (
        <>
            <Stack.Screen options={{
                title: 'Reklamacja towaru',
                headerBackTitle: 'Wróć',
                headerStyle: {backgroundColor: '#f6f8f9'}
            }}/>
            <SafeAreaView style={styles.container}>
                <View style={{alignItems: 'center', marginBottom: 24}}>
                    <View style={{
                        width: 95,
                        height: 95,
                        backgroundColor: '#FFE6B7',
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingRight: 10
                    }}>
                        <CartShieldIcon width={48} height={48}/>
                    </View>
                </View>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: 267,
                    alignSelf: 'center',
                    marginBottom: 24
                }}>Złóż wniosek o reklamację z tytułu rękojmi</Text>
                <Text style={{
                    fontSize: 13,
                    color: '#6e6f74',
                    textAlign: 'center',
                    width: 267,
                    alignSelf: 'center',
                    marginBottom: 52
                }}>Zgłoszenia obsługiwane są przez Urząd Ochrony Konkurencji i Konsumentów</Text>
                <Info icon={BoxIcon} text={'Uzupełnij informacje o produkcie'}/>
                <Info icon={DraftIcon} text={'Opisz swój problem'}/>
                <Info icon={SearchIcon} text={'Wybierz swoje żądanie'}/>
                <Info icon={CameraIcon} text={'Dodaj zdjęcie dowodu zakupu i produktu'}/>
                <Info icon={UserIcon} text={'Wpisz swoje dane'}/>
                <Info icon={PlaneIcon} text={'Wyślij zgłoszenie'}/>
                <View style={{ paddingHorizontal: 16, marginTop: 16 }}><StyledButton variant={'blue'} onClick={() => router.replace('/complaint-request')}>Złóż wniosek</StyledButton></View>
            </SafeAreaView>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f8f9',
        justifyContent: 'center',
        padding: 16
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
