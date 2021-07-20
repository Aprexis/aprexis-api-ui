import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import App from './components/app'
import { history, valueHelper } from './helpers'
import reportWebVitals from './reportWebVitals';
import './styles/styles.scss'

import 'core-js/es/map'
import 'core-js/es/set'

const BASE_NAME = valueHelper.isStringValue(process.env.REACT_APP_APREXIS_API) ? process.env.REACT_APP_APREXIS_API : "/"

ReactDOM.render((
  <BrowserRouter history={history} basename={BASE_NAME}>
    <LastLocationProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </LastLocationProvider>
  </BrowserRouter>
),
  document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
