// Function to create and return a new Audio Context
export const createAudioContext = () => {
    if (typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      return new AudioContext();
    }
    return null;
  };
  
  // Function to set up a gain node
  export const createGainNode = (audioContext, initialValue = 0.75) => {
    const gainNode = audioContext.createGain();
    gainNode.gain.value = initialValue; // Set the initial gain value
    return gainNode;
  };
  
  // Function to set up a frequency filter
  export const createFrequencyFilter = (audioContext, type = 'lowpass', frequency = 200) => {
    const filterNode = audioContext.createBiquadFilter();
    filterNode.type = type;
    filterNode.frequency.value = frequency; // Set the cutoff frequency
    return filterNode;
  };
  
  // Function to connect audio nodes in a chain
  export const connectAudioNodes = (source, ...nodes) => {
    let previousNode = source;
    nodes.forEach(node => {
      previousNode.connect(node);
      previousNode = node;
    });
    previousNode.connect(source.context.destination); // Connect the final node to the destination
    return nodes;
  };
  
  