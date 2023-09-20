import React, { useRef, useMemo } from 'react'
import css from './SearchResult.module.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import load from '../../images/spinner.png'
import leftarrow from '../../images/arrowleft.png'
import rightarrow from '../../images/arrowright.png'

export default function SliderCarousel({ data }) {
  const slider = useRef(null)

  const combinedData = useMemo(() => {
    if (!data && !data?.length) return []
    const [totalDocuments, riskFactors] = data

    const risks = JSON.parse(
      JSON.stringify(riskFactors.data).replaceAll('"value"', '"risksValue"')
    )
    risks.forEach((item) => delete item.date)

    return totalDocuments.data.map((item, index) => ({
      ...item,
      ...risks[index],
    }))
  }, [data])

  const settings = useMemo(() => {
    if (!data && !data?.length) return {}
    const [totalDocuments, riskFactors] = data

    return {
      dots: false,
      arrows: false,
      slidesToShow:
        totalDocuments.data.length > 8 ? 8 : totalDocuments.data.length,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1090,
          settings: {
            slidesToShow:
              totalDocuments.data.length > 6 ? 6 : totalDocuments.data.length,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
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
  }, [data])

  return (
    <div className={css.slider_carousel}>
      <img
        onClick={() => slider.current.slickPrev()}
        src={leftarrow}
        className={css.arrow}
        alt="left"
      ></img>
      <div className={css.slider_inside}>
        <div className={css.carousel_start}>
          <p className={css.carousel_p}>Период</p>
          <p className={css.carousel_p}>Всего</p>
          <p className={css.carousel_p}>Риски</p>
        </div>
        {!data ? (
          <div className={css.loader}>
            <img className={css.loader_img} src={load} alt=""></img>
            <p className={css.loader_text}>Загружаем данные</p>
          </div>
        ) : (
          <div className={css.slider_cards}>
            <Slider ref={slider} {...settings}>
              {combinedData.map((item) => (
                <div key={item.date + item.value} className={css.slide_wrapper}>
                  <div className={css.slider_card}>
                    <p className={css.card_p}>
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                    <p className={css.card_p}>{item.value}</p>
                    <p className={css.card_p}>{item.risksValue}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>

      <img
        onClick={() => slider.current.slickNext()}
        src={rightarrow}
        className={css.arrow}
        alt="right"
      ></img>
    </div>
  )
}
