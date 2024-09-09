import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useStore } from '../redux/store';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState);

    
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
