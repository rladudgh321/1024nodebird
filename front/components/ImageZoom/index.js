import React, {useState} from 'react';
import { Overlay, Title, Xbox, SlickWrapper, Indicator } from './style';


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const ImageZoom = ({onClose, images}) => {
    const [ slide, setSlide ] = useState(1);
  return (
    <Overlay>
        <Title>
            <h2>상세 이미지</h2>
            <Xbox onClick={onClose} />
        </Title>
        <SlickWrapper>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={(e) => (
                // console.log('slide change', e)
                setSlide(e.activeIndex+1)
                )
            }
              onSwiper={(swiper) =>
                console.log("swiper", swiper)         
            }
            >
              { images.map((v)=> (<SwiperSlide key={v.src} >
                {
                    <img src={v.src} style={{ maxHeight:'750px' }} />
                }
                
                </SwiperSlide>) ) }
            </Swiper>
        </SlickWrapper>
        <Indicator>
            { slide }
            { '/'}
            { images.length }
        </Indicator>
    </Overlay>
  );
};

export default ImageZoom;