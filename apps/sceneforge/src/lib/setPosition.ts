import { type MouseEvent } from "react";

export const setPositionOnTarget = (
  element: HTMLElement,
  target: HTMLElement
) => {
  const { height, width } = element.getBoundingClientRect();
  const { bottom, left, right, top } = target.getBoundingClientRect();

  element.style.left = `${left}px`;
  element.style.top = `${bottom}px`;

  const view = target.ownerDocument.defaultView ?? window;

  const { height: documentHeight, width: documentWidth }
    = view.document.body.getBoundingClientRect();

  if (left + width > documentWidth) {
    element.style.left = `${right - width}px`;
  }
  if (bottom + height > documentHeight) {
    element.style.top = `${top - height}px`;
  }
};

export const setPositionOnPointer = (
  element: HTMLElement,
  event: MouseEvent<HTMLElement>
) => {
  const { height, width } = element.getBoundingClientRect();
  element.style.left = `${event.clientX}px`;
  element.style.top = `${event.clientY}px`;
  const view = event.view;
  const { height: documentHeight, width: documentWidth }
    = view.document.body.getBoundingClientRect();
  if (event.clientX + width > documentWidth) {
    element.style.left = `${event.clientX - width}px`;
  }
  if (event.clientY + height > documentHeight) {
    element.style.top = `${event.clientY - height}px`;
  }
};
