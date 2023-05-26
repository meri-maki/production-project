/* eslint-disable no-console */
import React, { ErrorInfo, ReactNode, Suspense } from "react"
import { Error } from "widgets/Error"

/* import { withTranslation } from 'react-i18next'; */

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

// error boundary catches errors without full tree crashing
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps | Readonly<ErrorBoundaryProps>) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
        console.log(error, errorInfo)
    }

    render() {
        const { hasError } = this.state
        const { children } = this.props
        if (hasError) {
            // You can render any custom fallback UI

            return <Suspense fallback=""><Error /></Suspense>
        }

        return children
    }
}

/* export default withTranslation()(ErrorBoundary) можно использовать таким образом, чтобы испольщовать переводы */

export default ErrorBoundary
