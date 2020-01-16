import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchWeather from './fetchWeather';
import {getWeatherError, getWeather, getWeatherPending} from './weatherReducer';

import SearchBar from './components/searchBar';
import Results from "./components/results";
import FavList from './components/favList';
import PendingSpinner from './components/pendingSpinner';

interface IProps {
    fetchWeather: any;
    weather: any;
    error: any;
    pending: any;
}
interface IState {
    cityName: string;        
    favorites: any;
}

//HOC const getWeatherByCityName = (name) => {
    //fetchWeather(name);
//};

// HOC const appWithWeatherData = Weather => class App extends Component<IProps, IState> {
class App extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            cityName: '',            
            favorites: {}
        };

        this.getWeatherByCityName = this.getWeatherByCityName.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
    }

    componentDidMount(): void {        
        this.getWeatherByCityName('Moscow');        
    }

    getWeatherByCityName(name){        
        this.props.fetchWeather(name);
    }
    
    addToFavorites(favItem, favorites){
        const obj = {};
        obj[String(favItem.name)] = {name: favItem.name};
        this.setState({favorites: Object.assign(favorites, obj)});
    }

    removeFromFavorites(favItem, favorites){
        const obj = {};
        obj[String(favItem.name)] = {name: favItem.name};
        delete favorites[String(favItem.name)];
        this.setState({favorites: favorites});
    }


    render(){
        const {favorites} = this.state;         
        const {error, weather, pending} = this.props;        
        return (
            <div style={{display: 'flex', justifyContent: 'flex-start', fontFamily: 'sans-serif'}}>
                <div>
                    <SearchBar errorMsg={!pending && error} getWeather={(cityName) => this.getWeatherByCityName(cityName)} />                    
                    {pending ? <PendingSpinner /> : <Results data={weather} favorites={favorites} addToFavorites={this.addToFavorites} removeFromFavorites={this.removeFromFavorites}/>}
                </div>
                <FavList showFav={(cityName) => this.getWeatherByCityName(cityName)} favorites={Object.values(favorites)}/>
            </div>
        );
    };
}

const mapStateToProps = state => ({
    error: getWeatherError(state),
    weather: getWeather(state),
    pending: getWeatherPending(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchWeather: fetchWeather
}, dispatch)

//HOC const App = appWithWeatherData(getWeatherByCityName);
export default connect(mapStateToProps, mapDispatchToProps)(App);