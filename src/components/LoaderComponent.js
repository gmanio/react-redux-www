import React, {Component} from 'react';
import loader from '../styles/loader.css';

class LoaderComponent extends Component {
    render() {
        let name = "GmanPark";
        let txt = "Loading react app";

        return (
            <div className="body_loader">
                <div className="loading">
                    <span className="txt">{name}</span>
                </div>
                <div className="loading_status">{txt}</div>
            </div>
        )
    }
}

export default LoaderComponent;