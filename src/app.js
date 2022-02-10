import express from 'express';
import { fileURLToPath } from 'url';
import * as path from 'path';
import hbs from 'hbs';
import { geoCode } from './utils/geocode.js';
import { forecast } from './utils/forecast.js';

const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Route setup
app.get('/', (req, res) => {
  res.render('index', { title: 'Weather', name: 'Chirag' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me', name: 'Chirag' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Chirag',
    helpText: 'This is some helpful text.',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  return res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Chirag',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Chirag',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
