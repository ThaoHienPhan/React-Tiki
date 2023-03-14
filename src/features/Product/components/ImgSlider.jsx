import React, { useState } from "react";
import { SliderData } from "constant/index";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, createTheme, Skeleton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  slider: {
    position: "relative",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  right_arrow: {
    position: "absolute",
    top: "50%",
    right: "32px",
    fontSize: "3rem",
    color: "#000",
    zIndex: "10",
    cursor: "pointer",
    userSelect: "none",
  },
  left_arrow: {
    position: "absolute",
    top: "50%",
    left: "32px",
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
}));

const ImageSlider = ({ slides, setState }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const classes = useStyles();

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    setState(slides[current].image);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    setState(slides[current].image);

  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className={classes.slider}>
      <ArrowBackIosIcon className={classes.left_arrow} onClick={prevSlide} />
      <ArrowForwardIosIcon
        className={classes.right_arrow}
        onClick={nextSlide}
      />
      {!SliderData
        ? ""
        : SliderData.map((slide, index) => {
            return (
              <div
                className={index === current ? "slide active" : "slide"}
                key={index}
              >
                {index === current && (
                  <img
                    src={slide.image}
                    alt="travel image"
                    className={classes.image}
                  />
                )}
              </div>
            );
          })}
    </section>
  );
};
export default ImageSlider;
