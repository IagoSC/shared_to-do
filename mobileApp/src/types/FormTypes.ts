type BaseFieldProperties =  {
    name: string,
    label: string,
    editable?: boolean
    placeholder?: string
}

export type Option = {
    label: string
    value: string
}

type SelectorFieldProperties = {
    type: "select"
    options: Option[]
}

export type FieldProperties = BaseFieldProperties & (SelectorFieldProperties | {type: "multi-text" | "text" | "switch"})

export type FieldTypes = boolean | string | string[]

export type FormValues = {
    [key: string]: FieldTypes
}