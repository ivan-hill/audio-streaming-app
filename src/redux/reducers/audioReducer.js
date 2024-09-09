import { SET_AUDIO_STREAM, TOGGLE_AUDIO_FILTER } from '../actions/audioActions';

const initialState = {
    stream: null,
    filterEnabled: false
};

const audioReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUDIO_STREAM:
            return {
                ...state,
                stream: action.payload
            };
        case TOGGLE_AUDIO_FILTER:
            return {
                ...state,
                filterEnabled: !state.filterEnabled
            };
        default:
            return state;
    }
};

export default audioReducer;
