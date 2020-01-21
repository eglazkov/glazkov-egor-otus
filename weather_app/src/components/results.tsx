import React, { Component } from 'react'

interface IProps {
    data: any;            
}

interface IState {    
}

class Results extends Component<IProps, IState> {
    
    nvl(val, def){
        return val || def;
    }

    render(){                                        
        const {data = {}} = this.props;
        const dt_txt = data.dt_txt;
        const  main =  this.nvl(data.main, {});
        const wind = this.nvl(data.wind, {});
        const temp = this.nvl(main.temp, '');
        const tempSignum = temp > 0 ? '+' :  '';
        const windSpeed = this.nvl(wind.speed, '');
        const humidity = this.nvl(main.humidity, '');
        const pressure = this.nvl(main.pressure, '');                        
        return (
            <div style={{display: data.name ? '' : 'none', marginTop: '10px', width: '240px', height: 'auto', border: '1px solid black'}}>
                <div style={{margin: '10px'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <h2>{data.name}</h2>                                                
                    </div>
                    <span style={{ fontSize: '25px'}}>{`${tempSignum} ${temp}`}&deg;</span>                    
                    <span style={{marginLeft: '10px'}}>{`${new Date(dt_txt).toString()}`}</span>
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