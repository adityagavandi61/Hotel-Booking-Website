import React from 'react'
import Navbar from './components/navbar'
import Header from './components/homecomponents/header'
import Account from './components/homecomponents/account'
import Notification from './components/homecomponents/menu/notification'

function about() {
  return (
    <>
    <Navbar />
    <Header/>
    <Notification/>
    <Account/>
    </>
  )
}

export default about
