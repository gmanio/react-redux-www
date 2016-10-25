import React, {Component} from 'react';
import reset from '../styles/reset.css';
import app from '../styles/app.css';

import {
    LoaderComponent,
    GpsComponent,
    CounterComponent,
    NavComponent,
    YoutubeComponent
} from '../components/index'

export default class App extends Component {
    constructor(props, context){
        super(props, context);
    }

    state = {
        showLoader: true,
        number: 1,
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <header>
                    <div className="title">
                        <span className="tit_desc">Youtube</span>
                    </div>
                    <NavComponent/>
                </header>
                <div className="container">
                    <YoutubeComponent/>
                </div>
            </div>
        )
    }
}