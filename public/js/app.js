const weatherForm = document.querySelector('form#weather-form');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

if (weatherForm) {
  const search = document.querySelector('input#search-input');
  weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    if (location.trim().length > 0) {
      fetch('/weather?address=' + location)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            messageOne.textContent = data.error;
          } else {
            const { address, forecast, location } = data;
            messageOne.textContent = location;
            messageTwo.textContent = forecast;
          }
          weatherForm.reset();
        })
        .catch((error) => {
          messageOne.textContent = error.message;
          weatherForm.reset();
        });
    } else {
      messageOne.textContent = 'Please enter the location address!';
    }
  });
}
