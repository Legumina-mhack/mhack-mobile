import {ImageBackground, Pressable, SafeAreaView, StyleSheet, View} from "react-native";
import {HomeScreenImage} from "@app/components/Images";
import {ServiceTile} from "@app/components/ServiceTile";
import {WarrantyIcon} from "@app/components/Icons";
import {Stack, useRouter} from "expo-router";

export default function Index() {
    const router = useRouter();

    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <View style={styles.container}>
                <ImageBackground source={HomeScreenImage} style={styles.image}>
                    <SafeAreaView>
                        <Pressable onPress={() => router.push('/services')}>
                            <View style={styles.service}>
                                <ServiceTile icon={WarrantyIcon} text={'Konsument'}/>
                            </View>
                        </Pressable>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        flexGrow: 1,
        height: null,
        resizeMode: 'cover',
    },
    service: {
        position: 'absolute',
        top: 374 + 137 * 2,
        left: 22,
    }
});
