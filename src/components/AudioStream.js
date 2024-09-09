import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pusher from 'pusher-js';
import { setAudioStream, toggleFilter } from '@/redux/actions/audioActions'; // Absolute path

const AudioStream = () => {
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const filterNodeRef = useRef(null);
  const localStreamRef = useRef(null);
  const dispatch = useDispatch();
  const { filterEnabled } = useSelector((state) => state.audio); // Redux state for filter

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PUSHER_APP_KEY) {
      console.error('Pusher app key is missing');
      return;
    }

    // Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      encrypted: true, // Use TLS
    });

    // Subscribe to the channel
    const channel = pusher.subscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL);

    // Bind to an event
    channel.bind(process.env.NEXT_PUBLIC_PUSHER_EVENT, function(data) {
      console.log('Received Pusher event:', data);
      
    });

    // Start the audio stream
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaStreamSource(stream);
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.75;
        const filterNode = audioContext.createBiquadFilter();
        filterNode.type = 'lowpass';
        filterNode.frequency.value = 200;

        gainNodeRef.current = gainNode;
        filterNodeRef.current = filterNode;

        source.connect(gainNode).connect(filterNode).connect(audioContext.destination);

        dispatch(setAudioStream(stream));
      })
      .catch((err) => {
        console.error('Error accessing microphone:', err);
      });

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (pusher) {
        pusher.unsubscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL);
      }
    };
  }, [dispatch]);

  return (
    <div className="audio-stream">
      <h2>Live Audio Stream</h2>
      <button onClick={() => dispatch(toggleFilter())}>
        {filterEnabled ? 'Disable Filter' : 'Enable Filter'}
      </button>
    </div>
  );
};

export default AudioStream;
