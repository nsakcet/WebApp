import React, { useState, useEffect } from "react";
import { ControlledCarousel } from "./ControlledCarousel";
import { VideoAffairsDisplay } from "../Common/VideoAffairsDisplay";
import { AboutNsakSections } from "../Common/AboutNsakSections";
import { Landing } from "../Common/Landing";
import { Row, Col } from "react-bootstrap";
import * as QueryString from "query-string";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { subscriberRegistrationNo } from "../../config.json";
import { LeftNavigation } from "../Common/Employee/LeftNavigation";
import { LNCommon } from "../Common/Employee/LNCommon";
import { IDCardCarouselDisplay } from "./MultiEminentProfessorsDisplay/IDCardCarouselDisplay";
import { MultiEventsAndPlacementsDisplay } from "./MultiEventsAndPlacementsDisplay/MultiEventsAndPlacementsDisplay";
import { MultiCurrentAffairsDisplay } from "../MultiCurrentAffairsDisplay/MultiCurrentAffairsDisplay";
import {
  getSelectedCategory,
  getAllCategories,
  getRedirectLandingHome,
} from "../../state/selectors/categories";
import {
  setSelectedCategory,
  setVideosData,
  setSelectedCategoryLevel2,
  setSelectedCategoryLevel3,
} from "../../state/actions/categories";
import { getAffairs } from "../../services/subscriberService";
import { getMultipleFiles } from "../../services/subscriberService";
import { getComponentElement } from "./ControllerComps";

export const HomeCommon = () => {
  const selectorCategory = useSelector(getSelectedCategory);
  const selectorCategoriesData = useSelector(getAllCategories);
  const params = QueryString.parse(useLocation().search);
  const dispatch = useDispatch();
  const [selectedCategoryData, setSelectedCategoryData] = useState();
  const [carouselData, setCarouselData] = useState();
  const [eventsData, setEventsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [quicklinksData, setQuicklinksData] = useState([]);
  const setMultipleFiles = async (
    fileType,
    selectedCategoryData,
    selectedCategory2,
    selectedCategory3
  ) => {
    const resultImages = await getMultipleFiles(
      fileType,
      selectedCategoryData,
      selectedCategory2,
      selectedCategory3
    );
    return resultImages;
  };
  const setMultipleFilesAll = async () => {
    if (params.Category3) {
      const resultImagesCarousel = await setMultipleFiles(
        "IMG",
        params.Category1,
        params.Category,
        params.Category3
      );
      resultImagesCarousel !== undefined &&
        setCarouselData([...resultImagesCarousel.data]);
    }
  };
  const getAllAffairsUI = async () => {
    const result = await getAffairs(
      "51e1a477-8fec-4bf6-a7c0-f7ac04737fe9",
      subscriberRegistrationNo,
      "",
      params.Category1,
      params.Category,
      params.Category3
    );
    if (result) {
      const data = result.data[0];
      setEventsData([...data]);
    }
    const resultNews = await getAffairs(
      "f40a59c5-7a8f-45b9-84dd-373534eaf346",
      subscriberRegistrationNo,
      "",
      params.Category1,
      params.Category,
      params.Category3
    );
    if (resultNews) {
      const data = resultNews.data[0];
      setNewsData([...data]);
    }
    const resultQuicklinks = await getAffairs(
      "ca37af00-9636-4ab3-a289-e1094cd9efe1",
      subscriberRegistrationNo,
      "",
      params.Category1,
      params.Category,
      params.Category3
    );
    if (resultQuicklinks) {
      const data = resultQuicklinks.data[0];
      setQuicklinksData([...data]);
    }
    const resultVideos = await getAffairs(
      "8ffd79f7-68fe-40d3-a21d-373728225159",
      subscriberRegistrationNo,
      "",
      params.Category1,
      params.Category,
      params.Category3
    );
    if (resultVideos) {
      const data = resultVideos.data[0];
      dispatch(setVideosData([...data]));
    }
  };
  useEffect(() => {
    setSelectedCategoryData(params.Category1);
    dispatch(setSelectedCategory(params.Category1));
    dispatch(setSelectedCategoryLevel2(params.Category2));
    dispatch(setSelectedCategoryLevel3(params.Category3));
    const els = document.getElementById(params.Category1);
    els && els.click();
    const els2 = document.getElementById(params.Category2);
    els2 && els2.click();
    const els3 = document.getElementById(params.Category3);
    els3 && els3.click();
  }, [params.Category2]);
  return (
    <React.Fragment>
      {/* <Landing /> */}
      <Row>
        {params.Category1 ? (
          <React.Fragment>
            <Col lg="2">
              <div>
                <LNCommon />
              </div>
            </Col>
            <Col lg="10">{getComponentElement(params.Category1)}</Col>
          </React.Fragment>
        ) : (
          <Col lg="12" className="colHome">
            <Row>
              <Col lg="3" className="colHome">
                {eventsData &&
                  (eventsData.length > 0 ? (
                    <MultiCurrentAffairsDisplay
                      affairsData={quicklinksData}
                      title="Quick links"
                    />
                  ) : (
                    <img src="images/StaffHome.jpg" alt="StaffHome" />
                  ))}
              </Col>
              <Col lg="9" className="colHome">
                <ControlledCarousel imagesData={carouselData} />
              </Col>
            </Row>
            <Row>
              <Col lg="8" className="colHome">
                <AboutNsakSections />
              </Col>
              <Col lg="4" className="colHome">
                {eventsData && eventsData.length > 0 && (
                  <MultiCurrentAffairsDisplay
                    affairsData={newsData}
                    title="Upcoming Events"
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={12} className="colHome">
                <VideoAffairsDisplay />
              </Col>
            </Row>
            <Row>
              <Col lg={3} className="colHome">
                <IDCardCarouselDisplay />
              </Col>
              <Col lg={6} className="colHome">
                {eventsData && eventsData.length > 0 && (
                  <MultiCurrentAffairsDisplay
                    affairsData={eventsData}
                    title="Upcoming Events"
                  />
                )}
              </Col>
              <Col lg={3} className="colHome">
                <MultiEventsAndPlacementsDisplay />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </React.Fragment>
  );
};
