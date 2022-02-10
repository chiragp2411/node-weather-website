import axios from 'axios';

export const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/forecast?access_key=e789c7d0327f4d428afb49614a5560ef&query=${latitude},${longitude}&units=f`;

  axios
    .get(url, { responseType: 'json' })
    .then(({ data: responseData }) => {
      // const responseData = response.data;
      if ('error' in responseData) {
        callback('Unable to find current location.');
      } else {
        const current = responseData.current;
        callback(
          undefined,
          `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`
        );
      }
    })
    .catch((err) => {
      callback('Unable to connect to weather service!');
    });
};
