const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
require('dotenv').config();

//const vote = require('./routes/vote');

const app = express();
const port = process.env.PORT || 4000;
// Inicialización de clase pusher
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: "us2",
      useTLS: true
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Configuración de CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
// Servidor escuchando en puerto
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
app.use(cookieParser())

//app.use('/api/v1/vote', vote);

app.post('/api/v1/vote', (req, res) => {
  const { body } = req; 
  const { vaccine } = body; // Destructuración de vaccine de body
  console.log(vaccine);
  pusher.trigger('covid-api', 'vote', {
    vaccine,
  });
  res.json({ vaccine });
});

module.exports = app;
