import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight, Database, List, Box, Hash, Type, Calendar, Mail, ToggleLeft } from 'lucide-react';
import type { JSON_Interface } from '@/utils/JSON_Interface';
import { FIELD_TYPES } from '@/utils/JSON_Interface';
import { createEmptyField } from '@/utils/JSON_Interface';

// Enhanced field types with icons
const ENHANCED_FIELD_TYPES = FIELD_TYPES.map(type => ({
  ...type,
  icon: type.value === 'string' ? Type :
        type.value === 'number' ? Hash :
        type.value === 'boolean' ? ToggleLeft :
        type.value === 'date' ? Calendar :
        type.value === 'email' ? Mail :
        type.value === 'nested' ? Box :
        type.value === 'array' ? List :
        type.value === 'objectsid' ? Database :
        Type
}));

interface FormComponentProps {
  schema: JSON_Interface[];
  setSchema: (schema: JSON_Interface[]) => void;
  level?: number;
}

const FormComponent: React.FC<FormComponentProps> = ({ schema, setSchema, level = 0 }) => {
  
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleAddRow = () => {
    setSchema([...schema, createEmptyField()]);
  };

  const handleAddNestedRow = (idx: number) => {
    const newRows = [...schema];
    if (!newRows[idx].children) {
      newRows[idx].children = [];
    }
    newRows[idx] = {
      ...newRows[idx],
      children: [...(newRows[idx].children || []), createEmptyField()],
    };
    setSchema(newRows);
    setExpandedItems(new Set([...expandedItems, newRows[idx].id]));
  };

  const handleNameChange = (idx: number, value: string) => {
    const newRows = [...schema];
    newRows[idx] = { ...newRows[idx], name: value };
    setSchema(newRows);
  };

  const handleTypeChange = (idx: number, value: string) => {
    const newRows = [...schema];
    if ((value === 'nested' || value === 'array' || value === 'objectsid') && !newRows[idx].children) {
      newRows[idx] = { ...newRows[idx], type: value as JSON_Interface['type'], children: [] };
    } else if (value !== 'nested' && value !== 'array' && value !== 'objectsid') {
      const { children, ...rest } = newRows[idx];
      newRows[idx] = { ...rest, type: value as JSON_Interface['type'] };
    } else {
      newRows[idx] = { ...newRows[idx], type: value as JSON_Interface['type'] };
    }
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

  const getTypeIcon = (type: string) => {
    const fieldType = ENHANCED_FIELD_TYPES.find(t => t.value === type);
    const IconComponent = fieldType?.icon || Type;
    return <IconComponent className="w-4 h-4" />;
  };

  const getFieldBorderColor = (type: string) => {
    switch (type) {
      case 'nested': return 'border-l-blue-400 bg-blue-50/30 dark:border-l-blue-500 dark:bg-blue-950/30';
      case 'array': return 'border-l-green-400 bg-green-50/30 dark:border-l-green-500 dark:bg-green-950/30';
      case 'objectsid': return 'border-l-purple-400 bg-purple-50/30 dark:border-l-purple-500 dark:bg-purple-950/30';
      default: return 'border-l-gray-300 bg-gray-50/30 dark:border-l-gray-600 dark:bg-gray-800/30';
    }
  };

  return (
    <div className={`flex flex-col h-full ${level === 0 ? 'max-h-screen' : ''}`}>
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
      
      <div className={`flex-1 space-y-2 ${level > 0 ? 'pl-6' : ''} w-full p-2 ${level === 0 ? 'overflow-y-auto' : ''}`}>
        {schema.map((row, idx) => {
          const hasChildren = row.children && row.children.length > 0;
          const canHaveChildren = ['nested', 'array', 'objectsid'].includes(row.type);
          const isExpanded = expandedItems.has(row.id);

          return (
            <div key={row.id} className={`group relative ${level === 0 ? 'bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700' : ''}`}>
              
              <div className={`flex items-center gap-3 p-4 ${level > 0 ? 'border-l-4 rounded-r-lg ' + getFieldBorderColor(row.type) : ''}`}>
                
                
                {canHaveChildren && (
                  <button
                    onClick={() => toggleExpanded(row.id)}
                    className="flex-shrink-0 w-6 h-6 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    )}
                  </button>
                )}
                
                {/* Field Icon */}
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {getTypeIcon(row.type)}
                </div>

                {/* Field Name Input */}
                <div className="flex-1">
                  <input
                    type="text"
                    value={row.name}
                    onChange={e => handleNameChange(idx, e.target.value)}
                    placeholder={`Field name`}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  />
                </div>

                {/* Type Selector */}
                <div className="flex-shrink-0">
                  <select
                    value={row.type}
                    onChange={e => handleTypeChange(idx, e.target.value)}
                    className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-w-[120px]"
                  >
                    {ENHANCED_FIELD_TYPES.map(typeOption => (
                      <option key={typeOption.value} value={typeOption.value}>
                        {typeOption.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {canHaveChildren && (
                    <button
                      onClick={() => handleAddNestedRow(idx)}
                      className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900/70 flex items-center justify-center transition-colors"
                      title={`Add ${row.type === 'array' ? 'Array Item' : 'Nested Field'}`}
                    >
                      <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDeleteRow(idx)}
                    className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-900/70 flex items-center justify-center transition-colors"
                    title="Delete Field"
                  >
                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>

              </div>

              {/* Nested Children */}
              {canHaveChildren && isExpanded && (
                <div className="pb-4">
                  <div className="mx-4 mb-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                    <div className="w-4 h-px bg-gray-300 dark:bg-gray-600"></div>
                    {row.type === 'nested' ? 'Object Properties' : 
                     row.type === 'array' ? 'Array Items' : 
                     'Referenced Fields'}
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                  
                  {hasChildren ? (
                    <FormComponent
                      schema={row.children || []}
                      setSchema={newChildren => handleNestedChange(idx, newChildren)}
                      level={level + 1}
                    />
                  ) : (
                    <div className="mx-4 py-8 text-center text-gray-400 dark:text-gray-500 text-sm">
                      No fields added yet
                      <div className="mt-2">
                        <button
                          onClick={() => handleAddNestedRow(idx)}
                          className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs font-medium"
                        >
                          Add first field
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Add New Field Button */}
        <button
          onClick={handleAddRow}
          className={`w-full p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all duration-200 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium ${
            level === 0 ? 'mt-4' : ''
          }`}
        >
          <Plus className="w-5 h-5" />
          Add New Field
        </button>
      </div>
    </div>
  );
};

export default FormComponent;