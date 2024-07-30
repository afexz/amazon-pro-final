import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from '../components/image/data';


function CarouselImage() {
   return (
     <div>
        <Carousel
            autoplay={true}
            infiniteLoop={true}
            showIndicators={false}
            showThumbs={false}
              >
         {img.map((imageItem) => {
            return (
             <img
               src={imageItem} />
           )
         })}
       
       <div className="hero__img"></div>
         {img.map((imageItem, index) => {
           return (
             <img key={index} src={imageItem} alt={`carousel-item-${index}`} />
           );
         })}
       </Carousel>
       <div className="hero"></div>
       </div>
   );
}

export default CarouselImage;
