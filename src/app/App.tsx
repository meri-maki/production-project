/* eslint-disable i18next/no-literal-string */
import { Suspense, useState } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import { useTheme } from "app/providers/ThemeProvider"
import { AppRouter } from "app/providers/router"
import { Navbar } from "widgets/Navbar"
import { Sidebar } from "widgets/Sidebar"
import "./styles/index.scss"
import { PageLoader } from "widgets/PageLoader"
import { Modal } from "shared/ui/Modal/Modal"

const App = () => {
    const { theme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={classNames("app", {}, [theme])}>
            <Suspense fallback={<PageLoader />}>
                {/* suspense for translations */}
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <button onClick={() => setIsOpen(true)} type="button">
                        toggle
                    </button>

                    <AppRouter />
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                </div>
            </Suspense>
        </div>
    )
}

export default App
