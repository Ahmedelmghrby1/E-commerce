import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <div className="my-4 container">
      <h3>Shop Popular Categories</h3>
      <Slider {...settings}>
        {categories.map((item) => (
         <div key={item._id} className="px-1">
             <img
            src={item.image}
            height={200}
            className="w-100"
            alt=""
          />
          <h5>{item.name}</h5>
         </div>
        ))}
      </Slider>
    </div>
  );
}
