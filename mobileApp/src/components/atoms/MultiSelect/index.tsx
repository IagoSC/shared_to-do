import {
    ScrollView,
    View,
    Text,
    StyleProp,
    ViewStyle
} from 'react-native';
import { useState } from "react"
import { IconButton } from '../IconButton/IconButton';
import { LabeledTextInput } from '../LabeledTextInput';

type MultiSelectProps = {
    values: string[]
    onChange: (value: string[]) => void
    label?: string
    containerStyle?: StyleProp<ViewStyle>
}

export function MultiSelect(props: MultiSelectProps): JSX.Element {
    const {
        values = [],
        onChange,
        label,
        containerStyle
    } = props

    const [textInputValue, setTextInputValue] = useState<string>()

    function removeSelected(value: string) {
        onChange(values.filter(el => el !== value))
    }

    function addNewText() {
        if(textInputValue && !values.includes(textInputValue)){
            const newValues = [...values, textInputValue]
            onChange(newValues)
        } 
        setTextInputValue("")
    }

    return (
        <View style={[{flex: 1}, containerStyle]}>
            <View style={{flexDirection: "row", }}>
                <LabeledTextInput
                    label={label}
                    value={textInputValue}
                    containerStyle={{width: "80%"}}
                    style={{ flex: 8}}
                    onChangeText={setTextInputValue}
                />
                <IconButton
                    style={{alignSelf: "center"}}
                    name='plus'
                    onPress={addNewText}
                    size={30}
                    />
            </View>
            <ScrollView
                horizontal={true}
                style={{flex: 1, height: 50, flexDirection: "row"}}
            >
                {
                    values.map(value => (
                        <Text 
                            style={{margin: 5, width: 125, height: 25, borderWidth: 1, borderRadius: 50, fontSize: 15, }} 
                            ellipsizeMode='tail'
                            lineBreakMode='tail'
                            key={value}
                            onPress={() => removeSelected(value)}
                        >{value}</Text>)
                    )
                } 
            </ScrollView>
        </View>
    )
}