import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole
} from '@floating-ui/react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useRef, useState, type ElementType, type ReactNode } from 'react';
import { useId } from '@floating-ui/react';

interface PopoverProps {
  children: ReactNode;
  className?: string;
  renderPopover: ReactNode;
  as?: ElementType;
}

const Popover = (props: PopoverProps) => {
  const { children, className, renderPopover, as: Element = 'div' } = props;
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-end',
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'start'
      }),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    transform: false,
    whileElementsMounted: autoUpdate
  });

  const id = useId();
  // Event listeners to change the open state
  const hover = useHover(context, { handleClose: safePolygon() });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: 'tooltip' });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  return (
    <Element
      ref={refs.setReference}
      {...getReferenceProps()}
      className={className}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, transform: `scale(0)` }}
              animate={{ opacity: 1, transform: `scale(1)` }}
              exit={{ opacity: 0, transform: `scale(0)` }}
              transition={{ duration: 0.6 }}
              ref={refs.setFloating}
              {...getFloatingProps()}
              style={{ transformOrigin: `${middlewareData.arrow?.x}px top`, ...floatingStyles }}
            >
              <FloatingArrow
                ref={arrowRef}
                context={context}
                className='fill-white [&>path:first-of-type]:stroke-pink-500 [&>path:last-of-type]:stroke-white z-10'
                style={{
                  transform: 'translateY(-1px)',
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  );
};

export default Popover;
