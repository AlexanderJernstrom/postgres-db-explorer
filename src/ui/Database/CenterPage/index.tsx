import { Tab as UITab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { Tab, TabType } from "../../../types/interfaces";

interface Props {
  tabs: Tab[];
}

export const CenterPage: React.FC<Props> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);

  const changeSelectedTab = (event: any, tab: Tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <Tabs value={selectedTab} onChange={changeSelectedTab}>
        {tabs.map((tab) => (
          <UITab label={tab.title} value={tab} />
        ))}
      </Tabs>
      {tabs.map((tab) => tab === selectedTab && <div>{tab.type}</div>)}
    </div>
  );
};
