import '@/styles/tailwind.css'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import Amplify from 'aws-amplify'
import awsConfig from '../../aws-config'

Amplify.configure({
    Auth: awsConfig.Auth,
})

const App = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default App
