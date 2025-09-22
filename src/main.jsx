import 'dotenv/config.js';
import { Buffer } from 'buffer';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
window.Buffer = Buffer;
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.jsx"
import { AppSidebar } from "@/components/app-sidebar.jsx"


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <SidebarProvider >
      <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
    <App/>
    </SidebarProvider>
  </Provider>
)
