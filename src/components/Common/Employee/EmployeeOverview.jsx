import React, { useState, useEffect } from "react";
import ReactHtmlParser from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Employee_Overview.css";
import { getAllEmployees } from "../../../state/selectors/employees";
import { getSelectedCategoryPrev } from "../../../state/selectors/categories";
import { setSelectedCategory } from "../../../state/actions/categories";
import { imagesRepoUrl } from "../../../config.json";
import * as QueryString from "query-string";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const EmployeeOverview = () => {
  const [selectedEmployee, setSelectedEmployee] = useState();
  const params = QueryString.parse(useLocation().search);
  const allEmployees = useSelector(getAllEmployees);
  const prevSelectedCategory = useSelector(getSelectedCategoryPrev);
  const dispatch = useDispatch();
  const handleRedirectToEmployeeList = () => {
    dispatch(setSelectedCategory(prevSelectedCategory));
  };
  let sectionStyle, imgPath, sectionStyle2, imgPath2;

  if (!selectedEmployee) {
  } else {
    imgPath = `${imagesRepoUrl}${selectedEmployee.employeeThumbnail}`;
    sectionStyle = {
      backgroundImage: `url(${imgPath})`,
    };
    imgPath2 = `/images/BackImage.png`;
    sectionStyle2 = {
      backgroundImage: `url(${imgPath2})`,
    };
  }
  useEffect(() => {
    const filtEmployee = allEmployees.filter(
      (emp) => emp.EmpID == params.empId
    );
    setSelectedEmployee(filtEmployee[0]);
    console.log("allEmployee---->", params.empId, allEmployees, filtEmployee);
  }, [allEmployees]);
  return (
    <Row className="employee-overview-row">
      <Col
        lg="12"
        className="employee-overview-col description-section employee-detail-container"
      >
        <div className="employee-description-p">
          {selectedEmployee && (
            <div className="overview-body-content">
              <Row className="overview-row1">
                <Col lg="2">
                  <div
                    className="employeecard-image-2"
                    style={sectionStyle}
                  ></div>
                </Col>
                <Col lg="8">
                  <h2 className="faculty-name">
                    {`${selectedEmployee.Prefix} ${selectedEmployee.FirstName} ${selectedEmployee.LastName}`}
                  </h2>
                </Col>
                <Col lg="2">
                  <Link
                    to={`\homecommon?Category1=${params.Category1}&Category2=${params.Category2}&Category3=70707070`}
                  >
                    <div
                      className="employeecard-image-2"
                      onClick={handleRedirectToEmployeeList}
                      style={sectionStyle2}
                    ></div>
                  </Link>
                </Col>
              </Row>

              <Row>
                <Col lg="3" className="overview-col1">
                  Name
                </Col>
                <Col lg="9" className="overview-col1">
                  Detail's
                </Col>
              </Row>
              <Row>
                <Col lg="3" className="data-col">
                  Name Of Faculty:
                </Col>
                <Col lg="9" className="data-col">
                  {`${selectedEmployee.Prefix} ${selectedEmployee.FirstName} ${selectedEmployee.LastName}`}
                </Col>
              </Row>

              <Row>
                <Col lg="3" className="data-col">
                  Department Name:{" "}
                </Col>
                <Col lg="9" className="data-col">
                  {selectedEmployee.DeptName}
                </Col>
              </Row>

              <Row>
                <Col lg="3" className="data-col">
                  Designation:
                </Col>
                <Col lg="9" className="data-col">
                  {selectedEmployee.designame}
                </Col>
              </Row>

              <Row>
                <Col lg="3" className="data-col">
                  Gender:
                </Col>
                <Col lg="9" className="data-col">
                  {selectedEmployee.genderName}
                </Col>
              </Row>

              <Row>
                <Col lg="3" className="data-col">
                  Highest Qualification:
                </Col>
                <Col lg="9" className="data-col">
                  {selectedEmployee.highestQualification}
                </Col>
              </Row>

              <Row>
                <Col lg="3" className="data-col">
                  Other Qualification:
                </Col>
                <Col lg="9" className="data-col">
                  {selectedEmployee.otherQualification}
                </Col>
              </Row>

              <Row>
                <Col lg="3" className="data-col">
                  Total Experience:
                </Col>
                <Col lg="9" className="data-col">
                  {selectedEmployee.ExperienceAtTimeOfJoining}
                </Col>
              </Row>

              <Row>
                <Col lg="3" className="data-col">
                  Membership:
                </Col>
                <Col lg="9" className="data-col">
                  {selectedEmployee.MembershipIds}
                </Col>
              </Row>

              <Row>
                <Col lg="3" className="data-col">
                  Email Id:
                </Col>
                <Col lg="9" className="data-col">
                  {selectedEmployee.Email}
                </Col>
              </Row>

              <Row>
                <Col lg="3" className="data-col">
                  Key Responsibilties:
                </Col>
                <Col lg="9" className="data-col">
                  {selectedEmployee.KeyResposibility &&
                    ReactHtmlParser(
                      selectedEmployee.KeyResposibility.replace(
                        /\\n/g,
                        "<br />"
                      )
                        .replace(/\\n/g, "<br />")
                        .replace(/\<p>/g, "<br />")
                        .replace(/\<\p>/g, "")
                        .replace(/strong>/g, "h3>")
                        .replace(/\\t/g, "")
                        .replace(/href=\\/g, "href=")
                        .replace(/src=\\/g, "src=")
                        .replace(/png\\/g, "png")
                        .replace(/jpg\\/g, "jpg")
                        .replace(/\<br \/>/g, "")
                        .replace(/&nbsp;/g, " ")
                    )}
                </Col>
              </Row>

              <Row>
                <Col lg="3" className="data-col">
                  Biography:
                </Col>
                <Col lg="9" className="data-col">
                  {selectedEmployee.Boigraphy &&
                    ReactHtmlParser(
                      selectedEmployee.Boigraphy.replace(/\\n/g, "<br />")
                        .replace(/\\n/g, "<br />")
                        .replace(/\<p>/g, "<br />")
                        .replace(/\<\p>/g, "")
                        .replace(/strong>/g, "h3>")
                        .replace(/\\t/g, "")
                        .replace(/href=\\/g, "href=")
                        .replace(/src=\\/g, "src=")
                        .replace(/png\\/g, "png")
                        .replace(/jpg\\/g, "jpg")
                        .replace(/\<br \/>/g, "")
                        .replace(/&nbsp;/g, " ")
                    )}
                </Col>
              </Row>

              <Row>
                <Col lg="3" className="data-col">
                  Research and Publication:
                </Col>
                <Col lg="9" className="data-col">
                  {selectedEmployee.ResearchAndPublication &&
                    ReactHtmlParser(
                      selectedEmployee.ResearchAndPublication.replace(
                        /\\n/g,
                        "<br />"
                      )
                        .replace(/\\n/g, "<br />")
                        .replace(/\<p>/g, "<br />")
                        .replace(/\<\p>/g, "")
                        .replace(/strong>/g, "h3>")
                        .replace(/\\t/g, "")
                        .replace(/href=\\/g, "href=")
                        .replace(/src=\\/g, "src=")
                        .replace(/png\\/g, "png")
                        .replace(/jpg\\/g, "jpg")
                        .replace(/\<br \/>/g, "")
                        .replace(/&nbsp;/g, " ")
                    )}
                </Col>
              </Row>

              <Row>
                <Col lg="3" className="data-col">
                  Conference:
                </Col>
                <Col lg="9" className="data-col">
                  {selectedEmployee.Conference &&
                    ReactHtmlParser(
                      selectedEmployee.Conference.replace(/\\n/g, "<br />")
                        .replace(/\\n/g, "<br />")
                        .replace(/\<p>/g, "<br />")
                        .replace(/\<\p>/g, "")
                        .replace(/strong>/g, "h3>")
                        .replace(/\\t/g, "")
                        .replace(/href=\\/g, "href=")
                        .replace(/src=\\/g, "src=")
                        .replace(/png\\/g, "png")
                        .replace(/jpg\\/g, "jpg")
                        .replace(/\<br \/>/g, "")
                        .replace(/&nbsp;/g, " ")
                    )}
                </Col>
              </Row>
              <Row>
                <Col lg="3" className="data-col">{`Paper Presentation:`}</Col>
                <Col lg="9" className="data-col">
                  {selectedEmployee.PaperPresentation &&
                    ReactHtmlParser(
                      selectedEmployee.PaperPresentation.replace(
                        /\\n/g,
                        "<br />"
                      )
                        .replace(/\\n/g, "<br />")
                        .replace(/\<p>/g, "<br />")
                        .replace(/\<\p>/g, "")
                        .replace(/strong>/g, "h3>")
                        .replace(/\\t/g, "")
                        .replace(/href=\\/g, "href=")
                        .replace(/src=\\/g, "src=")
                        .replace(/png\\/g, "png")
                        .replace(/jpg\\/g, "jpg")
                        .replace(/\<br \/>/g, "")
                        .replace(/&nbsp;/g, " ")
                    )}
                </Col>
              </Row>
            </div>
          )}
        </div>
        <div className="employee-overview-title2">
          <div className=" text-center">
            <Link
              to={`homecommon?Category1=${params.Category1}&Category2=${params.Category2}&Category3=70707070`}
              className="btn-default btn-block btn3 btn4"
            >
              Back
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
};
