/* eslint-disable i18next/no-literal-string */
import { Suspense, useState } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import { useTheme } from "app/providers/ThemeProvider"
import { AppRouter } from "app/providers/router"
import { Navbar } from "widgets/Navbar"
import { Sidebar } from "widgets/Sidebar"
import { PageLoader } from "widgets/PageLoader"

const App = () => {
    const { theme } = useTheme()

    return (
        <div className={classNames("app", {}, [theme])}>
            <Suspense fallback={<PageLoader />}>
                {/* suspense for translations */}
                <Navbar />
                <div className="content-page">
                    <Sidebar />

                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )
}

export default App
