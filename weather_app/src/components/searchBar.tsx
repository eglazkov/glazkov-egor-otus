import React, { Component } from 'react'

interface IProps {
    getWeather: any;
    errorMsg: any;
}
interface IState {
    cityName: string;
}

class SearchBar extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            cityName: ''
        };
    }

    render(){
        const {cityName} = this.state;
        const {getWeather, errorMsg} = this.props;
        return (
            <div>
                <input type="text" onChange={(e) => this.setState({cityName: e.target.value})} />
                <button style={{marginLeft: '10px'}} onClick={() => getWeather(cityName)}>Search</button>
                {errorMsg ? <span style={{display: 'block', margin: '10px 50px'}}>{errorMsg}</span> : null}
            </div>
        );
    }
}

export default SearchBar;