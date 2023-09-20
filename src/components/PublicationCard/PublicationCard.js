import React, { useRef } from 'react'
import css from '../SearchResult/SearchResult.module.css'
import mockimage from '../../images/mockdoc.png'

export default function PublicationCard({ item }) {
  const regex = /&lt;.+?&gt;|(<([^>]+)>)/gi
  const result = item.ok.content.markup.replace(regex, '')
  const result1 = result.replace(/^\/|\/$/g, '')

  const textSize = (str, count) =>
    str.length > count ? str.slice(0, count) + '...' : str

  const maximumText = textSize(result1, 550)
  const maximumTitle = textSize(item.ok.title.text, 100)

  return (
    <div className={css.doc_block} id={item.ok.id}>
      <div className={css.doc_toptitles}>
        <p className={css.doc_date}>
          {new Date(item.ok.issueDate).toLocaleDateString()}
        </p>
        <a className={css.unset_a} href={item.ok.url} target="_blank">
          <p className={css.doc_source}>{item.ok.source.name}</p>
        </a>
      </div>
      <div className={css.doc_content}>
        <h4 className={css.doc_title}>{maximumTitle}</h4>
        <div className={css.category_div}>
          {item.ok.attributes.isTechNews && (
            <p className={css.doc_category}>Технические новости</p>
          )}
          {item.ok.attributes.isAnnouncement && (
            <p className={css.doc_category}>Анонсы и события</p>
          )}
          {item.ok.attributes.isDigest && (
            <p className={css.doc_category}>Сводки новостей</p>
          )}
        </div>
        <img src={mockimage} className={css.doc_img} alt=""></img>
        <p className={css.doc_text}>{maximumText}</p>
      </div>
      <div className={css.doc_lowerpart}>
        <a className={css.unset_a} href={item.ok.url} target="_blank">
          <button className={css.doc_readbtn}>Читать в источнике</button>
        </a>
        <p className={css.doc_words}>{item.ok.attributes.wordCount} слов</p>
      </div>
    </div>
  )
}
