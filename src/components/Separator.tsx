import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";
  
  export function Separator({
    FormComponent,
    JsonDisplay,
  }: {
    FormComponent: React.ElementType;
    JsonDisplay: React.ElementType;
  }) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background p-4">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full w-full max-w-full rounded-lg border border-border shadow-lg"
        >
          <ResizablePanel defaultSize={50} minSize={30}>
            <div
              className="flex h-full items-center justify-center overflow-auto p-6 bg-card rounded-l-lg"
            >
              {FormComponent && <FormComponent />}
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle /> 
  
          <ResizablePanel defaultSize={50} minSize={30}>
            <div
              className="flex h-full items-center justify-center overflow-auto p-6 bg-card rounded-r-lg"
            >
              {JsonDisplay && <JsonDisplay />}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }