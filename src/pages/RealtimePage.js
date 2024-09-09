import React, { useEffect } from 'react';

const RealtimeListener = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const Pusher = require('pusher-js');
            Pusher.logToConsole = true; // Enable pusher logging for debugging
            console.log('Pusher key:', process.env.NEXT_PUBLIC_PUSHER_APP_KEY);

            const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
                cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
            });

            const channel = pusher.subscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL);
            channel.bind(process.env.NEXT_PUBLIC_PUSHER_EVENT, function(data) {
                console.log('Received Pusher event:', data);
            });

            // Cleanup function to unsubscribe and disconnect when the component unmounts
            return () => {
                channel.unbind_all();
                channel.unsubscribe();
                pusher.disconnect();
            };
        }
    }, []);

    return null;  
};

export default RealtimeListener;
