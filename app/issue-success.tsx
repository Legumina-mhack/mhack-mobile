import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
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


export default function IssueSuccess() {
    const router = useRouter();

    return (
        <>
            <Stack.Screen options={{
                title: 'Status zgłoszenia',
                headerBackTitle: 'Wróć',
                headerStyle: {backgroundColor: '#f6f8f9'}
            }}/>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.list}>
                        <CardBody>
                            <Text style={{ fontSize: 16, marginBottom: 16 }}>
                                Twoje zgłoszenie zostało przyjęte i zostanie wykorzystane do zasilenia obecnej bazy nieprawidłowości.
                            </Text>
                            <Text style={{ fontSize: 16, marginBottom: 16 }}>
                                Dziękujemy za Twoją pomoc!
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

