import Loader from "../Loader/Loader";
import useFetch from "./../../Hooks/useFetch";
import HomeSlider from "../HomeSlider/HomeSlider";
import { Helmet } from "react-helmet";
import Cards from "../HomeCards/Cards";
import BestSellerSlider from "../BestSellerSlider/BestSellerSlider";
export default function Home() {
  const { loading, error } = useFetch(
    "get",
    "https://ecommerce.routemisr.com/api/v1/products"
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  <Helmet>
    <title>Home</title>
  </Helmet>;
  return (
    <div style={{ backgroundColor: "#575757" }}>
      <HomeSlider />
      <section className="container ">
        <BestSellerSlider />
        <Cards />
        <BestSellerSlider />
      </section>
    </div>
  );
}
