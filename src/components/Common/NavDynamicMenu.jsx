import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./NavDynamicMenu.css";
import brandLogo from "../../img/nsak-logo.png";

import {
  getMultipleLevelCategory,
  getMultipleFiles,
  getHomeLevelDetailsData,
  getAffairs,
} from "../../services/subscriberService";
import { subscriberRegistrationNo } from "../../config.json";
import {
  setCategories,
  setSelectedCategory,
  setSelectedCategoryLevel3,
  setImagesData,
  setVideosData,
  setEventsAffairsData,
  setPPTsData,
  setDOCsData,
  setXLSsData,
  setPDFsData,
  setHomeLevelDetails,
} from "../../state/actions/categories";
import {
  getSelectedCategory,
  getSelectedCategoryLevel2,
  getSelectedCategoryLevel3,
} from "../../state/selectors/categories";
import * as QueryString from "query-string";
import { useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const NavDynamicMenu = () => {
  const dispatch = useDispatch();
  const params = QueryString.parse(useLocation().search);
  const selectedCategory = useSelector(getSelectedCategory);
  const selectedCategory2 = useSelector(getSelectedCategoryLevel2);
  const selectedCategory3 = useSelector(getSelectedCategoryLevel3);
  const [superMenuData, setSuperMenuData] = useState([]);

  const getMenus = async () => {
    const result = await getMultipleLevelCategory(subscriberRegistrationNo);
    if (result) {
      dispatch(setCategories(result.data[0]));
      const filteredSuperMenu =
        result.data[0] &&
        result.data[0].filter(
          (item) =>
            (item.ParentId === null || item.ParentId === 0) &&
            item.isDisplayCategory === 1
        );
      setSuperMenuData(filteredSuperMenu);
    }
  };
  const setMultipleFiles = async (fileType) => {
    const resultImages = await getMultipleFiles(
      fileType,
      selectedCategory,
      selectedCategory2,
      selectedCategory3
    );
    return resultImages;
  };
  const getHomeLevelDetailsUI = async () => {
    if (selectedCategory3 !== undefined) {
      const records = [
        {
          registrationno: subscriberRegistrationNo,
          categorylevel1: selectedCategory,
          categorylevel2: selectedCategory2,
          categorylevel3: selectedCategory3,
        },
      ];
      const buildRecords = JSON.stringify(records).replace(/"/g, '"');
      const result = await getHomeLevelDetailsData(buildRecords);

      if (result) {
        const data = result.data[0];
        dispatch(setHomeLevelDetails(data));
      }
    }
  };
  const setMultipleFilesAll = async () => {
    const resultImages = await setMultipleFiles("IMG");
    resultImages?.data &&
      dispatch(setImagesData([...resultImages?.data]));
    const resultPDFs = await setMultipleFiles("PDF");
    console.log('pdf data from api :', resultPDFs)
    resultPDFs?.data && dispatch(setPDFsData([...resultPDFs?.data]));
    const resultPPTs = await setMultipleFiles("PPT");
    resultPPTs?.data  && dispatch(setPPTsData([...resultPPTs?.data]));
    const resultDOCs = await setMultipleFiles("DOC");
    resultDOCs?.data && dispatch(setDOCsData([...resultDOCs?.data]));
    const resultXLSs = await setMultipleFiles("XLS");
    resultXLSs?.data && dispatch(setXLSsData([...resultXLSs?.data]));
    getHomeLevelDetailsUI();
  };
  const setVideoFilesAll = async () => {
    const resultVideos = await getAffairs(
      "8ffd79f7-68fe-40d3-a21d-373728225159",
      subscriberRegistrationNo,
      "",
      selectedCategory,
      selectedCategory2,
      selectedCategory3
    );
    if (resultVideos) {
      const data = resultVideos.data[0];
      dispatch(setVideosData([...data]));
    }
  };
  const setEventsAffairsFilesAll = async () => {
    const resultEventsAffairs = await getAffairs(
      "51e1a477-8fec-4bf6-a7c0-f7ac04737fe9",
      subscriberRegistrationNo,
      "",
      selectedCategory,
      selectedCategory2,
      selectedCategory3
    );
    if (resultEventsAffairs) {
      const data = resultEventsAffairs.data[0];
      dispatch(setEventsAffairsData([...data]));
    }
  };
  const handleSelectedCategoryHome = (e) => {
    dispatch(setSelectedCategory(e.target.id));
    dispatch(setSelectedCategoryLevel3(""));
  };
  const handleSelectedCategorytopMenu = (e) => {
    dispatch(setSelectedCategory(e.target.id));
  };
  const handleSelectedCategory = (e) => {
    handleSelectedCategorytopMenu(e);
  };
  useEffect(() => {
    getHomeLevelDetailsUI();
    setVideoFilesAll();
    setMultipleFilesAll()
    setEventsAffairsFilesAll();
  }, [selectedCategory3, selectedCategory2]);

  useEffect(() => {
    // setMultipleFilesAll();
  }, [])
  

  useEffect(() => {
    getMenus();
  }, [selectedCategory3]);

  return (
    <React.Fragment>
      <Navbar
        sticky="top"
        expand="lg"
        variant="dark"
        className="nav-bg menufixed menu-theme menu-theme-2"
      >
        <img
          className="brand-logo logo-mobile"
          src={brandLogo}
          alt="Nawab Shah Alam Khan College Of Engineering"
        />
        <Navbar.Toggle
          className="navBarToggle"
          aria-controls="main-navbar-nav"
        />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="mx-auto">
            {superMenuData.length > 0 && (
              <Link
                id="home"
                className={`nav-element${
                  0 == params.Category1 || params.Category1 === undefined
                    ? " activeSuperTabs"
                    : ""
                }`}
                to={`home?Category1=0`}
                onClick={handleSelectedCategoryHome}
              >
                Home
              </Link>
            )}
            {superMenuData.map((menu) => {
              return (
                <Link
                  id={menu.CategoryId}
                  className={`nav-element${
                    menu.CategoryId == params.Category1
                      ? " activeSuperTabs"
                      : ""
                  }`}
                  to={`homecommon${menu.CategoryId}?Category1=${menu.CategoryId}&Category2=${selectedCategory2}&Category3=70707070`}
                  onClick={handleSelectedCategory}
                >
                  {menu.CategoryName}
                </Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default NavDynamicMenu;
