import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './Slider.module.scss'

class SimpleSlider extends React.Component {
   render() {
      var settings = {
         dots: false,
         infinite: true,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         slide: "img",
         arrows: false,
         autoplay: true
      };
      return (
         <Slider {...settings} >
            <img className={styles.sliderItem} alt={"sliderPic"} src={"https://gbico.net/wp-content/uploads/2019/01/19.jpg"}/>
            <img className={styles.sliderItem} alt={"sliderPic"} src={"https://gbico.net/wp-content/uploads/2019/01/19.jpg"}/>
            <img className={styles.sliderItem} alt={"sliderPic"} src={"https://gbico.net/wp-content/uploads/2019/01/19.jpg"}/>
         </Slider>
      );
   }
}

export default SimpleSlider