export const FIELD_TYPES = [
    { value: 'string', label: 'String' },
    { value: 'number', label: 'Number' },
    { value: 'float', label: 'Float' },
    { value: 'boolean', label: 'Boolean' },
    { value: 'nested', label: 'Nested' },
    { value: 'objectsid', label: 'ObjectSid' },
    { value: 'array', label: 'Array' },
  ];

export interface JSON_Interface {
    id: string;
    name: string;
    type: 'string' | 'number' | 'float' | 'boolean' | 'nested' | 'objectsid' | 'array';
    children?: JSON_Interface[];
}

export const createEmptyField = (): JSON_Interface => ({
    id: Date.now().toString(36) + Math.random().toString(36).substring(2, 10),
    name: '',
    type: 'string',
    children: undefined,
  });




