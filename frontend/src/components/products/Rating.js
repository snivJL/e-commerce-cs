import React from "react";

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <span style={{ color: "#FFE234" }}>
        <i
          className={
            value >= 1
              ? "fa fa-star"
              : value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span style={{ color: "#FFE234" }}>
        <i
          className={
            value >= 2
              ? "fa fa-star"
              : value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span style={{ color: "#FFE234" }}>
        <i
          className={
            value >= 3
              ? "fa fa-star"
              : value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span style={{ color: "#FFE234" }}>
        <i
          className={
            value >= 4
              ? "fa fa-star"
              : value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span style={{ color: "#FFE234" }}>
        <i
          className={
            value >= 5
              ? "fa fa-star"
              : value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
    </div>
  );
};

export default Rating;
