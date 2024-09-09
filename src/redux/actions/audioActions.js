// Action types
export const SET_AUDIO_STREAM = 'SET_AUDIO_STREAM';
export const TOGGLE_AUDIO_FILTER = 'TOGGLE_AUDIO_FILTER';

// Action creator for setting the audio stream
export const setAudioStream = (stream) => ({
    type: SET_AUDIO_STREAM,
    payload: stream
});

// Action creator for toggling the audio filter
export const toggleFilter = () => ({
    type: TOGGLE_AUDIO_FILTER
});
