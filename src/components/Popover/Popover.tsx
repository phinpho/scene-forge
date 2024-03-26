import {
  type ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Button,
  type ToggleProps,
  type ButtonProps,
  type ButtonComponent,
} from "../Button";
import type { Variant } from "../../types/variants";

export type PopoverProps = Omit<ButtonProps, keyof ToggleProps> & {
  label?: string;
  variant?: Variant;
};

export const Popover = forwardRef(function Popover(
  { id, label, children, ...props }: PopoverProps,
  ref: ForwardedRef<ButtonComponent>
) {
  const genId = useId();
  const [opened, setOpened] = useState(false);
  const currentId = useMemo(() => id || genId, [genId, id]);
  const popoverId = useMemo(() => `${currentId}-popover`, [currentId]);

  const buttonRef = useRef<ButtonComponent>(null);

  useImperativeHandle(
    ref,
    () =>
      buttonRef.current ?? {
        button: undefined,
        pressed: false,
        toggle: () => {},
      },
    [buttonRef]
  );

  const popoverRef = useRef<HTMLDivElement>(null);

  const handleBeforeToggle = useCallback(
    (event: Event) => {
      if (event instanceof ToggleEvent) {
        setOpened(event.newState === "open");
        if (event.newState === "open") {
          if (
            buttonRef.current?.button &&
            buttonRef.current.button.checkVisibility()
          ) {
            const rect = buttonRef.current?.button.getBoundingClientRect();
            const x = rect.left;
            const y = rect.top;
            if (event.target instanceof HTMLElement) {
              const popoverRect = event.target.getBoundingClientRect();
              const width = popoverRect.width || 0;
              const height = popoverRect.height || 0;
              event.target.style.insetInlineStart = `${x - width / 2}px`;
              event.target.style.insetBlockStart = `calc(${
                y - height
              }px - 1rem)`;
            }
          }
        }
      }
    },
    [buttonRef, setOpened]
  );

  useEffect(() => {
    const popover =
      popoverRef.current && popoverRef.current instanceof HTMLElement
        ? popoverRef.current
        : null;

    if (popover) {
      popover.addEventListener("toggle", handleBeforeToggle, { passive: true });
      return () => {
        popover.removeEventListener("toggle", handleBeforeToggle);
      };
    }
  }, [handleBeforeToggle, popoverRef]);

  return (
    <div className="relative">
      <Button
        key="button"
        ref={buttonRef}
        popovertarget={popoverId}
        {...props}
        id={currentId}
        className={props.className ?? "bg-transparent b-none m-0 p-0"}
        tabIndex={-1}
        aria-label={label}
        aria-haspopup="dialog"
        aria-details={popoverId}
      >
        {label}
      </Button>
      <div
        popover="auto"
        className="fixed inset-0"
        key="popover"
        ref={popoverRef}
        id={popoverId}
        role="dialog"
        aria-hidden={!opened}
        aria-modal="true"
        aria-label={label}
      >
        {children}
      </div>
    </div>
  );
});
