import React, { useState } from 'react';
import { Copy, Download, Check, Code2 } from 'lucide-react';
import type { JSON_Interface } from '@/utils/JSON_Interface';
import { convertSchemaToTypeObject } from '@/utils/helper';

interface JsonPreviewProps {
  schema: JSON_Interface[];
}

const JsonPreview: React.FC<JsonPreviewProps> = ({ schema }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const previewObject = convertSchemaToTypeObject(schema);
  const jsonString = JSON.stringify(previewObject, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 1200);
    } catch (err) {
      setCopyStatus('idle');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schema.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background to-muted/20 w-full p-2 overflow-y-scroll">
      {/* Header */}
      <div className="flex-shrink-0 border-b bg-background/50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                JSON Preview
              </h2>
              <p className="text-sm text-muted-foreground">
                Live preview of your schema
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-muted/50 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              {copyStatus === 'copied' ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Copy
                  </span>
                </>
              )}
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg transform hover:scale-105"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* JSON Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-background/80 backdrop-blur-sm border rounded-xl shadow-lg">
            <div className="p-1">
              <pre className="overflow-auto p-4 text-sm leading-relaxed">
                <code className="text-foreground font-mono">
                  {jsonString}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="flex-shrink-0 border-t bg-background/50 backdrop-blur-sm">
        <div className="p-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {Object.keys(previewObject).length} fields
            </span>
            <span>{JSON.stringify(previewObject).length} characters</span>
          </div>
          <div className="text-xs opacity-70">
            Auto-generated preview
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonPreview;