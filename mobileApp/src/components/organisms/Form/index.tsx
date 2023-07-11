import { View, Button, ScrollView} from "react-native"
import { FormField } from "../../atoms/FormField"
import { FormValues, FieldProperties, FieldTypes } from "../../../types/FormTypes"


type FormProps = {
    formFields: FieldProperties[]
    onChange: (name: string, value: FieldTypes) => void
    onSave: (...params: any[]) => void
    values: FormValues
}

export function Form(props: FormProps): JSX.Element {
    const {
        formFields,
        onChange,
        onSave,
        values
    } = props

    return (
        <View
            style={{flex: 1, margin: 10}}
        >
            <ScrollView>
                {
                    formFields.map((fieldProperties) => {
                        return <FormField
                            key={`formField-${fieldProperties.name}`}
                            value={values[fieldProperties.name]}
                            onChange={onChange}
                            {...fieldProperties}
                        />
                    })
                }
            </ScrollView>
            <Button
                title="SAVE"
                onPress={onSave}
            />
        </View>
    )
}