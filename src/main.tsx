import './globals.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'
import { AddTodoProvider } from './contexts/ListTodoContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AddTodoProvider>
      <App />
    </AddTodoProvider>
  </React.StrictMode>,
)
