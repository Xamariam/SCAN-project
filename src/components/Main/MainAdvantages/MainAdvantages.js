import React, { useRef } from 'react'
import css from './MainAdvantages.module.css'

import image from '../../../images/advantages_image.png'
import leftarrow from '../../../images/arrowleft.png'
import rightarrow from '../../../images/arrowright.png'
import timer from '../../../images/timer.png'
import search from '../../../images/search.png'
import shield from '../../../images/shield.png'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function MainAdvantages() {
  const slider = useRef(null)
  const settings = {
    dots: false,
    slidesToShow: 3,
    arrows: false,
    autoplay: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div className={css.main_advantages}>
      <h2 className={css.advantages_heading}> Почему именно мы</h2>

      <div className={css.slider}>
        <img
          onClick={() => slider.current.slickPrev()}
          src={leftarrow}
          className={css.arrow}
          alt="left"
        ></img>
        <div className={css.slider_wrapper}>
          <div className={css.slider_cards}>
            <Slider ref={slider} {...settings}>
              <div className={css.slide_wrapper}>
                <div className={css.slider_card}>
                  <img className={css.card_icon} src={timer} alt=""></img>
                  <p className={css.card_p}>
                    Высокая и оперативная скорость обработки заявки
                  </p>
                </div>
              </div>

              <div className={css.slide_wrapper}>
                <div className={css.slider_card}>
                  <img className={css.card_icon} src={search} alt=""></img>
                  <p className={css.card_p}>
                    Огромная комплексная база данных, обеспечивающая объективный
                    ответ на запрос
                  </p>
                </div>
              </div>

              <div className={css.slide_wrapper}>
                <div className={css.slider_card}>
                  <img className={css.card_icon} src={shield} alt=""></img>
                  <p className={css.card_p}>
                    Защита конфеденциальных сведений, не подлежащих разглашению
                    по федеральному законодательству
                  </p>
                </div>
              </div>

              <div className={css.slide_wrapper}>
                <div className={css.slider_card}>
                  <img className={css.card_icon} src={timer} alt=""></img>
                  <p className={css.card_p}>
                    Высокая и оперативная скорость обработки заявки
                  </p>
                </div>
              </div>

              <div className={css.slide_wrapper}>
                <div className={css.slider_card}>
                  <img className={css.card_icon} src={search} alt=""></img>
                  <p className={css.card_p}>
                    Огромная комплексная база данных, обеспечивающая объективный
                    ответ на запрос
                  </p>
                </div>
              </div>

              <div className={css.slide_wrapper}>
                <div className={css.slider_card}>
                  <img className={css.card_icon} src={shield} alt=""></img>
                  <p className={css.card_p}>
                    Защита конфеденциальных сведений, не подлежащих разглашению
                    по федеральному законодательству
                  </p>
                </div>
              </div>
            </Slider>
          </div>
        </div>

        <img
          onClick={() => slider.current.slickNext()}
          src={rightarrow}
          className={css.arrow}
          alt="right"
        ></img>
      </div>
      <img className={css.advantages_image} src={image} alt=""></img>
    </div>
  )
}
