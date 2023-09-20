import './App.css'
import React from 'react'
import { useEffect } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Main from './components/Main/Main'
import SearchPage from './components/SearchPage/SearchPage'
import MainAuth from './components/MainAuth/MainAuth'
import MockPage from './components/MockPage/MockPage'
import SearchResult from './components/SearchResult/SearchResult'
import MobileMenu from './components/MobileMenu/MobileMenu'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetAuth } from './store/auth'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      const { expire } = JSON.parse(localStorage.getItem('auth'))
      const now = new Date().getTime()

      if (now > new Date(expire).getTime()) {
        dispatch(resetAuth())
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <Route exact path="/mock">
            <MockPage />
          </Route>

          <PrivateRouteAuthorized path="/auth">
            <MainAuth />
          </PrivateRouteAuthorized>

          <PrivateRoute path="/search">
            <SearchPage />
          </PrivateRoute>

          {/* <PrivateRoute path="/result">
            <SearchResult />
          </PrivateRoute> */}
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function PrivateRoute({ children, ...rest }) {
  const data = useSelector((state) => state.authSlice)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        data.accessToken ? children : <Redirect to="/auth" />
      }
    />
  )
}

function PrivateRouteAuthorized({ children, ...rest }) {
  const data = useSelector((state) => state.authSlice)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        data.accessToken ? <Redirect to="/" /> : children
      }
    />
  )
}

export default App
