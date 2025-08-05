import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'react-app-polyfill/ie11.js'
import 'react-app-polyfill/stable.js'
import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'
import { Router } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import App from './components/app.js'
import { history } from './helpers/index.js'
import reportWebVitals from './reportWebVitals.js';
import './styles/styles.scss'

import 'core-js/es/map'
import 'core-js/es/set'

import 'bootstrap'

const root = createRoot(document.getElementById('root'))
root.render((
  <Router history={history}>
    <LastLocationProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </LastLocationProvider>
  </Router>
))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
