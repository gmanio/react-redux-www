import React, {Component} from 'react';

class CounterComponent extends Component {
    onIncrease(e) {
        console.log("increase");
    }

    onDecrease(e) {
        console.log("decrease");
    }

    render() {
        return (
            <div>
                <button onClick={this.onIncrease}>+</button>
                <input type="text" value="1"></input>
                <button onClick={this.onDecrease}>-</button>
            </div>
        )
    }
}

export default CounterComponent;