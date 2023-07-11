
import {Picker} from '@react-native-picker/picker';
import {
    Text,
    View,
    StyleProp,
    ViewStyle
} from "react-native"
import {PropsWithChildren} from "react"
import { styles } from './styles';
import { Option } from '../../../types/FormTypes';

type LabeledSelectorProps = PropsWithChildren<{
    placeholder?: string
    value: string
    label?: string
    containerStyle?: StyleProp<ViewStyle>
    onChange: (value: string) => void
    options: Option[]
}>

export function LabeledSelector(props: LabeledSelectorProps):JSX.Element {
    const {
        value,
        onChange,
        containerStyle,
        placeholder,
        label,
        options = []
    } = props

    return (
        <View
            style={[{}, containerStyle]}
        >
            <Text style={styles.label}>{label}</Text>
            <Picker
                selectedValue={value as string}
                onValueChange={(value) => onChange(value as string)}
                placeholder={placeholder}
            >
                {(options).map(option => {
                    return <Picker.Item
                         key={`picker-option-${option}`}
                         value={option.value}
                         label={option.label}
                    />
                })}
            </Picker>
        </View>
    )
}