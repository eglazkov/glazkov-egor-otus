import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import PendingSpinner from './pendingSpinner';
import Results from './results';
import ResultRow from './resultRow';

interface IProps {    
    errorMsg: any;
    citiesRef: any;
    favorites: any;
    addToFavorites: any;
    removeFromFavorites: any;    
}
interface IState {
    cityName: string;
    filteredCities: any;
}

class WeatherByCity extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            cityName: '',
            filteredCities: JSON.parse(localStorage.getItem("filteredCities") || '[]')
        };

        this.searchCityListByQuery = this.searchCityListByQuery.bind(this);        
    }    

    searchCityListByQuery (queryStr) {
        let filteredCities = [];
        if(queryStr){
            filteredCities = this.props.citiesRef.filter((item) => item.name.toLowerCase().indexOf(queryStr.toLowerCase()) >= 0);
        }        
        this.setState({filteredCities: filteredCities});        
        localStorage.setItem("filteredCities", JSON.stringify(filteredCities));
    }

    render(){
        const {cityName} = this.state;        
        let {filteredCities} = this.state;
        filteredCities.sort((a, b) => {            
            return a.name < b.name ? -1 : (a.name > b.name) ? 1 : 0;
        });
        const {favorites, errorMsg, addToFavorites, removeFromFavorites} = this.props;
        return (
            <div>
                <input type="text" onChange={(e) => this.setState({cityName: e.target.value})} />
                <button style={{marginLeft: '10px'}} onClick={() => this.searchCityListByQuery(cityName)}>Search</button>
                {errorMsg ? <span style={{display: 'block', margin: '10px 50px'}}>{errorMsg}</span> : null}
                {filteredCities.map((item) => <ResultRow key={item.id} dataRow={item} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites}/>)}
            </div>
        );
    }
}

export default WeatherByCity;