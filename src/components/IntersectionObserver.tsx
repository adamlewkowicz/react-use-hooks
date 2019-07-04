import * as React from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface IntersectionObserverProps extends IntersectionObserverInit {
  children?: React.ReactElement
  onIntersection: IntersectionObserverCallback
}
export function IntersectionObserver({
  children,
  onIntersection,
  ...options
}: IntersectionObserverProps) {
  const ref = useIntersectionObserver<HTMLDivElement>(onIntersection, options);

  if (children) {
    return React.cloneElement(children, { ref });
  }

  return <div ref={ref}></div>;
}