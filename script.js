const link =
  'http://api.weatherstack.com/current?access_key=72345cd8bc12063e370444f5a2d3c074';

const root = document.getElementById('root');

let store = {
  city: 'Dnepropetrovsk',
  feelslike: 0,
  temperature: 0,
  observationTime: '00:00 AM',
  isDay: 'yes',
  description: '',
  properties: {
    cloudcover: 0,
    humidity: 0,
    windSpeed: 0,
    pressure: 0,
    uvIndex: 0,
    visibility: 0,
  },
};

const fetchData = async () => {
  const result = await fetch(`${link}&query=${store.city}`);
  const data = await result.json();
  console.log('data', data);

  const {
    current: {
      feelslike,
      cloudcover,
      temperature,
      observation_time: observationTime,
      pressure,
      humidity,
      uv_index: uvIndex,
      visibility,
      is_day: isDay,
      wind_speed: windSpeed,
      weather_descriptions: description,
    },
  } = data;

  store = {
    ...store,
    feelslike,
    temperature,
    observationTime,
    isDay,
    description: description[0],
    properties: {
      cloudcover: `${cloudcover}%`,
      humidity: `${humidity}%`,
      windSpeed: `${windSpeed}km/h`,
      pressure: `${pressure}%`,
      uvIndex: `${uvIndex}/ 100`,
      visibility: `${visibility}/ 100`,
    },
  };
  renderComponent();
};

const getImage = (description) => {
  const value = description.toLowerCase();
  switch (value) {
    case 'partly cloudy':
      return 'partly.png';
    case 'cloudy':
      return 'cloud.png';
    case 'fog':
      return 'fog.png';
    case 'sunny':
      return 'sunny.png';
    case 'clear':
      return 'clear.png';
    default:
      return 'the.png';
  }
};

const renderProperty = (properties) => {
  console.log('properties', properties);
  return `<div class="property">
            <div class="property-icon">
              <img src="./img/icons/" alt="">
            </div>
            <div class="property-info">
              <div class="property-info__value"></div>
              <div class="property-info__description"></div>
            </div>
          </div>`;
};

const markup = () => {
  const { city, description, observationTime, temperature, isDay, properties } = store;

  const containerClass = isDay === 'yes' ? 'is-day' : '';

  return `<div class="container ${containerClass}">
            <div class="top">

              <div class="city">
                <div class="city-subtitle">погода сегодня</div>
                  <div class="city-title" id="city">
                  <span>${city}</span>
                  </div>
              </div>

              <div class="city-info">
                <div class="top-left">
                <img class="icon" src="./img/${getImage(description)}" alt="" />
                <div class="description">${description}</div>
              </div>
            
              <div class="top-right">
                <div class="city-info__subtitle">по состоянию на ${observationTime}</div>
                <div class="city-info__title">${temperature}°</div>
              </div>

            </div>
          </div>
          <div id="properties${renderProperty(properties)}<div>
        </div>`;
};

const renderComponent = () => {
  root.innerHTML = markup();
};

fetchData();
