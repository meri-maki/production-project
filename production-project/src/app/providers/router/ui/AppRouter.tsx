import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeCongig } from 'shared/config/routeConfig/routeConfig'

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {Object.values(routeCongig).map(({ element, path }) => (
          <Route
            element={<div className="page-wrapper">{element}</div>}
            path={path}
            key={path}
          />
        ))}
      </Routes>
    </Suspense>
  )
}

export default AppRouter
