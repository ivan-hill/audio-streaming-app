import React, { useEffect } from 'react';
import Pusher from 'pusher-js';

const PusherClient = ({ channelName, eventName, onEvent }) => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Pusher
            const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
                cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
                encrypted: true
            });

            // Subscribe to the specified channel
            const channel = pusher.subscribe(channelName);

            // Bind to the specified event
            channel.bind(eventName, data => {
                console.log('Received Pusher event:', data);
                onEvent(data); // Handle event via prop function
            });

            // Cleanup on unmount
            return () => {
                channel.unbind(eventName);
                pusher.unsubscribe(channelName);
            };
        }
    }, [channelName, eventName, onEvent]); // Reinitialize if these props change

    return null; 
};

export default PusherClient;
