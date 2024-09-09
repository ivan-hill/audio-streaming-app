import React from 'react';
import AudioControls from '@/components/AudioControls'; // Absolute path
import AudioStream from '@/components/AudioStream'; // Absolute path

const Home = () => {
  return (
    <div className="container">
      <h1>Audio Streaming Application</h1>
      <AudioControls />
      <AudioStream />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default Home;
