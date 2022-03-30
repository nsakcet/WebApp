import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MultiPDFsDisplay.css";
import { getSelectImgData, getSelectPdfData } from "../../state/selectors/categories";
import { imagesRepoUrl } from "../../config.json";

export const MultiPDFsDisplay = () => {
  const settings = {
    customPaging: function (i) {
      return <a>{i + 1}</a>;
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 2000,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imagesData = useSelector(getSelectPdfData);
useEffect(() => {
 console.log('************** : ', imagesData)
}, [imagesData])

  // var  imagesData=["/uploads/80f1e029-9234-491a-80cb-7d66f4d3bb3f/Multpics/37/205/199/PDF/71e0801a-5119-4dda-9d29-69218343fea5/80f1e029-9234-491a-80cb-7d66f4d3bb3f_PDF_71e0801a-5119-4dda-9d29-69218343fea5_37_205_199_Mult.pdf"]

  return (
    <Slider {...settings}>
      {
        imagesData?.map((item) => {
          return (
            <iframe
              src={`${imagesRepoUrl}${item}`}
              frameborder="0"
              width="100%"
              height="560px"
            ></iframe>
          );
        })}
    </Slider>
  );
};
