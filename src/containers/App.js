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
        window.addEventListener('click', ()=> {
            this.setState({showLoader: false});
        });
    }

    render() {
        return (
            <div>
                <header>
                    <NavComponent/>
                </header>
                <div className="container">
                    <YoutubeComponent/>
                </div>
                { this.state.showLoader ? <LoaderComponent/> : null }
                {/*<CounterComponent/>*/}
            </div>
        )
    }
}