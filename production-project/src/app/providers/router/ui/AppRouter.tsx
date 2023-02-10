import { AboutPage } from 'pages/AboutPage'
import { MainPage } from 'pages/MainPage'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeCongig } from 'shared/routeConfig/routeConfig'

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {Object.values(routeCongig).map(({ element, path }) => (
          <Route element={element} path={path} key={path} />
        ))}
      </Routes>
    </Suspense>
  )
}

export default AppRouter
