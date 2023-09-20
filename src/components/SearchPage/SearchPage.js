import React, { useRef, useState, useEffect } from 'react'
import css from './SearchPage.module.css'
import search from '../../images/search_image.png'
import minisearch from '../../images/search_mini.png'
import doc from '../../images/docs.png'
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setResponse } from '../../store/search'

import validateInn from './validation'
import { sendHistograms, takeDocsId, takeDocs } from '../../api'
import SearchResult from '../SearchResult/SearchResult'

export default function SearchPage() {
  const history = useHistory()
  const [innError, setInnError] = useState('') //текст ошибки в инпуте ИНН
  const [qtyError, setQtyError] = useState('') //текст ошибки в инпуте количества
  const [innValue, setInnValue] = useState('')
  const [qtyValue, setQtyValue] = useState('')
  const [tonalityValue, setTonalityValue] = useState('any')

  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [dateError, setDateError] = useState('')

  const [maxFull, setMaxFull] = useState(false)
  const [business, setBusiness] = useState(null)
  const [mainRole, setMainRole] = useState(false)
  const [withRisk, setWithRisk] = useState(false)
  const [excludeTech, setExcludeTech] = useState(true)
  const [excludeAnnounce, setExcludeAnnounce] = useState(true)
  const [excludeDigests, setExcludeDigests] = useState(true)

  // const [isLoading, setLoading] = useState(false)
  const [summary, setSummary] = useState(null)
  const [publications, setPublications] = useState(null)
  const [isSubmit, setSubmit] = useState(false)

  const dispatch = useDispatch()
  const data = useSelector((state) => state.searchSlice)

  useEffect(() => {
    if (dateStart && dateEnd) {
      checkDate(dateStart, dateEnd)
    }
  }, [dateStart, dateEnd])

  const checkDate = (start, end) => {
    const secondsStart = new Date(start).getTime()
    const secondsEnd = new Date(end).getTime()
    const now = new Date().getTime()

    if (secondsStart > secondsEnd) {
      setDateError('Дата начала не может быть позже даты конца')
    } else if (secondsStart > now || secondsEnd > now) {
      setDateError('Дата не может быть в будущем времени')
    } else setDateError('')
  }

  const inputRefDate = useRef(null)

  const onChangeTonality = (e) => {
    if (e.target.value === 'Негативная') {
      setTonalityValue('negative')
    } else if (e.target.value === 'Позитивная') {
      setTonalityValue('positive')
    } else setTonalityValue('any')
  }

  const onChangeInn = (e) => {
    setInnValue(e.target.value)

    const validationResponse = validateInn(e.target.value, {})
    setInnError(!validationResponse.result ? validationResponse.message : '')
  }

  const onChangeQty = (e) => {
    const qtyInput = e.target.value
    setQtyValue(qtyInput)
    checkQty(qtyInput)
  }

  const checkQty = (value) => {
    if (!value) {
      setQtyError('Обязательное поле')
    } else if (!Number.isInteger(Number(value))) {
      setQtyError('Введите целое число')
    } else if (value < 1) {
      setQtyError('Введите не менее 1')
    } else if (value > 1000) {
      setQtyError('Введите не более 1000')
    } else setQtyError('')
  }
  //
  const onChangeMaxFull = (e) => {
    setMaxFull(!maxFull)
  }
  const onChangeBusiness = (e) => {
    maxFull === null ? setBusiness(true) : setBusiness(null)
  }

  const onChangeMainRole = (e) => {
    setMainRole(!mainRole)
  }
  const onChangeWithRisk = (e) => {
    setWithRisk(!withRisk)
  }
  const onChangeExcludeTech = (e) => {
    setExcludeTech(!excludeTech)
  }
  const onChangeExcludeAnnounce = (e) => {
    setExcludeAnnounce(!excludeAnnounce)
  }
  const onChangeExcludeDigests = (e) => {
    setExcludeDigests(!excludeDigests)
  }

  //
  const submit = (e) => {
    e.preventDefault()
    setSubmit(true)
    // setLoading(true)

    sendHistograms(
      {
        startDate: new Date(dateStart),
        endDate: new Date(dateEnd),
      },
      innValue,
      tonalityValue,
      qtyValue,
      maxFull,
      business,
      mainRole,
      withRisk,
      excludeTech,
      excludeAnnounce,
      excludeDigests
    )
      .then((res) => {
        setSummary(res.data)
      })
      .catch((e) => console.log(e))
    // .finally(() => setLoading(false))

    takeDocsId(
      {
        startDate: new Date(dateStart),
        endDate: new Date(dateEnd),
      },
      innValue,
      tonalityValue,
      qtyValue,
      maxFull,
      business,
      mainRole,
      withRisk,
      excludeTech,
      excludeAnnounce,
      excludeDigests
    )
      .then((res) => {
        setPublications(res)
      })
      .catch((e) => console.log(e))
  }

  const isDisabled =
    dateStart &&
    dateEnd &&
    innValue &&
    qtyValue &&
    !innError &&
    !qtyError & !dateError

  return (
    <>
      {isSubmit ? (
        <SearchResult
          summary={summary}
          publications={publications}
          // isLoading={isLoading}
        />
      ) : (
        <div className={css.search_page}>
          <div className={css.form_wrapper}>
            <img className={css.doc_img} src={doc} alt=""></img>
            <h2 className={css.form_heading}>
              Найдите необходимые данные в пару кликов.
            </h2>
            <h4 className={css.form_subtitle}>
              Задайте параметры поиска. <br></br> Чем больше заполните, тем
              точнее поиск
            </h4>
            <form className={css.search_form} onSubmit={submit}>
              <div className={css.form_left}>
                <label className={css.form_label}>
                  ИНН компании *<br></br>
                  <input
                    className={innError ? css.form_input_err : css.form_input}
                    placeholder="10 цифр"
                    maxLength="10"
                    onChange={onChangeInn}
                  ></input>
                  {innError && <p className={css.input_warning}>{innError}</p>}
                </label>
                <br></br>

                <label className={css.form_label}>
                  Тональность<br></br>
                  <select
                    className={css.form_select}
                    onChange={onChangeTonality}
                  >
                    <option>Любая</option>
                    <option>Позитивная</option>
                    <option>Негативная</option>
                  </select>
                </label>
                <br></br>

                <label className={css.form_label}>
                  Количество документов в выдаче *<br></br>
                  <input
                    type="number"
                    className={qtyError ? css.form_input_err : css.form_input}
                    placeholder="от 1 до 1000"
                    min={0}
                    max={1000}
                    onChange={onChangeQty}
                  ></input>
                  {qtyError && <p className={css.input_warning}>{qtyError}</p>}
                </label>
                <br></br>

                <label className={css.form_label}>
                  Диапазон поиска *<br></br>
                  <label className={css.search_range_inputs}>
                    <input
                      value={dateStart}
                      type="date"
                      className={
                        dateError ? css.date_input_err : css.date_input
                      }
                      placeholder="Дата начала"
                      max={new Date().toLocaleDateString('en-ca')}
                      onChange={(e) => {
                        setDateStart(e.target.value)
                        inputRefDate.current.focus()
                      }}
                    ></input>
                    <input
                      ref={inputRefDate}
                      value={dateEnd}
                      type="date"
                      className={
                        dateError ? css.date_input_err : css.date_input
                      }
                      placeholder="Дата конца"
                      max={new Date().toLocaleDateString('en-ca')}
                      onChange={(e) => {
                        setDateEnd(e.target.value)
                        checkDate(dateStart, dateEnd)
                        console.log(dateError)
                      }}
                    ></input>
                  </label>
                  {dateError && (
                    <p className={css.input_date_warning}>{dateError}</p>
                  )}
                </label>
                <br></br>
              </div>
              <div className={css.form_right}>
                <input
                  className={css.form_checkbox}
                  type="checkbox"
                  id="checkmaxp"
                  onChange={onChangeMaxFull}
                ></input>
                <label htmlFor="checkmaxp" className={css.checkbox_label}>
                  Признак максимальной полноты
                </label>
                <br></br>
                <input
                  className={css.form_checkbox}
                  type="checkbox"
                  id="checkbusiness"
                  onChange={onChangeBusiness}
                ></input>
                <label htmlFor="checkbusiness" className={css.checkbox_label}>
                  Упоминания в бизнес-контексте
                </label>
                <br></br>
                <input
                  className={css.form_checkbox}
                  type="checkbox"
                  id="checkrole"
                  onChange={onChangeMainRole}
                ></input>
                <label htmlFor="checkrole" className={css.checkbox_label}>
                  Главная роль в публикации
                </label>
                <br></br>
                <input
                  className={css.form_checkbox}
                  type="checkbox"
                  id="checkrisk"
                  onChange={onChangeWithRisk}
                ></input>
                <label htmlFor="checkrisk" className={css.checkbox_label}>
                  Публикации только c риск-факторами
                </label>
                <br></br>
                <input
                  className={css.form_checkbox}
                  type="checkbox"
                  id="checktech"
                  onChange={onChangeExcludeTech}
                ></input>
                <label htmlFor="checktech" className={css.checkbox_label}>
                  Включать технические новости рынков
                </label>
                <br></br>
                <input
                  className={css.form_checkbox}
                  type="checkbox"
                  id="checkcalendar"
                  onChange={onChangeExcludeAnnounce}
                ></input>
                <label htmlFor="checkcalendar" className={css.checkbox_label}>
                  Включать анонсы и календари
                </label>
                <br></br>
                <input
                  className={css.form_checkbox}
                  type="checkbox"
                  id="checknews"
                  onChange={onChangeExcludeDigests}
                ></input>
                <label htmlFor="checknews" className={css.checkbox_label}>
                  Включать сводки новостей
                </label>
                <br></br>
                <button
                  className={!isDisabled ? css.search_btn_off : css.search_btn}
                  disabled={!isDisabled}
                  type="submit"
                >
                  Поиск
                </button>
                <p className={css.footnote}>* Обязательные к заполнению поля</p>
              </div>
            </form>
          </div>
          <img className={css.search_img} src={search} alt=""></img>
          <img className={css.search_mini} src={minisearch} alt=""></img>
        </div>
      )}
    </>
  )
}
