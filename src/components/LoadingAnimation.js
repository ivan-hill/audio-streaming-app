import React, { useEffect } from 'react';
import gsap from 'gsap';

const LoadingAnimation = () => {
  useEffect(() => {
    gsap.to('.circle', {
      duration: 1,
      rotation: 360,
      repeat: -1,
      ease: 'linear',
    });

    gsap.to('.circle', {
      duration: 1,
      scaleX: 1.5,
      scaleY: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <div className="loading-container">
      <div className="circle"></div>
      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
        }

        .circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #0070f3;
          margin: 20px;
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
