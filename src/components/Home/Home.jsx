import React, { useState, useEffect } from "react";
import { ControlledCarousel } from "./ControlledCarousel";
import { AboutCarousel } from "../Common/AboutCarousel";
import { VideoDisplay } from "../Common/VideoDisplay";
import { Landing } from "../Common/Landing";
import { AboutNsakSections } from "../Common/AboutNsakSections";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/core";
import { DotLoader } from "react-spinners";
import { subscriberRegistrationNo } from "../../config.json";
import { IDCardCarouselDisplay } from "./MultiEminentProfessorsDisplay/IDCardCarouselDisplay";
import { MultiEventsAndPlacementsDisplay } from "./MultiEventsAndPlacementsDisplay/MultiEventsAndPlacementsDisplay";
import { MultiCurrentAffairsHomeDisplay } from "../MultiCurrentAffairsHomeDisplay/MultiCurrentAffairsHomeDisplay";
import {
  getSelectedCategory,
  getAllCategories,
  getRedirectLandingHome,
} from "../../state/selectors/categories";
import { setVideosData } from "../../state/actions/categories";
import { getAffairs } from "../../services/subscriberService";
import { getMultipleFiles } from "../../services/subscriberService";
import { getComponentElement } from "./ControllerComps";
import { QuickLinksDisplay } from "../QuickLinks/QuickLinksDisplay";
import { CoursesBox } from "../Common/CoursesBox";
import { CoursesSection } from "../Common/CoursesSection";
import { FeatureSection } from "../Common/FeatureSection";
import { MultiEminentProfessorsDisplay } from "./MultiEminentProfessorsDisplay/MultiEminentProfessorsDisplay";
import Marquee from "react-fast-marquee";
import { TopBar } from "../Common/TopBar";
import { ContactlessOutlined } from "@material-ui/icons";
import { ProfessorBox } from "../Common/ProfessorBox";
import { PlacementBox } from "../MultiCurrentAffairsHomeDisplay/PlacementBox";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #a52a2a;
  border-size: 5px;
`;
export const Home = () => {
  const selectedCategory = useSelector(getSelectedCategory);
  const selectorCategoriesData = useSelector(getAllCategories);
  const selectorRedirectLandingHome = useSelector(getRedirectLandingHome);
  const dispatch = useDispatch();
  const [category1, setCategory1] = useState();
  const [category2, setCategory2] = useState();
  const [category3, setCategory3] = useState();
  const [carouselData, setCarouselData] = useState();
  const [collageAboutData, setCollageAboutData] = useState();
  const [eventsData, setEventsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [placementsData, setPlacementsData] = useState([]);
  const [quicklinksData, setQuicklinksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#a52a2a");
  const setMultipleFiles = async (
    fileType,
    selectedCategory,
    selectedCategory2,
    selectedCategory3
  ) => {
    const resultImages = await getMultipleFiles(
      fileType,
      selectedCategory,
      selectedCategory2,
      selectedCategory3
    );
    return resultImages;
  };
  const setMultipleFilesAll = async () => {
    if (category3) {
      const resultImagesCarousel = await setMultipleFiles(
        "IMG",
        category1[0].CategoryId,
        category2[0].CategoryId,
        category3[2].CategoryId
      );
      resultImagesCarousel !== undefined &&
        setCarouselData([...resultImagesCarousel.data]);
    }
  };
  const setMultipleFilesAll2 = async () => {
    if (category3) {
      const resultImagesCarousel = await setMultipleFiles("IMG", 211, 212, 213);
      resultImagesCarousel !== undefined &&
        setCollageAboutData([...resultImagesCarousel.data]);
    }
  };
  const getAllAffairsUI = async () => {
    const result = await getAffairs(
      "51e1a477-8fec-4bf6-a7c0-f7ac04737fe9",
      subscriberRegistrationNo,
      "",
      category1[0].CategoryId,
      category2[0].CategoryId,
      category3[1].CategoryId
    );
    if (result) {
      const data = result.data[0];
      setEventsData([
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
      ]);
    }
    const resultNews = await getAffairs(
      "f40a59c5-7a8f-45b9-84dd-373534eaf346",
      subscriberRegistrationNo,
      "",
      category1[0].CategoryId,
      category2[0].CategoryId,
      category3[1].CategoryId
    );
    if (resultNews) {
      const data = resultNews.data[0];
      setNewsData([...data]);
    }
    const resultPlacements = await getAffairs(
      "51e1a477-8fec-4bf6-a7c0-f7ac04737fe9",
      subscriberRegistrationNo,
      "",
      58,
      59,
      60
    );
    if (resultPlacements) {
      const data = resultPlacements.data[0];
      setPlacementsData([...data]);
    }
    const resultQuicklinks = await getAffairs(
      "ca37af00-9636-4ab3-a289-e1094cd9efe1",
      subscriberRegistrationNo,
      "",
      category1[0].CategoryId,
      category2[0].CategoryId,
      category3[1].CategoryId
    );
    if (resultQuicklinks) {
      const data = resultQuicklinks.data[0];
      setQuicklinksData([...data]);
    }
    const resultVideos = await getAffairs(
      "8ffd79f7-68fe-40d3-a21d-373728225159",
      subscriberRegistrationNo,
      "",
      category1[0].CategoryId,
      category2[0].CategoryId,
      category3[1].CategoryId
    );
    if (resultVideos) {
      const data = resultVideos.data[0];
      dispatch(setVideosData([...data]));
    }
  };
  const changeStatusLoader = (flag) => {
    setLoading(flag);
  };
  useEffect(() => {
    setMultipleFilesAll();
    setMultipleFilesAll2();
    if (category3) getAllAffairsUI();
  }, [category3]);
  useEffect(() => {
    if (category2) {
      const filteredSuperMenu =
        selectorCategoriesData &&
        selectorCategoriesData.filter(
          (item) => item.ParentId === category2[0].CategoryId
        );
      if (filteredSuperMenu) setCategory3(filteredSuperMenu);
    }
  }, [category2]);
  useEffect(() => {
    if (category1) {
      const filteredSuperMenu =
        selectorCategoriesData &&
        selectorCategoriesData.filter(
          (item) => item.ParentId === category1[0].CategoryId
        );
      if (filteredSuperMenu.length > 0) setCategory2(filteredSuperMenu);
    }
  }, [category1]);
  useEffect(() => {
    const filteredSuperMenu =
      selectorCategoriesData &&
      selectorCategoriesData.filter(
        (item) =>
          (item.ParentId === null || item.ParentId === 0) &&
          item.isDisplayCategory === 0
      );
    if (filteredSuperMenu) setCategory1(filteredSuperMenu);
  }, [selectorCategoriesData]);
  return (
    <React.Fragment>
      {/* <Landing /> */}
      <Row>
        <Col lg="12" className="colHome">
          <Row>
            <Col lg="12" className="colHome">
              <ControlledCarousel
                imagesData={carouselData}
                affairsData={quicklinksData}
                setLoading={changeStatusLoader}
              />
            </Col>

            <Marquee pauseOnHover="true" speed="80" direction="left">
              {newsData.map((item) => (
                <a
                  className="news-update"
                  href={item.relativeUrl}
                  target="_blank"
                >
                  <p className="marquee-txt">
                    <div className="newsData">
                      <i className={item.iconPath}></i>

                      {item.affairsName}
                    </div>
                  </p>
                </a>
              ))}
            </Marquee>

          </Row>

          <div className="light-background">
            <Container className="course-container">
              <Col>
                {quicklinksData.length > 0 && (
                  <CoursesSection affairsData={quicklinksData} />
                )}
              </Col>
            </Container>
          </div>



          {!loading && (
            <React.Fragment>
              <div className="container course-container">
                <div className="section-top-padding"></div>
                <Row>
                  <Col xl="8" className="colHome">
                    <AboutNsakSections />
                  </Col>
                  <Col xl="4" className="colHome">
                    <AboutCarousel
                      imagesData={collageAboutData}
                      setLoading={changeStatusLoader}
                    />
                  </Col>
                </Row>
              </div>
              <Row>
                <Col lg={12} className="colHome">
                  <VideoDisplay />
                </Col>
              </Row>
              <div className=" ">
                <div className="light-background">
                  <Container className="activity-container">
                    <Col lg={12} className="activitysection">

                      <FeatureSection />

                    </Col>
                  </Container>

                </div>
                <Row>
                  <Col></Col>

                  <Col lg={4} className="professorbg">
                    <ProfessorBox />
                  </Col>

                  <Col
                    lg={4}
                    className="colHome professor-container home-news-container"
                  >
                    {eventsData && eventsData.length > 0 && (
                      <MultiCurrentAffairsHomeDisplay
                        affairsData={eventsData}
                        title="Upcoming Events"
                      />
                    )}
                  </Col>

                  <Col
                    lg={4}
                    className="colHome professor-container home-news-container"
                  >
                    {placementsData && placementsData.length > 0 && (
                      <PlacementBox
                        affairsData={placementsData}
                        title="Placements"
                      />
                    )}
                  </Col>
                </Row>
              </div>
            </React.Fragment>
          )}
        </Col>
      </Row>

      <DotLoader color={color} loading={loading} css={override} size={100} />
    </React.Fragment>
  );
};
