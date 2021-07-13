import React from "react";
import { FeaturedCommonList } from "../Home/FeaturedCommonList";
import * as QueryString from "query-string";
import { useLocation } from "react-router-dom";
import { AllTabsComps } from "../AllTabsComps/AllTabsComps";

export const Events = () => {
  const params = QueryString.parse(useLocation().search);
  return (
    <React.Fragment>
      {params.Category3 == 70707070 ? (
        <FeaturedCommonList imgPath="images/eventsHome.jpg" />
      ) : (
        <AllTabsComps />
      )}
    </React.Fragment>
  );
};
