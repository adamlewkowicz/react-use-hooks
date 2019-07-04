import * as React from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface IntersectionObserverProps extends IntersectionObserverInit {
  children?: React.ReactElement
  onIntersection: IntersectionObserverCallback
}
/**
 * Use Intersection Observer declaratively as component.
 * It observes it's child element.
 * @example
 * return (
 *  <IntersectionObserver
 *    onIntersection={fetchPosts}
 *    rootMargin={'5px'}
 *    threshold={1}
 *  >
 *    <div>
 *      I am observed!
 *    </div>
 *  </IntersectionObserver>
 * );
 */
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