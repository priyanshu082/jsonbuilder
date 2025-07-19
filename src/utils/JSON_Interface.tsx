// utils/JSON_Interface.ts

export type FieldType = 'string' | 'number' | 'float' | 'boolean' | 'nested' | 'objectsid' | 'array';

export interface JSON_Interface {
    id: string;
    name: string;
    type: FieldType;
    defaultValue?: string | number | boolean | any[];
    children?: JSON_Interface[];
}

export interface FormValue {
    schema: JSON_Interface[];
}

export const DEFAULT_VALUES: Record<FieldType, any> = {
    string: "Sample Text",
    number: 42,
    float: 3.14,
    boolean: true,
    nested: undefined,
    objectsid: "507f1f77bcf86cd799439011",
    array: []
};

export const generateId = (): string => {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 10)
    );
};

export const createNewField = (
    name: string = "newField",
    type: FieldType = "string"
): JSON_Interface => {
    return {
        id: generateId(),
        name,
        type,
        defaultValue:
            type !== "nested" && type !== "array"
                ? DEFAULT_VALUES[type]
                : undefined,
        children: type === "nested" ? [] : undefined
    };
};
