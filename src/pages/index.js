import React, { useState, useEffect, useRef } from 'react';
import AudioControls from '@/components/AudioControls';
import AudioStream from '@/components/AudioStream';
import AudioVisualizer from '@/components/AudioVisualizer';

const Home = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [stream, setStream] = useState(null);
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const setupAudio = async () => {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = context;
      setAudioContext(context);

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = mediaStream;
        setStream(mediaStream);
        context.createMediaStreamSource(mediaStream);
      } catch (error) {
        console.error('Error accessing audio stream:', error);
      }
    };

    setupAudio();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Audio Streaming Application</h1>
      </header>

      <main className="main">
        <section className="hero">
          <h2>Welcome to the Future of Audio Streaming</h2>
          <p>Experience real-time audio streaming and control with our cutting-edge technology.</p>
        </section>

        <section className="features">
          <h3>Features</h3>
          <ul>
            <li>Real-time audio streaming</li>
            <li>Dynamic audio control</li>
            <li>High-quality sound</li>
          </ul>
        </section>

        <section className="demo">
          <AudioControls />
          <AudioStream />
        </section>

        <section className="visualization">
          {audioContext && stream && <AudioVisualizer audioContext={audioContext} stream={stream} />}
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 Audio Stream App. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
        }
        .header, .main, .footer {
          width: 100%;
          text-align: center;
        }
        .hero {
          margin: 20px 0;
        }
        .features ul {
          list-style: none;
          padding: 0;
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        .features li {
          background: #f0f0f0;
          padding: 10px;
          border-radius: 5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .demo, .visualization {
          margin: 20px 0;
          width: 100%;
        }
        .footer {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default Home;
