import { Database } from "../../lib/Database";
import { HomeTab } from "../../tabs";
import { PanelProvider } from "../Panel/PanelProvider";
import { TabPanel } from "../TabPanel/TabPanel";
import { TabPanelProvider } from "../TabPanel/TabPanelProvider";
import { AppNav } from "./AppNav";

export interface AppProps {
  userData: Database<"UserData">;
}

export const App = ({ userData }: AppProps) => {
  return (
    <PanelProvider userData={userData}>
      <TabPanelProvider defaultTab={{
        title: "Home",
        component: HomeTab
      }}>
        <TabPanel />
        <AppNav />
      </TabPanelProvider>
    </PanelProvider>
  );
};
