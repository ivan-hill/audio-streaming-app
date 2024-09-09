import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setAudioStream, toggleFilter } from '@/redux/actions/audioActions'; // Absolute path

const AudioStream = () => {
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const filterNodeRef = useRef(null);
  const localStreamRef = useRef(null);
  const socketRef = useRef(null);
  const { filterEnabled } = useSelector((state) => state.audio); // Redux state for filter
  const dispatch = useDispatch();

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:5000'); // Replace with your server URL

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
      if (socketRef.current) {
        socketRef.current.disconnect();
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
