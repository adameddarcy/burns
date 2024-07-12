import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VelocityChart from './VelocityChart';
import CfdChart from './CfdChart';
import ControlChart from './ControlChart';
import PieChart from "./PieChart";

const ChartsCarousel = ({ data }) => {
    const settings = {
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 2,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <div style={{maxWidth: "100vw", maxHeight: "50vh"}}>
            <h2>Project Charts</h2>
            <Slider {...settings} style={{maxWidth: "80vw"}}>
                <div>
                    <VelocityChart data={data} />
                </div>
                <div>
                    <CfdChart data={data} />
                </div>
                <div>
                    <ControlChart data={data} />
                </div>
                {/*<div>*/}
                {/*    <PieChart data={data}/>*/}
                {/*</div>*/}
            </Slider>
        </div>
    );
};

export default ChartsCarousel;
