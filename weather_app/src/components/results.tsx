import React, { Component } from 'react'

interface IProps {
    data: any;
    addToFavorites: any;
    removeFromFavorites: any;
    favorites: any;
}

interface IState {
    isFavorite: boolean;
}

class Results extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            isFavorite: false
        };
    }

    nvl(val, def){
        return val || def;
    }

    render(){
        const {favorites}  = this.props;
        const {data = {}} = this.props;
        const  main =  this.nvl(data.main, {});
        const wind = this.nvl(data.wind, {});
        const temp = this.nvl(main.temp, '');
        const tempSignum = temp > 0 ? '+' :  '';
        const windSpeed = this.nvl(wind.speed, '');
        const humidity = this.nvl(main.humidity, '');
        const pressure = this.nvl(main.pressure, '');
        const addToFavorites = this.props.addToFavorites;
        const removeFromFavorites = this.props.removeFromFavorites;
        const isFavorite = data.name ? favorites[data.name] : this.state.isFavorite;
        return (
            <div style={{display: data.name ? '' : 'none', marginTop: '10px', width: '240px', height: 'auto', border: '1px solid black'}}>
                <div style={{margin: '10px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2>{data.name}</h2>
                        <span onClick={() => {
                            this.setState({isFavorite: !isFavorite});
                            !isFavorite === false ? removeFromFavorites(data, favorites) : addToFavorites(data, favorites);                           
                            
                        }} style={{cursor: 'pointer', fontSize: '45px',float: 'right'}}>{!isFavorite === false ? '✭' : '☆'}</span>
                    </div>
                    <span style={{ fontSize: '25px'}}>{`${tempSignum} ${temp}`}&deg;</span>
                    <div style={{width: '210px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                        <span>&#128168;{` ${windSpeed} m/s`}</span>
                        <span>&#x1F4A7;{` ${humidity}%`}</span>
                        <span>{` ${pressure} hpa`}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Results;