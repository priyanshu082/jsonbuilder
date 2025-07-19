import type { JSON_Interface } from "./JSON_Interface";

type TypeObject = Record<string, any>;

export const generateId = (): string => {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 10)
    );
};

export const createEmptyField = (): JSON_Interface => ({
    id: Date.now().toString(36) + Math.random().toString(36).substring(2, 10),
    name: '',
    type: 'string',
    children: undefined,
});

export const convertSchemaToTypeObject = (fields: JSON_Interface[]): TypeObject => {
    return fields.reduce((result, field) => {
        if (!field.name) return result;
        result[field.name] = getFieldValue(field);
        return result;
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

const hasChildren = (field: JSON_Interface): field is JSON_Interface & { children: JSON_Interface[] } => {
    return Array.isArray(field.children) && field.children.length > 0;
};
