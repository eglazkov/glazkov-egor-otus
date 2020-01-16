import React, {Component} from 'react'
import styled, {keyframes} from "styled-components";

interface IProps {}
interface IState {}

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    `;
const CmpDiv = styled.div`{
    height: 48px;
    width: 48px;
    color: #5a5a5a;
    position: relative;
    display: inline-block;
    border: 5px solid;
    border-radius: 50%;
    border-top-color: transparent;
    animation: ${spin} 1s linear infinite;
    margin: 25px 55px;
}`

class PendingSpinner extends Component<IProps, IState> {
    
    render(){        
        return (
            <CmpDiv />
        );
    }
}

export default PendingSpinner;