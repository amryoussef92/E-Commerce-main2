import React from "react";
import "./Review.css";
import user1 from "../../assets/images/person-1.png";
import user2 from "../../assets/images/person-2.jpg";
import user3 from "../../assets/images/person-3.png";

const Review = () => {
  const reviews = [
    {
      user: "Brooke",
      userImage: user1,
      rating: 4,
      title: "Favorite dress",
      date: "6 August 2024",
      location: "United States",
      purchase: true,
      reviewText:
        "I initially purchased this dress on sale. It turned out to be my favorite dress of this summer...",
      color: "black",
      size: 40,
    },
    {
      user: "Elva S. D.",
      userImage: user2,
      rating: 5,
      title: "Lindo!!",
      date: "11 August 2023",
      location: "Mexico",
      purchase: true,
      reviewText:
        "Bien hecho, bonita tela y bonita caída, fresco y casual. La marca lo dice!!",
    },
    {
      user: "Ana Patricia Rodriguez",
      userImage: user3,
      rating: 4,
      title: "COMODIDAD",
      date: "29 June 2023",
      location: "United States",
      purchase: true,
      reviewText:
        "ES LINDO COMODO Y LIGERO PARA CLIMA CALIDO, ES LA TELA ADECUADA",
    },
  ];

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <div className="d-flex align-items-center">
            <img
              src={review.userImage}
              alt={review.user}
              className="review-avatar me-2"
            />
            <h5 className="review-user">{review.user}</h5>
          </div>
          <p className="review-rating d-inline">
            {"⭐".repeat(review.rating)}
          </p>
          <strong className="review-title mx-2">{review.title}</strong>
          <p className="text-muted">
            Reviewed in {review.location} on {review.date}
          </p>
          {review.color && <p className="d-inline">Color: {review.color} | </p>}
          {review.size && <p className="d-inline">Size: {review.size} | </p>}
          {review.purchase && (
            <p className="color fw-bold d-inline">Verified Purchase</p>
          )}
          <p className="review-text">{review.reviewText}</p>
          <p>report</p>
        </div>
      ))}
    </div>
  );
};

export default Review;
