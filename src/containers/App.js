import React, {Component} from 'react';
import reset from '../styles/reset.css';
import axios from 'axios';

import LoaderComponent from '../components/LoaderComponent'

export default class App extends Component {
    state = {
        showLoader: true,
    }

    constructor() {
        super();

        let geo_options = {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        };

        let wpid = navigator.geolocation.watchPosition(this.geo_success, this.geo_error, geo_options);
    }

    geo_success(position) {
        axios.post('http://gman.io:3000/gps', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            useragent: navigator.userAgent
        }).then(response => {
            console.log("success");
        }).catch(error => {
            console.log(error)
        });
    }

    geo_error() {
        alert("위치 정보를 사용할 수 없습니다.");
    }

    componentDidMount() {
        window.addEventListener('click', ()=> {
            this.setState({showLoader: false});
        });
    }

    render() {
        return (
            <div>
                <pre>
    {`
    World Wide Web.

    GmanPark @ 2016
    `}
                </pre>
                { this.state.showLoader ? <LoaderComponent/> : null }
            </div>
        );
    }
}