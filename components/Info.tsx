import {Text, View} from "react-native";
import {FunctionComponent} from "react";
import {SvgProps} from "react-native-svg";

export type InfoProps = {
    icon: FunctionComponent<SvgProps>,
    text: string;
}

export const Info = (props: InfoProps) => {
    return (
        <View style={{paddingHorizontal: 30, marginBottom: 24}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 50, alignItems: 'center'}}><props.icon height={23}/></View>
                <Text style={{fontSize: 14}}>{ props.text }</Text>
            </View>
        </View>
    )
}
