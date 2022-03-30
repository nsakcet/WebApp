import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { NavbarList } from "./NavbarList";
import { TopBar } from "../Common/TopBar";
import NavDynamicMenu from "../Common/NavDynamicMenu";
import {
  getSearchBoxInput,
  getAllFilters,
} from "../../state/selectors/filters";
import { getGenderMaster } from "../../services/genderMasterService";
import { useDispatch, useSelector } from "react-redux";
import { setGenders } from "../../state/actions/gender";
import {
  setTextFilter,
  clearFilters,
  removeCheckboxFilter,
} from "../../state/actions/filters";
import { NsakLogo } from "./NsakLogo/NsakLogo";
import { Form, Button, Col, Row } from "react-bootstrap";

export const Landing = () => {
  const [categoryId, setCategoryId] = useState(18);
  const [categoryName, setCategoryName] = useState("1");
  const inputAllFilter = useSelector(getAllFilters);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleCategory = (e) => {
    inputAllFilter.brand.forEach((element) => {
      dispatch(removeCheckboxFilter(element));
    });
    setCategoryId(e.target.id);
    setCategoryName(e.target.value);
    dispatch(setTextFilter(""));
    dispatch(clearFilters());
    history.push(`/employeelist?catId=${e.target.id}`);
  };
  const serviceDataCall = async () => {
    const resultGender = await getGenderMaster();
    dispatch(setGenders(resultGender?.data[0]));
  };
  useEffect(() => {
    serviceDataCall();
  }, []);
  return (
    <React.Fragment>
      <Row>
        <Col>
          <TopBar />
        </Col>
      </Row>
      <Row>
        <Col>
          <NsakLogo />
        </Col>
      </Row>
      <Row>
        <Col>
          <NavDynamicMenu />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Landing;
