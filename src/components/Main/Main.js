import React from 'react'
import { useSelector } from 'react-redux'

import MainBanner from './MainBanner/MainBanner'
import MainAdvantages from './MainAdvantages/MainAdvantages'
import MainPrice from './MainPrice/MainPrice'

export default function Main() {
  const data = useSelector((state) => state.authSlice)

  return (
    <div>
      {
        <>
          <MainBanner />
          <MainAdvantages />
          <MainPrice />
        </>
      }
    </div>
  )
}
