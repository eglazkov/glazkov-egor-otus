import React, { Component } from 'react'
import { Link } from 'react-router-dom';


interface IProps {
    dataRow: any;
    favorites: any;
    addToFavorites: any;
    removeFromFavorites: any;
}

interface IState {
    isFavoriteRow: boolean;    
}

class ResultRow extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            isFavoriteRow: JSON.parse(localStorage.getItem("favorites") || '{}')[props.dataRow.id+'']
        };        
    }    

    render(){        
        const {isFavoriteRow} = this.state;
        const {dataRow, favorites, addToFavorites, removeFromFavorites} = this.props;
        return (
            <div style={{display: 'block'}}>
                <div style={{display: 'inline'}}>
                    <Link to={`/city/${dataRow.id}`} key={dataRow.id} style={{marginTop: '15px', color: 'inherit', textDecoration: 'none'}}>                
                        {`${dataRow.country}, ${dataRow.name}`}
                    </Link>                
                    <span onClick={() => {
                        this.setState({isFavoriteRow: !isFavoriteRow});
                        !isFavoriteRow === false ? removeFromFavorites(dataRow, favorites) : addToFavorites(dataRow, favorites);                                                       
                    }} style={{cursor: 'pointer', fontSize: '24px', marginLeft: '5px'}}>{!isFavoriteRow === false ? '✭' : '☆'}</span>
                </div>
            </div>                            
        );
    }
}

export default ResultRow;