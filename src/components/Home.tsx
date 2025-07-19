import React, { useState, useCallback } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import FormComponent from './builder/FormComponent';
import JsonPreview from './builder/JsonPreview';
import { type FormValue } from '@/utils/JSON_Interface';

const Home: React.FC = () => {
    const [currentSchema, setCurrentSchema] = useState<FormValue>({ schema: [] });

    const handleSchemaChange = useCallback((newSchema: FormValue) => {
        setCurrentSchema(newSchema);
    }, []);

    return (
        <div className="container mx-auto h-[calc(100vh-120px)]">
            <div className="flex h-full w-full items-center justify-center bg-background p-4">
                <ResizablePanelGroup
                    direction="horizontal"
                    className="h-full w-full max-w-full rounded-lg border border-border shadow-lg"
                >
                    <ResizablePanel minSize={30}>
                        <div className="flex h-full w-full overflow-auto p-6 bg-card rounded-l-lg">
                            <FormComponent  />
                            {/* <FormComponent onSchemaChange={handleSchemaChange} /> */}
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={30}>
                        <div className="flex h-full w-full overflow-auto p-6 bg-card rounded-r-lg">
                            {/* <JsonPreview schema={currentSchema} /> */}
                            <JsonPreview />
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
};

export default Home;
