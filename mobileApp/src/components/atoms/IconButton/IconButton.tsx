import { PropsWithChildren } from "react";
import { ColorValue, StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type IconButtonProps = PropsWithChildren<{
    onPress: () => void
    name: string
    style?: StyleProp<ViewStyle>
    size: number
    color?: ColorValue
}>


export function IconButton(props: IconButtonProps): JSX.Element {
    const {
        onPress,
        name,
        style,
        size,
        color = "black"
    } = props

    return (
        <TouchableOpacity
            style={[style, {width: size, height: size}]}
            onPress={onPress}
        >
            <Icon
                color={color}
                size={size}
                name={name}
            />
        </TouchableOpacity>
    )
}