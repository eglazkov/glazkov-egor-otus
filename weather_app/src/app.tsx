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

class App extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            cityName: '',
            cityNotFound: false,
            data: {},
            favorites: {}
        };

        this.getWeatherByCityName = this.getWeatherByCityName.bind(this);
        this.addToFav = this.addToFav.bind(this);
    }

    componentDidMount(): void {
        this.getWeatherByCityName('Moscow'); //default
    }

    getWeatherByCityName(name){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=1ddd872d319ebc1ceaa4fcec9d9cd620&units=metric`)
            .then((res) => res.json())
            .then(json => json.cod === 200 ? this.setState({data: json, cityNotFound: false}) :
                this.setState({data: {}, cityNotFound: true}));
    }

    addToFav(favItem, favorites, remove){
        const obj = {};
        obj[favItem.name+''] = {name: favItem.name};
        if(remove){
            delete favorites[favItem.name+''];
            this.setState({favorites: favorites});
        }else{
            this.setState({favorites: Object.assign(favorites, obj)});
        }
    }


    render(){
        const {cityNotFound, data, favorites} = this.state;
        return (
            <div style={{display: 'flex', justifyContent: 'flex-start', fontFamily: 'sans-serif'}}>
                <div>
                    <SearchBar cityNotFound={cityNotFound} getWeather={(cityName) => this.getWeatherByCityName(cityName)} />
                    <Results data={data} favorites={favorites} addToFav={(favItem, remove) => this.addToFav(favItem, favorites, remove)}/>
                </div>
                <FavList showFav={(cityName) => this.getWeatherByCityName(cityName)} favorites={Object.values(favorites)}/>
            </div>
        );
    };
}

export default App;