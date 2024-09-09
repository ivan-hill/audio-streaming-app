# audio-streaming-app
Next.js app with real-time audio streaming and manipulation using Express, Redux, and Pusher

File structure

audio-stream-app/
├── .env
├── package.json
├── next.config.js
├── public/
│   └── ... (static files like images)
├── server/
│   └── index.js        Express server setup
├── src/
│   ├── components/
│   │   ├── AudioControls.js   UI for controlling audio input/output and filter
│   │   └── AudioStream.js     Component for rendering the audio stream
│   ├── pages/
│   │   ├── _app.js           Custom App component for Next.js
│   │   └── index.js          Main page of the application
│   ├── redux/
│   │   ├── actions/
│   │   │   └── audioActions.js   Actions for audio manipulation
│   │   ├── reducers/
│   │   │   └── audioReducer.js   Reducers for audio state
│   │   └── store.js           Redux store configuration
│   ├── styles/
│   │   └── globals.css        Global CSS styles
│   └── utils/
│       └── audioUtils.js       Utility functions for audio processing
└── .gitignore


 File Details

- .env: Store your environment variables here.
  
- package.json: Manage your project dependencies and scripts.

- next.config.js: Next.js configuration file.

- public/: Place your static assets like images and fonts here.

- server/index.js: Set up your Express server and WebSocket communication.

- src/components/: 
  - AudioControls.js: Provides UI elements for controlling audio input/output and the filter. Handles user interactions.
  - AudioStream.js: Handles the actual streaming of audio and its manipulation.

- src/pages/:
  - _app.js: Custom App component where you can wrap your application with Redux Provider.
  - index.js: Main page where you set up the layout and include `AudioControls` and `AudioStream`.

- src/redux/:
  - actions/audioActions.js: Define actions related to audio settings and filter toggling.
  - reducers/audioReducer.js: Manage the Redux state related to audio settings and filters.
  - store.js: Configure and create your Redux store.

- src/styles/globals.css: Global CSS styles for your application.

- src/utils/audioUtils.js: Utility functions for audio processing, such as creating audio contexts and managing filters.

- .gitignore: Excludes files and directories from being tracked by Git, such as `node_modules/` and `.env`.

Step-by-Step Instructions

1. Create Next.js Project
   ```bash
   npx create-next-app@latest audio-stream-app
   cd audio-stream-app
   ```

2. Install Dependencies
   ```bash
   npm install redux react-redux redux-thunk socket.io-client pusher-js cors
   npm install express
   ```

3. Set Up Redux Store
   - Create `src/redux/store.js`
   - Create `src/redux/actions/audioActions.js`
   - Create `src/redux/reducers/audioReducer.js`
   - Combine reducers in `src/redux/reducers/index.js`
   - Update `src/pages/_app.js` to include Redux Provider

4. Create Express Server
   - Create `server/index.js`
   - Set up Express and WebSocket server
   - Use `cors` middleware

5. Create Audio Manipulation Components
   - Create `src/components/AudioControls.js`
   - Create `src/components/AudioStream.js`

6. Implement Audio Streaming
   - In `src/components/AudioStream.js`, use WebRTC and WebSockets to capture and stream audio

7. Add Audio Manipulation
   - In `src/components/AudioStream.js`, use Web Audio API for frequency and gain filters

8. Toggle Filter with Animation
   - Add filter toggle functionality in `src/components/AudioControls.js`
   - Implement CSS animations in `src/styles/globals.css`

9. Configure Environment Variables
   - Create `.env` file in the root directory
   - Add necessary environment variables

10. Handle CORS
    - Add CORS middleware in `server/index.js`

11. Run and Test Application
    - Start Express server: `node server/index.js`
    - Run Next.js app: `npm run dev`
    - Test audio streaming and manipulation features

