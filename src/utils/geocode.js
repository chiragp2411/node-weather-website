import axios from 'axios';

export const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiY2hpcmFncGFuY2hhbCIsImEiOiJja3l5NXdudjUwaGcxMm9tdjB3ZG00aTF5In0.8Ti_3HRPjYRj0-vlXqCkPA&limit=1`;

  axios
    .get(url)
    .then(({ data: responseData }) => {
      // const responseData = response.data;
      if (responseData.features.length > 0) {
        const [longitude, latitude] = responseData.features[0].center;
        const location = responseData.features[0].place_name;
        callback(undefined, { longitude, latitude, location });
      } else {
        callback('Unable to find location. Try another search.');
      }
    })
    .catch((err) => {
      callback('Unable to connect to location service!');
    });
};
