import React from 'react';
import { Trash2, Hash, Type, Calendar, Mail, ToggleLeft, Box, List, Database } from 'lucide-react';
import type { JSON_Interface } from '@/utils/JSON_Interface';
import { FIELD_TYPES } from '@/utils/JSON_Interface';
import FormComponent from './FormComponent';

const ICONS: Record<string, any> = {
  string: Type,
  number: Hash,
  boolean: ToggleLeft,
  date: Calendar,
  email: Mail,
  nested: Box,
  array: List,
  objectsid: Database,
};

interface FieldRowProps {
  field: JSON_Interface;
  index: number;
  level: number;
  onNameChange: (idx: number, value: string) => void;
  onTypeChange: (idx: number, value: string) => void;
  onDelete: (idx: number) => void;
  onNestedChange: (idx: number, newChildren: JSON_Interface[]) => void;
}

const FieldRow: React.FC<FieldRowProps> = ({
  field,
  index,
  level,
  onNameChange,
  onTypeChange,
  onDelete,
  onNestedChange
}) => {
  const canHaveChildren = ['nested', 'array', 'objectsid'].includes(field.type);

  const getTypeIcon = (type: string) => {
    const Icon = ICONS[type] || Type;
    return <Icon className="w-4 h-4" />;
  };

  const getFieldBorderColor = (type: string) => {
    switch (type) {
      case 'nested': return 'border-l-blue-400 bg-blue-50/30 dark:border-l-blue-500 dark:bg-blue-900/20';
      case 'array': return 'border-l-green-400 bg-green-300 dark:border-l-green-500 dark:bg-green-900/20';
      case 'objectsid': return 'border-l-purple-400 bg-purple-50/30 dark:border-l-purple-500 dark:bg-purple-900/20';
      default: return 'border-l-gray-300 bg-gray-50/30 dark:border-l-gray-600 dark:bg-gray-700/30';
    }
  };

  return (
    <div className={`group relative ${level === 0 ? 'bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700' : ''}`}>
      <div className={`flex items-center gap-3 p-4 ${'border-l-4 rounded-r-lg ' + getFieldBorderColor(field.type)}`}>
        
        {/* Field Icon */}
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          {getTypeIcon(field.type)}
        </div>

        {/* Field Name Input */}
        <div className="flex-1">
          <input
            type="text"
            value={field.name}
            onChange={e => onNameChange(index, e.target.value)}
            placeholder="Field name"
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>

        {/* Type Selector */}
        <div className="flex-shrink-0">
          <select
            value={field.type}
            onChange={e => onTypeChange(index, e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-w-[120px]"
          >
            {FIELD_TYPES.map(typeOption => (
              <option key={typeOption.value} value={typeOption.value}>
                {typeOption.label}
              </option>
            ))}
          </select>
        </div>

        {/* Delete Button */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onDelete(index)}
            className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-900/70 flex items-center justify-center transition-colors"
            title="Delete Field"
          >
            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>

      {/* Nested Children */}
      {canHaveChildren && (
        <div className="pb-4">
          <div className="mx-4 mb-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
            <div className="w-4 h-px bg-gray-300 dark:bg-gray-600"></div>
            {field.type === 'nested' ? 'Object Properties' :
              field.type === 'array' ? 'Array Items' :
                'Referenced Fields'}
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* Import FormComponent here - this creates the recursive structure */}
          <FormComponent
            schema={field.children || []}
            setSchema={(newChildren: JSON_Interface[]) => onNestedChange(index, newChildren)}
            level={level + 1}
          />
        </div>
      )}
    </div>
  );
};

export default FieldRow;