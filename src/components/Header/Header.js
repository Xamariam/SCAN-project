import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetAuth } from '../../store/auth'
import { getLimits } from '../../api'
import { useState } from 'react'
import MobileMenu from '../MobileMenu/MobileMenu'

import logo from '../../images/header_logo.png'
import slash from '../../images/header_slash.png'
import userpic from '../../images/userpic.png'
import mobmenu from '../../images/mobmenu.png'

import { useHistory } from 'react-router-dom'

import css from './Header.module.css'

export default function Header() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.authSlice)
  const history = useHistory()
  const [isOpened, setIsOpened] = useState(false)

  const [counters, setCounters] = useState({ user: 0, limit: 0 })

  const goMain = () => {
    history.push('/')
    setIsOpened(false)
  }

  const exit = () => {
    dispatch(resetAuth())
    setIsOpened(false)
  }

  const goAuth = () => {
    history.push('/auth')
    setIsOpened(false)
  }

  const goMock = () => {
    history.push('/mock')
    setIsOpened(false)
  }

  useEffect(() => {
    if (data.accessToken) {
      getLimits()
        .then((res) => {
          const { usedCompanyCount, companyLimit } = res.eventFiltersInfo || {}

          setCounters({
            user: usedCompanyCount,
            limit: companyLimit,
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [data.accessToken])

  return (
    <header className={css.header}>
      <div className={css.container}>
        <img className={css.logo} src={logo} alt="Скан"></img>
        <nav className={css.nav}>
          <p className={css.nav_p} onClick={goMain}>
            Главная
          </p>
          <p className={css.nav_p} onClick={goMock}>
            Тарифы
          </p>
          <p className={css.nav_p} onClick={goMock}>
            FAQ
          </p>
        </nav>

        {(data.accessToken && (
          <div className={css.user_panel_on}>
            <div className={css.user_stats}>
              <div className={css.companies_used}>
                <p className={css.cu_text}>Использовано компаний </p>
                <p className={css.cu_counter}>{counters.user}</p>
              </div>
              <div className={css.companies_limit}>
                <p className={css.cl_text}>Лимит по компаниям</p>
                <p className={css.cl_counter}>{counters.limit}</p>
              </div>
            </div>
            <div className={css.user_profile}>
              <div className={css.user_profile_text}>
                <p className={css.user_name} onClick={goMock}>
                  {' '}
                  Егор Ц.
                </p>
                <p className={css.logout_text} onClick={exit}>
                  Выйти
                </p>
              </div>
              <img
                className={css.user_pic}
                src={userpic}
                alt=""
                onClick={goMock}
              ></img>
            </div>
          </div>
        )) || (
          <div className={css.user_panel_off}>
            <button className={css.signup} onClick={goMock}>
              Зарегистрироваться
            </button>
            <img className={css.slash} src={slash} alt="/"></img>
            <button className={css.login} onClick={goAuth}>
              Войти
            </button>
          </div>
        )}
        <img
          src={mobmenu}
          className={css.mobile_menu}
          alt=""
          onClick={() => {
            setIsOpened((old) => !old)
          }}
        />
      </div>
      <MobileMenu
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        goMain={goMain}
        goMock={goMock}
        goAuth={goAuth}
        exit={exit}
        data={data}
      />
    </header>
  )
}
