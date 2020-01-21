import {fetchWeatherPending, fetchWeatherSuccess, fetchWeatherError} from './weatherActions';

function fetchWeather(cityName) {    
    return dispatch => {
        dispatch(fetchWeatherPending());
        fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityName}&cnt=7&APPID=1ddd872d319ebc1ceaa4fcec9d9cd620&units=metric`)
        .then(res => res.json())
        .then(res => {            
            if(String(res.cod) !== '200') {
                throw(res.message);
            }
            dispatch(fetchWeatherSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchWeatherError(error));
        })
    }
}

export default fetchWeather;