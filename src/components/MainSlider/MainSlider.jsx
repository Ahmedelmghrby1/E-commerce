import React from 'react'
import Slider from "react-slick";
import slider1 from "../../assets/images/8f2ccacc-836b-4c44-9189-a2f63202fae7.png"
import slider2 from "../../assets/images/98cd8eeb-bd78-4354-a08b-6b958175da93.png"
import slider3 from "../../assets/images/abeb4106-fa54-407c-98c7-d0ba93328de6.png"

export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:1500,
      };
  return (
    <div>
    <Slider {...settings}>
     <img src={slider1} alt="" />
     <img src={slider2} alt="" />
     <img src={slider3} alt="" />
    </Slider>
    </div>
  )
}
