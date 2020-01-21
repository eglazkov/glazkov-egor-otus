import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    favorites: any;    
}

interface IState {}

class FavList extends Component<IProps, IState> {

    render(){        
        let {favorites} = this.props;        
        favorites = favorites.sort((a, b) => {            
            return a.name < b.name ? -1 : (a.name > b.name) ? 1 : 0;
        });
        return (
            <div style={{marginLeft: '50px'}}>
                <h3 style={{margin: 0}}>Favorites</h3>
                <ul style={{padding: 0}}>
                    {favorites && favorites.map((item, index) => {
                        return( 
                        <Link to={`/city/${item.id}`} key={item.id} style={{marginTop: '15px', color: 'inherit', textDecoration: 'none'}}>                
                            <li style={{cursor: 'pointer', listStyleType: 'none', padding: '5px 0'}} key={index}>{`${item.country}, ${item.name}`}</li>
                        </Link>);
                    })}
                </ul>
            </div>
        );
    }
}

export default FavList;