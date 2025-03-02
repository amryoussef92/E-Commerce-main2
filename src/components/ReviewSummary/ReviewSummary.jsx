import React from "react";
import "./ReviewSummary.css";

const ReviewSummary = () => {
  return (
    <div className="review-summary">
      <h3>Customer Reviews</h3>
      <p className="fs-5 fw-medium">
        <i className="fa fa-star text-warning"></i>
        <i className="fa fa-star text-warning"></i>
        <i className="fa fa-star text-warning"></i>
        <i className="fa fa-star text-warning"></i>
        <i className="fa-regular fa-star text-warning"></i>{" "}
        <span className="text-dark">4.1 out of 5</span>
      </p>
      <p>1 global rating</p>
      <div>
        {[
          { label: "5 star", width: "0%", percentage: "0%" },
          { label: "4 star", width: "71%", percentage: "71%" },
          { label: "3 star", width: "0%", percentage: "0%" },
          { label: "2 star", width: "6%", percentage: "6%" },
          { label: "1 star", width: "0%", percentage: "0%" },
        ].map((item, index) => (
          <div className="review-item" key={index}>
            <span>{item.label}</span>
            <div className="progress">
              <div
                className={`progress-bar ${
                  item.width !== "0%" ? "progress-bar-highlight" : ""
                }`}
                style={{ width: item.width }}
              ></div>
            </div>
            <span>{item.percentage}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSummary;
