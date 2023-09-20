import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import css from './SearchResult.module.css'
import searching from '../../images/searching.png'
import SliderCarousel from './SliderCarousel'
import PublicationCard from '../PublicationCard/PublicationCard'
import { takeDocs } from '../../api'

export default function SearchResult({ summary, publications }) {
  const [publicationData, setPublicationData] = useState('')
  const [offset, setOffset] = useState(10)

  useEffect(() => {
    if (publications) {
      const ids = publications.items.map((i) => i.encodedId)

      takeDocs(ids)
        .then((res) => {
          setPublicationData(res)
        })
        .catch((error) => console.log(error))
    }
  }, [publications])

  const getSum = () => {
    if (!summary || !summary.length) return null

    return summary[0].data.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.value
    }, 0)
  }

  const showMorePublications = () => {
    setOffset((oldState) => oldState + 10)
  }

  return (
    <div className={css.search_result}>
      <div className={css.banner}>
        <div className={css.banner_text}>
          <h2 className={css.banner_heading}>
            Ищем. Скоро <br></br> будут результаты
          </h2>
          <h4 className={css.banner_subtitle}>
            Поиск может занять некоторое время,<br></br> просим сохранять
            терпение.
          </h4>
        </div>
        <img className={css.searching_img} src={searching} alt=""></img>
      </div>
      <div className={css.general_slider}>
        <h2 className={css.slider_heading}>Общая сводка</h2>
        <p className={css.publication_qty}>Найдено {getSum()} вариантов</p>
        <SliderCarousel data={summary} />
      </div>
      {publicationData && (
        <div className={css.docs_list}>
          <h2 className={css.docs_heading}>Список документов</h2>
          <div className={css.docs_grid}>
            {publicationData &&
              publicationData
                .slice(0, offset)
                .map((item) => (
                  <PublicationCard item={item} key={item.ok.id} />
                ))}
          </div>
          {offset < publicationData.length && (
            <button onClick={showMorePublications} className={css.docs_morebtn}>
              Показать больше
            </button>
          )}
        </div>
      )}
    </div>
  )
}
