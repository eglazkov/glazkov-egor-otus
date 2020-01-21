import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchWeather from '../fetchWeather';
import {getWeatherError, getWeather, getWeatherPending} from '../weatherReducer';

import Results from './results';
import PendingSpinner from './pendingSpinner';

interface IProps {        
    fetchWeather: any;
    weather: any;
    error: any;
    pending: any;    
}
interface IState {
    
}

const ShowWeatherByUrl = ({pending, error, weather = {list: []}, fetchWeather}: IProps) => {
    let { id } = useParams();        
    useEffect(() => {
        fetchWeather(id);
        return () => {
            weather = {list: []};
        }
    }, []);    
    return <div style={{display: 'block'}}>
        {pending ? <PendingSpinner /> : 
        weather.list && weather.list.map((item) => <Results key={item.dt} data={Object.assign(item, weather.city)} />)}
        {error ? <span style={{display: 'block', margin: '10px 30px'}}>{error}</span> : null}
        </div>;
};

const mapStateToProps = state => ({
    error: getWeatherError(state),
    weather: getWeather(state),
    pending: getWeatherPending(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchWeather: fetchWeather
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ShowWeatherByUrl);