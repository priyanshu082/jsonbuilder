import React, { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import FormComponent from './builder/FormComponent';
import JsonPreview from './builder/JsonPreview';
import { type JSON_Interface } from '@/utils/JSON_Interface';


const Home: React.FC = () => {
  const [schema, setSchema] = useState<JSON_Interface[]>([
    {
      id: 'field-1',
      name: 'simpleField',
      type: 'string',
    }
  ]);

  const handleSchemaChange = (newSchema: JSON_Interface[]) => {
    setSchema(newSchema);
    console.log('Schema changed:', newSchema);
  };

  return (
    <div className="flex-1 h-[86vh] bg-gradient-to-br from-background via-background to-muted/20">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={50} minSize={30}>
          <FormComponent schema={schema} setSchema={handleSchemaChange} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <JsonPreview schema={schema} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Home;