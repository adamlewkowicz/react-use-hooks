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
      <div {...useTooltip(({ event }) => (
        <> 
          <p>Tooltip details</p>
          <div>
            You can place everything in it's content
          </div>
        </>
      ))}>
        If you hover me, you gonna see the tooltip.
      </div>
    </TooltipProvider>
  );
}