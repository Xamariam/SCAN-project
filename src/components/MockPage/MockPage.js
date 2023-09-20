import React from 'react'
import css from './MockPage.module.css'
import { useHistory } from 'react-router-dom'

export default function MockPage() {
  let history = useHistory()
  const goMain = () => {
    history.push('/')
  }
  return (
    <div className={css.mock_page}>
      <h2 className={css.mock_h2}>В ТЗ этой страницы не было :&rang;</h2>
      <button className={css.return_btn} onClick={goMain}>
        Вернуться на главную
      </button>
    </div>
  )
}
