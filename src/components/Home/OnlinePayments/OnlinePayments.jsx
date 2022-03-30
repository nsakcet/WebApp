import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Col, Row } from "react-bootstrap";
import "./OnlinePayments.css";

export const OnlinePayments = () => {
  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <br />
      <Row>
        <a
          href={`https://payments.billdesk.com/bdcollect/pay?p1=478&p2=1`}
          className="prof-title slider-overlay-carousel"
          target="_blank"
        >{`Tution Fee`}</a>
      </Row>
      <br />
      <br />
      <Row>
        <a
          href={`https://payments.billdesk.com/bdcollect/bd/nsakcoeat/2212`}
          className="prof-title slider-overlay-carousel"
          target="_blank"
        >
          {`Bonafide and Exam Fee`}
        </a>
      </Row>

      <br />
      <br />
      <Row>
        <a
          href={`https://exams.sbtet.telangana.gov.in/index.html#/Dashboard`}
          className="prof-title slider-overlay-carousel"
          target="_blank"
        >
          {`Diploma Exam Fee`}
        </a>
      </Row>
    </React.Fragment>
  );
};
