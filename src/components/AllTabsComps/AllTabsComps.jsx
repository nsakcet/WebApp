import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Col, Row } from "react-bootstrap";
import "react-tabs/style/react-tabs.css";
import { MultiImagesDisplay } from "../MultiImagesDisplay/MultiImagesDisplay";
import { MultiPDFsDisplay } from "../MultiPDFsDisplay/MultiPDFsDisplay";
import { MultiHomeDisplay } from "../MultiHomeDisplay/MultiHomeDisplay";
import * as QueryString from "query-string";
import { useLocation, Redirect } from "react-router-dom";
import { VideoAffairsDisplay } from "../Common/VideoAffairsDisplay";
import { MultiCurrentAffairsDisplay } from "../../components/MultiCurrentAffairsDisplay/MultiCurrentAffairsDisplay";
import { MultiEminentProfessorsDisplay } from "../../components/Home/MultiEminentProfessorsDisplay/MultiEminentProfessorsDisplay";
import {
  getSelectImgData,
  getSelectPdfData,
  getSelectPptData,
  getSelectDocData,
  getSelectXlsData,
  getHomeLevelDetails,
  getSelectEventsAffairsData,
  getSelectVideoData,
  getSelectedCategoryLevel3,
  getRedirectLandingHome,
} from "../../state/selectors/categories";
import { MultiPPTsDisplay } from "../MultiPPTsDisplay/MultiPPTsDisplay";
import { MultiDOCsDisplay } from "../MultiDOCsDisplay/MultiDOCsDisplay";
import { MultiXLSsDisplay } from "../MultiXLSsDisplay/MultiXLSsDisplay";
import "./AllTabsComps.css";
import {
  setSelectedCategory,
  setSelectedCategoryLevel2,
  setSelectedCategoryLevel3,
  setRedirectLandingHome,
  setPDFsData,
  setImagesData,
  setPPTsData,
  setDOCsData,
  setXLSsData,
  setHomeLevelDetails,
  setCategories,
} from "../../state/actions/categories";
import {
  getHomeLevelDetailsData,
  getMultipleFiles,
  getMultipleLevelCategory,
} from "../../services/subscriberService";
import NavDynamicMenu from "../Common/NavDynamicMenu";

import { subscriberRegistrationNo } from "../../config.json";
import { useHistory } from "react-router-dom";

export const AllTabsComps = (props) => {
  const selectorCategoryLevel3 = useSelector(getSelectedCategoryLevel3);

  const selectorRedirectLandingHome = useSelector(getRedirectLandingHome);
  const [isVisible, setisVisible] = useState(true);
  // var  selectorPDFs=["/uploads/80f1e029-9234-491a-80cb-7d66f4d3bb3f/Multpics/37/205/199/PDF/71e0801a-5119-4dda-9d29-69218343fea5/80f1e029-9234-491a-80cb-7d66f4d3bb3f_PDF_71e0801a-5119-4dda-9d29-69218343fea5_37_205_199_Mult.pdf"]
  const dispatch = useDispatch();
  const params = QueryString.parse(useLocation().search);
  const selectorImgs = useSelector(getSelectImgData);
  const selectorPDFs = useSelector(getSelectPdfData);
  const selectorPPTs = useSelector(getSelectPptData);
  const state = useSelector((state) => state);
  const selectorDocs = useSelector(getSelectDocData);
  const selectorXlss = useSelector(getSelectXlsData);
  const selectorVideos = useSelector(getSelectVideoData);
  const selectorEventsAffairs = useSelector(getSelectEventsAffairsData);
  const selectorHomeLevelDetails = useSelector(getHomeLevelDetails);
  const store = useStore();
  var datattt = store.getState();

  const history = useHistory();

  

  useEffect(() => {
    dispatch(setSelectedCategory(params.Category1));
    dispatch(setSelectedCategoryLevel2(params.Category2));
    dispatch(setSelectedCategoryLevel3(params.Category3));
    getMenus()
  }, [
    params.Category1,
    params.Category2,
    params.Category3,
    selectorHomeLevelDetails,
  ]);

  const getMenus = async () => {
    const result = await getMultipleLevelCategory(subscriberRegistrationNo);
    console.log('RESULTS  : ', result)
    if (result) {
      dispatch(setCategories(result.data[0]));
     
      // setSuperMenuData(filteredSuperMenu);
    }
  };

  useEffect(() => {
    // getData2();
    history.replace(
      `homecommon${params.Category1}?Category1=${params.Category1}&Category2=${params.Category2}&Category3=${params.Category3}`
    );
    // setMultipleFilesAll();
  }, []);

  // useEffect(() => {
  //   console.log("****statestatestatestatestate*******:", state);
  // }, [state]);

  return (
    <React.Fragment>
      {isVisible && (
        <>
          {/* {!selectorImgs && <Redirect to="/home" />} */}
          {/* {selectorPDFs &&  <MultiPDFsDisplay />} */}
          {selectorCategoryLevel3 && (
            <Tabs>
              <TabList className="TabsHeaderContainer">
                {selectorHomeLevelDetails &&
                  selectorHomeLevelDetails?.length > 0 && <Tab>Home</Tab>}
                {selectorImgs && selectorImgs?.length > 0 && <Tab>Photos</Tab>}
                {selectorVideos && selectorVideos?.length > 0 && (
                  <Tab>Videos</Tab>
                )}
                {selectorPDFs && selectorPDFs?.length > 0 && <Tab>PDF</Tab>}
                {selectorPPTs && selectorPPTs?.length > 0 && <Tab>PPT</Tab>}
                {selectorDocs && selectorDocs?.length > 0 && (
                  <Tab>Documents</Tab>
                )}
                {selectorXlss && selectorXlss?.length > 0 && (
                  <Tab>Spread Sheets</Tab>
                )}
              </TabList>
              {selectorHomeLevelDetails &&
                selectorHomeLevelDetails?.length > 0 && (
                  <TabPanel className="TabsContainerParent">
                    {params.Category3 == 48 ? (
                      <MultiEminentProfessorsDisplay />
                    ) : (
                      <MultiHomeDisplay />
                    )}
                  </TabPanel>
                )}
              {selectorImgs && selectorImgs?.length > 0 && (
                <TabPanel className="TabsContainerParent">
                  <Row>
                    <Col lg={8} className="colHome">
                      <MultiImagesDisplay />
                    </Col>
                    <Col lg={4} className="colHome">
                      <MultiCurrentAffairsDisplay
                        affairsData={selectorEventsAffairs}
                        title="Updates"
                      />
                    </Col>
                  </Row>
                </TabPanel>
              )}
              {selectorVideos && selectorVideos?.length > 0 && (
                <TabPanel>
                  <Row>
                    <Col lg={8} className="colHome">
                      <VideoAffairsDisplay />
                    </Col>
                    <Col lg={4} className="colHome">
                      <MultiCurrentAffairsDisplay
                        affairsData={selectorEventsAffairs}
                        title="Updates"
                      />
                    </Col>
                  </Row>
                </TabPanel>
              )}

              {selectorPDFs && selectorPDFs?.length > 0 && (
                <TabPanel className="TabsContainerParent">
                  <MultiPDFsDisplay />
                </TabPanel>
              )}

              {selectorPPTs && selectorPPTs.length > 0 && (
                <TabPanel className="TabsContainerParent">
                  <MultiPPTsDisplay />
                </TabPanel>
              )}
              {selectorDocs && selectorDocs.length > 0 && (
                <TabPanel className="TabsContainerParent">
                  <MultiDOCsDisplay />
                </TabPanel>
              )}
              {selectorXlss && selectorXlss.length > 0 && (
                <TabPanel className="TabsContainerParent">
                  <MultiXLSsDisplay />
                </TabPanel>
              )}
            </Tabs>
          )}
        </>
      )}
    </React.Fragment>
  );
};
