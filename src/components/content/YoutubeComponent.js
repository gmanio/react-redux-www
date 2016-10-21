import React, {Component} from 'react';

class YoutubeComponent extends Component {
    sendRequest(query) {
        var options = {
            part: 'snippet', //required
            q: 'teamcoco'
        }

        if (query) {
            options = query;
        }

        gapi.client.youtube.search.list(options).then(this.onSuccess, this.onError);
    }

    onSuccess(res) {
        debugger;
        this.render(res);
    }

    onError(err) {
        console.log(err);
    }

    render(res) {
        gapi.load('client', function(){
            gapi.client.setApiKey('AIzaSyA4k_7jggyPzjs1Tv90go3eoRyn5War9LQ');
            gapi.client.load('youtube', 'v3').then(this.sendRequest);
        });

        return (
            <div>
                <ul>
                    {}
                </ul>
            </div>
        )
    }
}

export default YoutubeComponent;
