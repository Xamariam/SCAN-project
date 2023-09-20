import React from 'react'
import css from './Footer.module.css'
import logo from '../../images/footer_logo.png'

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <img className={css.logo} src={logo} alt="Скан"></img>
        <div className={css.contacts}>
          <p className={css.contact_p}>г. Москва, Цветной б-р, 40</p>
          <p className={css.contact_p}>+7 495 771 21 11</p>
          <p className={css.contact_p}>info@skan.ru</p>
          <p className={css.copyright_p}>Copyright. 2023</p>
        </div>
      </div>
    </footer>
  )
}
