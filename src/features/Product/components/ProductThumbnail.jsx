import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { SliderData, STATIC_HOST, THUMBNAIL_PLACEHOLDER } from "constant/index";
import ImageSlider from "./ImgSlider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { createTheme } from "@mui/system";
import { makeStyles } from "@mui/styles";

ProductThumbnail.propTypes = {
  product: PropTypes.object,
};
const theme = createTheme();
const useStyles = makeStyles(() => ({
  slider: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    "&:active": {
      opacity: "1",
      transition: "height 2s linear 0.5s",
    },
  },

  right_arrow: {
    position: "absolute",
    top: "30%",
    right: "-30px",
    fontSize: "3rem",
    color: "#000",
    zIndex: "10",
    cursor: "pointer",
    userSelect: "none",
  },
  left_arrow: {
    position: "absolute",
    top: "30%",
    left: "-30px",
    fontSize: "3rem",
    color: "#000",
    zIndex: "10",
    cursor: "pointer",
    userSelect: "none",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
  },
  section: {
    display: "flex",
    paddingTop: "10px",
    paddingLeft: "2px",
    "& div": {
      padding: "3px",
    },
  },
}));

function ProductThumbnail({ product }) {
  const classes = useStyles();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;
  const [state, setState] = useState(thumbnailUrl);
  const [current, setCurrent] = useState(0);
  const length = SliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    setState(SliderData[current].image);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    setState(SliderData[current].image);
  };
  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }

  return (
    <Box className={classes.slider}>
      <img src={state} width={"319px"} />

      <ArrowBackIosIcon className={classes.left_arrow} onClick={prevSlide} />
      <ArrowForwardIosIcon
        className={classes.right_arrow}
        onClick={nextSlide}
      />
      <div className={classes.section}>
        {!SliderData
          ? thumbnailUrl
          : SliderData.map((slide, index) => {
              return (
                // <section className={classes.section}>
                //   <div
                //     className={
                //       index === current ? classes.slider.acive : classes.slider
                //     }
                //     key={index}
                //   >
                //     {index === current && (
                //       <img
                //         src={slide.image}
                //         alt="travel image"
                //         className={classes.image}
                //       />
                //     )}
                //   </div>

                // </section>
                <div>
                  <img
                    src={slide.image}
                    alt="travel image"
                    className={classes.image}
                  />
                </div>
              );
            })}
      </div>
    </Box>
  );
}

export default ProductThumbnail;
