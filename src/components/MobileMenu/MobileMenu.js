import React from 'react'
import { useState } from 'react'
import css from './MobileMenu.module.css'

import logo from '../../images/footer_logo.png'
import cancel from '../../images/cancel.png'

export default function MobileMenu({
  isOpened,
  setIsOpened,
  goMain,
  goMock,
  goAuth,
  exit,
  data,
}) {
  const cancelMenu = () => {
    setIsOpened(false)
  }

  return (
    <div className={isOpened ? css.mobile_menu_on : css.mobile_menu_off}>
      <div className={css.header}>
        <img className={css.logo} src={logo} alt=""></img>
        <img
          className={css.cancel}
          src={cancel}
          alt="cancel"
          onClick={cancelMenu}
        ></img>
      </div>
      <ul className={css.nav}>
        <li className={css.li} onClick={goMain}>
          Главная
        </li>
        <li className={css.li} onClick={goMock}>
          Тарифы
        </li>
        <li className={css.li} onClick={goMock}>
          FAQ
        </li>
      </ul>

      <div className={css.auth_buttons}>
        {data.accessToken ? (
          <>
            <button className={css.signup} onClick={goMock}>
              Егор Ц.
            </button>
            <button className={css.login} onClick={exit}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <button className={css.signup} onClick={goMock}>
              Зарегистрироваться
            </button>
            <button className={css.login} onClick={goAuth}>
              Войти
            </button>
          </>
        )}
      </div>
    </div>
  )
}
