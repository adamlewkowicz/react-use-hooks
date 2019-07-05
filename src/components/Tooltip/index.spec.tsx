import { TooltipProvider } from "./provider";
import { useTooltip } from "./hook";

function App() {
  return (
    <TooltipProvider
      container={({ children, event }) => (
        <div
          className="tooltip-container"
          style={{
            left: event.clientX,
            right: event.clientY
          }}
        >
          {children}
        </div>
      )}
    >
      <div {...useTooltip(() => (
        <>
          Some amazing tooltip content
        </>
      ))}>
        If you hover me, you gonna see the tooltip.
      </div>
    </TooltipProvider>
  );
}