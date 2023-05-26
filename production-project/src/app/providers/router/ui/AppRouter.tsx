import { Suspense } from "react"

import { Route, Routes } from "react-router-dom"
import { routeCongig } from "shared/config/routeConfig/routeConfig"
import { PageLoader } from "widgets/PageLoader"

const AppRouter = () => (
    <Routes>
        {Object.values(routeCongig).map(({ element, path }) => (
            <Route
                path={path}
                key={path}
                element={(
                    <Suspense fallback={<PageLoader />}>
                        <div className="page-wrapper">{element}</div>
                    </Suspense>
                )}
            />
        ))}
    </Routes>
)

export default AppRouter
