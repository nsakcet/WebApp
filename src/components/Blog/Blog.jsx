import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Tab1 } from "./Tab1";
import { Tab2 } from "./Tab2";
import { Tab3 } from "./Tab3";
export const Blog = () => {
  return (
    <Tabs defaultActiveKey="tab1" id="uncontrolled-tab-example">
      <Tab eventKey="tab1" title="Tab 1">
        <Tab1 />
      </Tab>
      <Tab eventKey="tab2" title="Tab 2">
        <Tab2 />
      </Tab>
     <Tab eventKey="tab3" title="Tab 3">
        < Tab3 />
      </Tab>
    </Tabs>
  );
};
