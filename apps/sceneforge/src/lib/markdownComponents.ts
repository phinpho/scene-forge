import { Blockquote, Heading } from "@sceneforge/ui";
import { type MarkdownProps } from "@simplecomponent/markdown";
import { type Element } from "hast";
import { type ComponentType, type JSX, createElement } from "react";

import { Image } from "../components/Image";
import { Link } from "../components/Link";

type IntrinsicElement<
  T extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = JSX.IntrinsicElements[T];

const wrapper
  = <
    T extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
    WP extends object = object,
    P extends IntrinsicElement<T> = IntrinsicElement<T>,
  >(
    Component: ComponentType<WP>,
    initialProps: WP = {} as WP
  ) =>
    ({ node, ...props }: { node?: Element } & P) =>
      node && node.type === "element"
        ? createElement(Component, {
          ...props,
          ...initialProps,
        })
        : null;

export const markdownComponents: MarkdownProps["components"] = {
  a: wrapper(Link, { rel: "nofollow", target: "_blank" }),
  blockquote: wrapper(Blockquote),
  h1: wrapper(Heading, { level: 1 }),
  h2: wrapper(Heading, { level: 2 }),
  h3: wrapper(Heading, { level: 3 }),
  h4: wrapper(Heading, { level: 4 }),
  h5: wrapper(Heading, { level: 5 }),
  h6: wrapper(Heading, { level: 6 }),
  img: wrapper(Image),
};
