import {Text, View} from "react-native";
import {PropsWithChildren} from "react";

export type FormErrorProps = {
    center?: boolean;
}

export const FormError = (props: PropsWithChildren<FormErrorProps>) => {
    return (
        <View style={{marginBottom: 16}}><Text
            style={[{color: '#cd291c'}, props.center ? {textAlign: 'center'} : {}]}>{props.children}</Text></View>
    )
}
