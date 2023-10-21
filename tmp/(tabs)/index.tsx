import {ImageBackground, SafeAreaView, StyleSheet, Text, View} from 'react-native';

export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../../assets/images/home-screen.png')} style={styles.image}>
                <SafeAreaView>
                    <Text>Elements</Text>
                    <Text>in Front of</Text>
                    <Text>Background</Text>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
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
        // flex: 1,
        // flexDirection: 'column',
        // width: '100%',
        // height: '100%',
        // resizeMode: 'center',
    }
});
