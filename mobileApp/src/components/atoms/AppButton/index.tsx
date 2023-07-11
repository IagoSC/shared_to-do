import { PropsWithChildren } from "react";
import { 
    Text,
    ColorValue,
    TouchableHighlight,
    TouchableHighlightProps,
    StyleProp,
    TextStyle
} from "react-native";
import { styles } from "./styles";

type AppButtonProps = PropsWithChildren<TouchableHighlightProps & {
    title: string
    titleStyle?: StyleProp<TextStyle>
    color?: ColorValue
}>

export function AppButton({style, ...props}: AppButtonProps): JSX.Element {
    return (
        <TouchableHighlight
            style={[styles.touchable, style]}
            {...props}
        >
            <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
        </TouchableHighlight>
    )
}