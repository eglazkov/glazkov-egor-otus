import {FETCH_WEATHER_PENDING, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_ERROR} from './weatherActions';

const initialState = {
    pending: false,
    weather: {},
    error: null
}

export function weatherReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_WEATHER_PENDING: 
            return {
                ...state,
                pending: true,
                error: null
            }
        case FETCH_WEATHER_SUCCESS:            
        return {
                ...state,
                pending: false,
                weather: action.weather,
                error: null
            }
        case FETCH_WEATHER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
                weather: {}
            }
        default: 
            return state;
    }
}

export const getWeather = state => state.weather;
export const getWeatherPending = state => state.pending;
export const getWeatherError = state => state.error;