import { type MouseEvent, useCallback, useEffect, useRef } from "react";
import { TabItem } from "./TabItem";
import { useTabPanel } from "./useTabPanel";
import { type Variant } from "../../types/variants";
import { cls } from "../../lib/cls";
import { variantBgClass } from "../../lib/variantClasses";
import { useContextMenu } from "../ContextMenu";

export type TabListProps = {
  variant?: Variant;
};

export const TabList = ({ variant = "default" }: TabListProps) => {
  const { tabs, tabsPosition, closeTab, newTab, activateTab, defaultTab }
    = useTabPanel();
  const reference = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (tabs.length === 0) {
      newTab(defaultTab);
    }
  }, [tabs, newTab, defaultTab]);

  const { openContextMenu } = useContextMenu();

  const handleTabListContextMenu = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (reference.current && reference.current === event.target) {
        openContextMenu({
          event,
          header: "Tab Context Menu",
          items: [
            {
              type: "item",
              label: "New Tab",
              onClick: () => {
                console.log("DEBUG: New Tab");
              },
            },
          ],
        });
      }
    },
    [openContextMenu]
  );

  return (
    <ul
      ref={reference}
      className={cls(
        "flex flex-row justify-start list-none p-inline-2 m-0 gap-2 text-light",
        variantBgClass[variant]
          ? (tabsPosition === "top"
            ? variantBgClass[variant]
            : `${variantBgClass[variant]}:50`)
          : (tabsPosition === "top"
            ? "bg-primary"
            : "bg-primary:50"),
        tabsPosition === "top"
          ? "p-t-2 p-b-0 app-region-drag b-b-1 b-b-solid b-b-black:75 shadow shadow-md shadow-black:30"
          : "p-t-0 p-b-2 dark:shadow-black:25 light:shadow-white:25 shadow-inner"
      )}
      role="tablist"
      onContextMenu={handleTabListContextMenu}
    >
      {tabs.map((tab, index) => (
        <TabItem
          active={tab.active}
          index={index}
          key={index}
          title={tab.title}
          translation={tab.translation}
          onActiveClick={activateTab(tab)}
          onCloseClick={closeTab(tab)}
        />
      ))}
    </ul>
  );
};
