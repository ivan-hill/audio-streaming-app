import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useStore } from '../redux/store';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const Pusher = require('pusher-js');
            Pusher.logToConsole = true;
            const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
                cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
            });

            const channel = pusher.subscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL);
            channel.bind(process.env.NEXT_PUBLIC_PUSHER_EVENT, function(data) {
                console.log('Received Pusher event:', data);
            });

            return () => pusher.unsubscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL);
        }
    }, []);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
