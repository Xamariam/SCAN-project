import React from 'react'

import css from './MainPrice.module.css'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import lamp from '../../../images/lamp.png'
import shot from '../../../images/shot.png'
import notebook from '../../../images/notebook.png'

export default function MainPrice() {
  const data = useSelector((state) => state.authSlice)

  let history = useHistory()

  const goMock = () => {
    history.push('/mock')
  }

  return (
    <div className={css.main_price}>
      <h2 className={css.price_heading}>наши тарифы</h2>
      <div className={css.price_cards}>
        <div
          className={
            data.accessToken ? css.beginner_card_auth : css.beginner_card_base
          }
        >
          <div className={css.beginner_header}>
            <div className={css.card_header_text}>
              <h3 className={css.card_h3}>Beginner</h3>
              <p className={css.card_p}>Для небольшого исследования</p>
            </div>
            <img src={lamp} className={css.price_icon} alt=""></img>
          </div>
          {data.accessToken && (
            <p className={css.current_tariff}>Текущий тариф</p>
          )}
          <div className={css.h3_prices}>
            <h3 className={css.price}>799 ₽</h3>
            <h3 className={css.old_price}>1 200 ₽</h3>
          </div>
          <p className={css.credit_price}>
            или 150 ₽/мес. при рассрочке на 24 мес.
          </p>

          <h4 className={css.price_ul_h4}>В тариф входит:</h4>
          <ul className={css.price_ul}>
            <li className={css.price_li}>Безлимитная история запросов</li>
            <li className={css.price_li}>Безопасная сделка</li>
            <li className={css.price_li}>Поддержка 24/7</li>
          </ul>
          {data.accessToken ? (
            <button className={css.to_profile_btn} onClick={goMock}>
              Перейти в личный кабинет
            </button>
          ) : (
            <button className={css.more_info_btn} onClick={goMock}>
              Подробнее
            </button>
          )}
        </div>

        <div className={css.pro_card}>
          <div className={css.pro_header}>
            <div className={css.card_header_text}>
              <h3 className={css.card_h3}>Pro</h3>
              <p className={css.card_p}>Для HR и фрилансеров</p>
            </div>

            <img src={shot} className={css.price_icon_shot} alt=""></img>
          </div>
          <div className={css.h3_prices}>
            <h3 className={css.price}>1 299 ₽</h3>
            <h3 className={css.old_price}>2 600 ₽</h3>
          </div>
          <p className={css.credit_price}>
            или 279 ₽/мес. при рассрочке на 24 мес.
          </p>

          <h4 className={css.price_ul_h4}>В тариф входит:</h4>
          <ul className={css.price_ul}>
            <li className={css.price_li}>Все пункты тарифа Beginner</li>
            <li className={css.price_li}>Экспорт истории</li>
            <li className={css.price_li}>Рекомендации по приоритетам</li>
          </ul>

          <button className={css.more_info_btn} onClick={goMock}>
            Подробнее
          </button>
        </div>

        <div className={css.business_card}>
          <div className={css.business_header}>
            <div className={css.card_header_text}>
              <h3 className={css.card_h3}>Business</h3>
              <p className={css.card_p}>Для корпоративных клиентов</p>
            </div>

            <img src={notebook} className={css.price_icon} alt=""></img>
          </div>
          <div className={css.h3_prices}>
            <h3 className={css.price}>2 379 ₽</h3>
            <h3 className={css.old_price}>3 700 ₽</h3>
          </div>
          <p className={css.credit_price_empty}> </p>

          <h4 className={css.price_ul_h4}>В тариф входит:</h4>
          <ul className={css.price_ul}>
            <li className={css.price_li}>Все пункты тарифа Pro</li>
            <li className={css.price_li}>Безлимитное количество запросов</li>
            <li className={css.price_li}>Приоритетная поддержка</li>
          </ul>

          <button className={css.more_info_btn} onClick={goMock}>
            Подробнее
          </button>
        </div>
      </div>
    </div>
  )
}
