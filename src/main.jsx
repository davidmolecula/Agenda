import 'dotenv/config.js';
import { Buffer } from 'buffer';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
      <main>
        <App/>
      </main>
  </Provider>
)
