import React from 'react';
import { Plus, Database } from 'lucide-react';
import type { JSON_Interface } from '@/utils/JSON_Interface';
import { createEmptyField } from '@/utils/JSON_Interface';
import FieldRow from './FieldRow';

interface FormComponentProps {
  schema: JSON_Interface[];
  setSchema: (schema: JSON_Interface[]) => void;
  level?: number;
}

const FormComponent: React.FC<FormComponentProps> = ({ schema, setSchema, level = 0 }) => {

 
  const handleAddRow = () => {
    setSchema([...schema, createEmptyField()]);
  };

  const handleNameChange = (idx: number, value: string) => {
    const newRows = [...schema];
    newRows[idx] = { ...newRows[idx], name: value };
    setSchema(newRows);
  };

  const handleTypeChange = (idx: number, value: string) => {
    const newRows =[...schema]
    const isNested=['nested','array','Objectsid'].includes(value);
    newRows[idx]= isNested ?
    {...newRows[idx],type :value as JSON_Interface['type'],children : newRows[idx].children || []} :
    {...newRows[idx],type:value as JSON_Interface['type']}
    setSchema(newRows);
  };

  const handleDeleteRow = (idx: number) => {
    const newRows = schema.filter((_, i) => i !== idx);
    setSchema(newRows);
  };

  const handleNestedChange = (idx: number, newChildren: JSON_Interface[]) => {
    const newRows = [...schema];
    newRows[idx] = { ...newRows[idx], children: newChildren };
    setSchema(newRows);
  };

  return (
    <div className={`flex flex-col h-full ${level === 0 ? 'max-h-screen' : ''}`}>
      
      {/* local header */}
      {level === 0 && (
        <div className="flex-shrink-0 border-b bg-background/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
                <Database className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Schema Builder
                </h2>
                <p className="text-sm text-muted-foreground">
                  Design your JSON interface structure
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fields Container */}
      <div className={`flex-1 space-y-2 ${level > 0 ? 'pl-6' : ''} w-full p-2 ${level === 0 ? 'overflow-y-auto' : ''}`}>
        
        {/* Render each field using FieldRow component */}
        {schema.map((field, idx) => (
          <FieldRow
            key={field.id}
            field={field}
            index={idx}
            level={level}
            onNameChange={handleNameChange}
            onTypeChange={handleTypeChange}
            onDelete={handleDeleteRow}
            onNestedChange={handleNestedChange}
          />
        ))}

        {/* Add New Field Button */}
        <button
          onClick={handleAddRow}
          className="w-full p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all duration-200 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
        >
          <Plus className="w-5 h-5" />
          Add New Field
        </button>
      </div>

    </div>
  );
};

export default FormComponent;