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
import { history } from './helpers'
import reportWebVitals from './reportWebVitals';
import './styles/styles.scss'

import 'core-js/es/map'
import 'core-js/es/set'

ReactDOM.render((
  <BrowserRouter history={history}>
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
