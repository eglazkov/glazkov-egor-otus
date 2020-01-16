export const FETCH_WEATHER_PENDING = 'FETCH_WEATHER_PENDING';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR';

export function fetchWeatherPending() {    
    return {
        type: FETCH_WEATHER_PENDING
    }
}

export function fetchWeatherSuccess(weather) {    
    return {
        type: FETCH_WEATHER_SUCCESS,
        weather: weather
    }
}

export function fetchWeatherError(error) {
    return {
        type: FETCH_WEATHER_ERROR,
        error: error
    }
}