import React, { Component } from 'react'

interface IProps {
    data: any;
    addToFav: any;
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

    componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
        if(nextProps.data.name && this.props.data.name && this.props.data.name !== nextProps.data.name)
            this.setState({isFavorite: false});
    }

    render(){
        const {favorites}  = this.props;
        const data = this.props.data || {}, main =  data.main || {}, wind = data.wind || {},
        temp = main.temp || '', tempSignum = temp > 0 ? '+' :  '',
        windSpeed = wind.speed || '', humidity = main.humidity || '', pressure = main.pressure;
        const addToFav = this.props.addToFav;
        const isFavorite = data.name ? favorites[data.name] : this.state.isFavorite;
        return (
            <div style={{display: data.name ? '' : 'none', marginTop: '10px', width: '240px', height: '150px', border: '1px solid black'}}>
                <div style={{margin: '10px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2>{data.name}</h2>
                        <span onClick={() => {
                            this.setState({isFavorite: !isFavorite});
                            addToFav(data, !isFavorite === false);
                        }} style={{color: isFavorite ? 'orange' : 'gray', cursor: 'pointer', fontSize: '45px',float: 'right'}}>&#11088;</span>
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