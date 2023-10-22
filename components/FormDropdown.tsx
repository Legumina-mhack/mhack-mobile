import {ChevronDownIcon} from "@app/components/Icons";
import SelectDropdown from "react-native-select-dropdown";

export type FormDropdownProps = {
    items: string[]
    onSelect?: (value: string) => void;
}

export const FormDropdown = (props: FormDropdownProps) => {
    return (
        <SelectDropdown
            data={props.items}
            onSelect={(i) => props.onSelect && props.onSelect(i)}
            buttonTextAfterSelection={(i, index) => i}
            rowTextForSelection={(i, index) => i}
            defaultButtonText={' '}
            dropdownOverlayColor={'transparent'}
            buttonStyle={{
                height: 44,
                width: '100%',
                borderWidth: 1,
                borderColor: '#a4aab2',
                marginBottom: 16,
                backgroundColor: '#ffffff',
                paddingHorizontal: 3,
                paddingLeft: 10,
                borderRadius: 8
            }}
            buttonTextStyle={{
                textAlign: 'left',
            }}
            dropdownStyle={{
                borderTopWidth: 1,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#a4aab2',
                backgroundColor: '#ffffff',
            }}
            rowTextStyle={{
                textAlign: 'left',
            }}
            renderDropdownIcon={ChevronDownIcon}
        />
    )
}
