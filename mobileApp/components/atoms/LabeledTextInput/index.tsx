import {
    View,
    TextInput,
    TextInputProps,
    Text,
    StyleProp,
    ViewStyle
} from "react-native"
import { styles } from "./styles"

type LabeledTextInputProps = TextInputProps & {
    label?: string
    containerStyle?: StyleProp<ViewStyle>
}

export function LabeledTextInput({label, containerStyle, ...props}: LabeledTextInputProps) {
    return (
        <View
            style={[containerStyle]}
        >
            <Text style={styles.label}>{label}</Text>
            <TextInput
                {...props}
                style={styles.TextInput}
            />
        </View>
    )
}