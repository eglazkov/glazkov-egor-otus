import React, { Component } from 'react';
const citiesRef = require('./static/city.list.json');

import WeatherByCity from './components/weatherByCity';
import Results from "./components/results";
import FavList from './components/favList';
import PendingSpinner from './components/pendingSpinner';

interface IProps {    
    
}
interface IState {    
    favorites: any;
}

class App extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {            
            favorites: JSON.parse(localStorage.getItem("favorites") || '{}')
        };
        
        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
    }    
    
    addToFavorites(favItem, favorites){
        const obj = {};
        obj[String(favItem.id)] = {name: favItem.name, id: favItem.id, country: favItem.country};
        favorites = Object.assign(favorites, obj);
        this.setState({favorites: favorites});
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    removeFromFavorites(favItem, favorites){
        const obj = {};
        obj[String(favItem.id)] = {name: favItem.name, id: favItem.id, country: favItem.country};
        delete favorites[String(favItem.id)];
        this.setState({favorites: favorites});
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }


    render(){
        const {favorites} = this.state;         
        const {error, weather, pending} = this.props;        
        return (
            <div style={{display: 'flex', justifyContent: 'flex-start', fontFamily: 'sans-serif'}}>
                <div>
                    <WeatherByCity
                        citiesRef={citiesRef}
                        errorMsg={!pending && error}                        
                        favorites={favorites}
                        addToFavorites={this.addToFavorites}
                        removeFromFavorites={this.removeFromFavorites} />                                        
                    {pending ? <PendingSpinner /> : null}
                </div>
                <FavList favorites={Object.values(favorites)}/>
            </div>
        );
    };
}


export default App;