import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store, persistedStore } from 'config/client'
import { useRouter } from 'next/router'
import { PersistGate } from 'redux-persist/integration/react'
import 'public/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'public/css/libraries/font-icon.css'
import { useEffect } from 'react'

const MyApp = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js')
    }, [])
    const router = useRouter()

    return (
        <Provider store={store}>
            <PersistGate persistor={persistedStore}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    )
}

export default MyApp
