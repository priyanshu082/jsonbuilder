import type { JSON_Interface } from "./JSON_Interface";

type TypeObject = Record<string, JSON_Interface['type']>;


export const convertSchemaToTypeObject = (fields: JSON_Interface[]): TypeObject => {
    return fields.reduce((result, field) => {
        if (!field.name) return result;
        result[field.name] = getFieldValue(field);
        return result
    }, {} as TypeObject);
};

export const getFieldValue = (field: JSON_Interface): any => {
    switch (field.type) {
        case 'nested':
            return hasChildren(field) ? convertSchemaToTypeObject(field.children!) : {};
        case 'array':
            return hasChildren(field) ? field.children!.map(getArrayItemValue) : [];
        case 'objectsid':
            return hasChildren(field) ? convertSchemaToTypeObject(field.children!) : {};
        default:
            return field.type;
    }
};

export const getArrayItemValue = (child: JSON_Interface): any => {
    if (child.type === 'nested' && hasChildren(child)) {
        return convertSchemaToTypeObject(child.children!);
    }
    if (child.type === 'array') {
        return hasChildren(child) ? child.children!.map(getArrayItemValue) : [];
    }
    if (child.type === 'objectsid' && hasChildren(child)) {
        return convertSchemaToTypeObject(child.children!);
    }
    return child.name ? { [child.name]: child.type } : child.type;
};

const hasChildren = (field : JSON_Interface) : boolean => {
    return Array.isArray(field.children) && field.children.length > 0;
};
