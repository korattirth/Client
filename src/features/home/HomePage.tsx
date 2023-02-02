import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import Slider from 'react-slick';


const HomePage = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  var img1 = '../../images/hero1.jpg'
  var img2 = '../../images/hero2.jpg'
  var img3 = '../../images/hero3.jpg'
  return (
    <>
    <Slider {...settings}>
      <div>
        <img src={img1} style={{display : 'block',width : '100%',maxHeight : 500}} />
      </div>
      <div>
        <img src={img2} style={{display : 'block',width : '100%',maxHeight : 500}} />
      </div>
      <div>
        <img src={img3} style={{display : 'block',width : '100%',maxHeight : 500}} />
      </div>
    </Slider>
    <Box display='flex' justifyContent='center' sx = {{ p: 4}}></Box>
    <Typography variant = 'h1'>
      Welcome to the shop!
    </Typography>
    </>
  )
}

export default HomePage