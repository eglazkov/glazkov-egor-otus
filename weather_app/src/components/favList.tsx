import React, { Component } from 'react'

interface IProps {
    favorites: any;
    showFav: any;
}

interface IState {}

class FavList extends Component<IProps, IState> {

    render(){
        const {favorites, showFav} = this.props;
        return (
            <div style={{marginLeft: '50px'}}>
                <h3 style={{margin: 0}}>Favorites</h3>
                <ul style={{padding: 0}}>
                    {favorites && favorites.map((item, index) => {
                        return <li style={{cursor: 'pointer', listStyleType: 'none', padding: '5px 0'}} key={index} onClick={() => showFav(item.name)}>{item.name}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default FavList;