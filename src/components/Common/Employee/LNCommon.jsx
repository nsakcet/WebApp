import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as QueryString from "query-string";
import { useLocation, Link } from "react-router-dom";
import "./LNCommon.css";
import { Accordion, Card, useAccordionToggle } from "react-bootstrap";
import { getAllCategories } from "../../../state/selectors/categories";

function CustomToggle({ children, eventKey, handleClick }) {
    const [toggleFirstEle, setToggleFirstEle]= useState(true);
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
              const collapsef =document.getElementById("collapse2");
              if(toggleFirstEle && eventKey===0){
              collapsef.classList.add("show3");
              setToggleFirstEle(false);
            }
              else
              {
              collapsef.classList.remove("show3");
              setToggleFirstEle(true);
              }
            handleClick();

  });


  return (
    <div
      className="card-header card-header-1"
      type="button"
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}

export const LNCommon = () => {
  const [activeKey, setActiveKey] = useState(0);
  const [activeKey2, setActiveKey2] = useState(0);
  const [data, setData] = useState([]);
  const [level3, setLevel3] = useState();
  const selector = useSelector(getAllCategories);
  const params = QueryString.parse(useLocation().search);
  const handleClickParent = (currItem) => {
    const filterCategoriesData = selector.filter(
      (cat) => cat.ParentId == currItem.CategoryId
    );
    setLevel3(filterCategoriesData);
  };
  useEffect(() => {
    const filterCategoriesData = selector.filter(
      (cat) => cat.ParentId == params.Category1
    );
    setData(filterCategoriesData);
  }, [params.Category1, selector]);

  return (
    <div className="App">
      <Accordion activeKey={activeKey} className="Accordion2">
        {
          data?.map((item, index) => (
            <Card key={index} className="card2">
              <CustomToggle
                as={Card.Header}
                eventKey={index}
                handleClick={() => {
                  if (activeKey === index) {
                    handleClickParent(item);
                    setActiveKey(null);
                  } else {
                    handleClickParent(item);
                    setActiveKey(index);
                  }
                }}
              >
                {item.CategoryName}
                {activeKey === index ? (
                  <span className="sidebar-pn">{(index === 0) ? '+':'-'}</span>
                ) : (
                  <span className="sidebar-pn">{(index !== 0) ? '+':'-'}</span>
                ) 
                } 
              </CustomToggle>
              <Accordion.Collapse  eventKey={index} id="collapse2"  >
                <React.Fragment>
                  {level3 !== undefined &&
                    level3.length > 0 &&
                    level3.map((item2, index2) => (
                      <Card.Body
                        className="card-body2"
                        eventKey={index2}
                        handleClick={() => {
                          if (activeKey2 === index2) {
                            setActiveKey2(null);
                          } else {
                            setActiveKey2(index2);
                          }
                        }}
                      >
                        <div class="news-border2" key={index2}>
                          <Link
                            id={item2.CategoryId}
                            className={`${
                              item2.CategoryId == params.Category2
                                ? "activeSuperTabs"
                                : ""
                            }`}
                            to={`homecommon${params.Category1}?Category1=${params.Category1}&Category2=${item.CategoryId}&Category3=${item2.CategoryId}`}
                            // onClick={handleSelectedParentTab}
                            variant="light"
                          >
                            {item2.CategoryName}
                          </Link>
                        </div>
                      </Card.Body>
                    ))}
                </React.Fragment>
              </Accordion.Collapse>
            </Card>
          ))}
      </Accordion>
    </div>
  );
};
