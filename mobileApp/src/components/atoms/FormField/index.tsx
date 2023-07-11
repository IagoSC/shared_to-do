import React from "react"
import { FieldProperties, Option } from "../../../types/FormTypes"
import { MultiSelect } from "../MultiSelect"
import { LabeledTextInput } from "../LabeledTextInput"
import { LabeledSelector } from "../LabeledSelector"

type FormFieldProperties = FieldProperties & {
    onChange: (name: string, value: string[] | string | boolean) => void
    value: string[] | string | boolean
} 


export function FormField(props: FormFieldProperties): JSX.Element {
    const {
        type,
        onChange,
        placeholder,
        editable = true,
        name,
        value,
        label
    } = props


    switch(type){
        case "text":
            return <LabeledTextInput
                        label={label}
                        editable={editable}
                        value={value as string}
                        style={{}}
                        placeholder={placeholder}
                        onChangeText={value => onChange(name, value)}
                    />
        case "multi-text":
            return (
                <MultiSelect
                    label={label}
                    values={value as string[]}
                    onChange={values => onChange(name, values)}
                />
            )
        case "select":
            return (
                <LabeledSelector
                    label={label}
                    value={value as string}
                    options={props.options}
                    placeholder={placeholder}
                    onChange={value => onChange(name, value)}
                />
            )
        default:
            return <></>
    }
}