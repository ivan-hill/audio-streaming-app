const express = require('express');
const Pusher = require('pusher');

const app = express();
const port = process.env.PORT || 5000;

// Body parser middleware to handle JSON payloads
app.use(express.json());

// Initialize Pusher with your app credentials
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

// Example endpoint to trigger an event
app.post('/pusher/trigger', (req, res) => {
  const { channel, event, data } = req.body;
  pusher.trigger(channel, event, data)
    .then(() => res.send({ message: "Event triggered" }))
    .catch(e => res.status(500).send({ error: e.message }));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
