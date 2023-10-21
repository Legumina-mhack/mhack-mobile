import {Text} from "react-native";
import {PropsWithChildren} from "react";

export const CardHeader = (props: PropsWithChildren) => {
    return (<Text style={{fontSize: 16, paddingHorizontal: 30}}>{props.children}</Text>)
}
