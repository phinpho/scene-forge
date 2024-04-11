import { v4 as uuid } from "uuid";
import { useCallback } from "react";
import { useTabPanel } from "../components/TabPanel";
import { ModelViewTab, type ModelViewTabProps } from "../tabs";
import { MarkdownTab, type MarkdownTabProps } from "../tabs/MarkdownTab";
import { useTranslation } from "react-i18next";

export const useTabs = () => {
  const { t } = useTranslation("common");
  const { activateTab, newTab, getTabById, closeTab } = useTabPanel();

  const newMarkdownTab = useCallback(
    ({ id, title, href, value }: MarkdownTabProps) => {
      if (id) {
        const tab = getTabById(id);
        if (tab) {
          activateTab(tab)();
          return;
        }
      }

      newTab<MarkdownTabProps>({
        id: id ?? uuid(),
        title: title ?? t("tabs.untitledMarkdown"),
        props: { id, title, href, value },
        active: true,
        component: MarkdownTab,
      });
    },
    [t, activateTab, getTabById, newTab]
  );

  const newModelViewTab = useCallback(
    ({ id, title, gltf }: ModelViewTabProps) => {
      if (id) {
        const tab = getTabById(id);
        if (tab) {
          activateTab(tab)();
          return;
        }
      }

      newTab<ModelViewTabProps>({
        id: id ?? uuid(),
        title: title ?? t("tabs.untitledModel"),
        props: { id, title, gltf },
        active: true,
        component: ModelViewTab,
      });
    },
    [t, newTab, getTabById, activateTab]
  );

  const closeModelViewTab = useCallback(
    (id?: string) => {
      if (!id) return;
      const tab = getTabById(id);
      if (tab && tab.component === ModelViewTab) {
        closeTab(tab)();
      }
    },
    [closeTab, getTabById]
  );

  return {
    newModelViewTab,
    newMarkdownTab,
    closeModelViewTab,
  };
};
