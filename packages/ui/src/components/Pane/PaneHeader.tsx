import * as stylex from "@stylexjs/stylex";

import { Heading, HeadingProps } from "../Heading";
import { Toolbar, ToolbarProps } from "../Toolbar";
import { backgroundColor } from "../tokens.stylex";

export type PaneHeaderProps = {
  inner?: boolean;
  level?: HeadingProps["level"];
  title: string;
  toolbar?: ToolbarProps;
};

const styles = stylex.create({
  container: {
    alignItems: "center",
    backgroundColor: backgroundColor.alpha15,
    borderColor: backgroundColor.alpha10,
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    flexDirection: "row",
    flexShrink: 1,
    gap: "0.5rem",
    height: "2.5rem",
    justifyContent: "stretch",
    overflow: "clip",
  },
  heading: {
    flexGrow: 1,
    fontSize: "1.125rem",
    padding: "0.25rem",
    textOverflow: "ellipsis",
  },
  inner: {
    borderStartEndRadius: "0.25rem",
    borderStartStartRadius: "0.25rem",
  },
});

const PaneHeader = ({
  inner = true,
  level = 2,
  title,
  toolbar,
}: PaneHeaderProps) => {
  return (
    <div
      {...stylex.props(
        styles.container,
        inner && styles.inner
      )}
    >
      <Heading level={level} style={[styles.heading]}>{title}</Heading>
      {toolbar && <Toolbar {...toolbar} />}
    </div>
  );
};

export default PaneHeader;
