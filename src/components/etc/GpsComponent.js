import React, {Component} from 'react';
import axios from 'axios';

class GpsComponent extends Component {
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
        axios.post('https://gman.io:3000/gps', {
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
}

export default GpsComponent;