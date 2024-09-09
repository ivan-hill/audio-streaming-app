import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const AudioVisualizer = ({ audioContext, stream }) => {
  const canvasRef = useRef(null);
  const [audioData, setAudioData] = useState(null);
  const [geometry, setGeometry] = useState(null);
  
  useEffect(() => {
    if (!audioContext || !stream) return;
    
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Set up audio analyser
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Set up geometry
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(bufferLength * 3); // x, y, z for each vertex

    // Initialize vertices to default values
    for (let i = 0; i < bufferLength; i++) {
      vertices[i * 3] = i; // x position
      vertices[i * 3 + 1] = 0; // y position
      vertices[i * 3 + 2] = 0; // z position
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    setGeometry(geometry);
    
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    
    camera.position.z = 100;

    const animate = () => {
      requestAnimationFrame(animate);
      analyser.getByteFrequencyData(dataArray);
      if (audioData) {
        gsap.to(geometry.attributes.position.array, {
          duration: 0.1,
          y: (index) => audioData[index] || Math.sin(index * 0.1),
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        });
        geometry.attributes.position.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };
    
    animate();
    
    return () => {
      if (renderer) renderer.dispose();
      if (geometry) geometry.dispose();
    };
  }, [audioContext, stream, audioData]);

  useEffect(() => {
    if (!audioContext || !stream) return;

    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const updateAudioData = () => {
      analyser.getByteFrequencyData(dataArray);
      setAudioData(dataArray);
      requestAnimationFrame(updateAudioData);
    };
    
    updateAudioData();
  }, [audioContext, stream]);

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default AudioVisualizer;
