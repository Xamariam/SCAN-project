import React from 'react'
import css from './MainAuth.module.css'

import characters from '../../images/characters.png'
import lock from '../../images/lock.png'
import g_auth from '../../images/google_auth.png'
import f_auth from '../../images/facebook_auth.png'
import y_auth from '../../images/yandex_auth.png'

import { login } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../store/auth'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function MainAuth() {
  let history = useHistory()

  const goMock = () => {
    history.push('/mock')
  }

  const dispatch = useDispatch()
  const data = useSelector((state) => state.authSlice)

  const [loginValue, setLoginValue] = useState('')
  const [loginError, setLoginError] = useState(false)

  const changeLogin = (e) => {
    e.preventDefault()
    setLoginValue(e.target.value)
  }

  const [passValue, setPassValue] = useState('')

  const changePass = (e) => {
    e.preventDefault()
    setPassValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoginError(false)

    login(loginValue, passValue)
      .then((res) => {
        dispatch(setAuth(res.data))
        localStorage.setItem('auth', JSON.stringify(res.data))
      })
      .catch((error) => {
        setLoginError(true)
      })
  }

  return (
    <div className={css.main_auth}>
      <div className={css.container}>
        <div className={css.caption_block}>
          <h1 className={css.heading}>
            Для оформления подписки <br></br> на тариф, необходимо
            авторизоваться.
          </h1>
          <img
            className={css.characters_img}
            src={characters}
            alt="Два человека и ключ"
          ></img>
        </div>
        <div className={css.form_container}>
          <div className={css.form_panel}>
            <div className={css.signup_change_block}>
              <button className={css.login_btn} disabled>
                Войти
              </button>
              <button className={css.signup_btn} onClick={goMock}>
                Зарегистрироваться
              </button>
            </div>

            <form className={css.form} onSubmit={handleSubmit}>
              <label className={css.label}>Логин или номер телефона:</label>
              <input
                className={css.form_input}
                type="text"
                onChange={changeLogin}
              ></input>
              <label className={css.label}>Пароль:</label>
              <input
                className={loginError ? css.form_input_error : css.form_input}
                type="password"
                onChange={changePass}
              ></input>
              {loginError && (
                <p className={css.error_text}>Неправильный пароль</p>
              )}
              <button
                className={css.main_btn}
                disabled={loginValue && passValue ? false : true}
              >
                Войти
              </button>
              <button className={css.restore_pass_btn} onClick={goMock}>
                Восстановить пароль
              </button>
              <div className={css.alt_auth}>
                <label className={css.label}>Войти через:</label>
                <div className={css.auth_services}>
                  <img
                    className={css.alt_auth_img}
                    src={g_auth}
                    alt="google"
                    onClick={goMock}
                  ></img>
                  <img
                    className={css.alt_auth_img}
                    src={f_auth}
                    alt="facebook"
                    onClick={goMock}
                  ></img>
                  <img
                    className={css.alt_auth_img}
                    src={y_auth}
                    alt="yandex"
                    onClick={goMock}
                  ></img>
                </div>
              </div>
            </form>
          </div>
          <img className={css.lock_img} src={lock} alt=""></img>
        </div>
      </div>
      <img
        className={css.characters_img_mobile}
        src={characters}
        alt="Два человека и ключ"
      ></img>
    </div>
  )
}
