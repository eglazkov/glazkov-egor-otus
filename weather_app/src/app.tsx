import React, { Component } from 'react';

import SearchBar from './components/searchBar';
import Results from "./components/results";
import FavList from './components/favList';

interface IProps {}
interface IState {
    cityName: string;
    cityNotFound: boolean;
    data: any;
    favorites: any;
}

const getWeatherByCityName = (name) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=1ddd872d319ebc1ceaa4fcec9d9cd620&units=metric`)
        .then((res) => res.json());        
};

const appWithWeatherData = Weather => class App extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            cityName: '',
            cityNotFound: false,
            data: {},
            favorites: {}
        };

        this.getWeatherStateUpdate = this.getWeatherStateUpdate.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
    }

    componentDidMount(): void {        
        Weather('Moscow').then(json => json.cod === 200 ? this.setState({data: json, cityNotFound: false}) :
        this.setState({data: {}, cityNotFound: true}));        
    }

    getWeatherStateUpdate(name){
        Weather(name).then(json => json.cod === 200 ? this.setState({data: json, cityNotFound: false}) :
        this.setState({data: {}, cityNotFound: true}))
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
        const {cityNotFound, data, favorites} = this.state;
        return (
            <div style={{display: 'flex', justifyContent: 'flex-start', fontFamily: 'sans-serif'}}>
                <div>
                    <SearchBar cityNotFound={cityNotFound} getWeather={(cityName) => this.getWeatherStateUpdate(cityName)} />
                    <Results data={data} favorites={favorites} addToFavorites={this.addToFavorites} removeFromFavorites={this.removeFromFavorites}/>
                </div>
                <FavList showFav={(cityName) => this.getWeatherStateUpdate(cityName)} favorites={Object.values(favorites)}/>
            </div>
        );
    };
}

const App = appWithWeatherData(getWeatherByCityName);
export default App;