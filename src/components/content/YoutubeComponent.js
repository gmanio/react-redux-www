import React, {Component} from 'react';
import youtube from '../../../vendor/gapi';
import style from '../../styles/youtube_loading.css';

class YoutubeComponent extends Component {
    constructor(props) {
        super(props);
        this.setLoadClient();
        this.attachedEvent();
    }

    attachedEvent() {
        window.addEventListener("orientationchange", ()=> {
            if (document.getElementById('ytplayer')) {
                document.getElementById('ytplayer').setAttribute('width', window.innerWidth);
                document.getElementById('ytplayer').setAttribute('height', window.innerHeight);
            }

            window.scrollTo(0, document.body.scrollHeight);
        });

        window.addEventListener('touchend', (e)=> {
            let windowHeight = window.document.body.offsetHeight;
            if(window.scrollY >= (windowHeight / 2)){
            //    do fetch
                console.log('test');
            }
        })
    }

    setLoadClient() {
        window.gapi.load('client', ()=> {
            window.gapi.client.setApiKey('AIzaSyA4k_7jggyPzjs1Tv90go3eoRyn5War9LQ');
            window.gapi.client.load('youtube', 'v3').then(this.sendRequest.bind(this));
        });
    }

    sendRequest(query) {
        var options = {
            part: 'snippet', //required
            q: 'teamcoco',
            order: 'date',
            pageToken: 'CBQQAA',
            maxResults: 10
        }

        if (query) {
            options = Object.assign(options, query);
        }

        var request = window.gapi.client.youtube.search.list(options);

        request.then(this.onSuccess.bind(this), this.onError.bind(this));
    }

    onSuccess(res) {
        this.setState({res: res});
    }

    onError(err) {
        console.log(err);
    }

    onPlaying(item) {
        if (document.querySelector('iframe#ytplayer')) {
            document.querySelector('iframe#ytplayer').remove();
        }

        let tempPlayer = document.createElement('div');
        tempPlayer.setAttribute('id', 'ytplayer');
        tempPlayer.setAttribute('class', 'ytplayer');

        document.getElementById('wrap').appendChild(tempPlayer);

        if (item.id.videoId) {
            var player = new YT.Player('ytplayer', {
                height: window.innerHeight,
                width: window.innerWidth,
                videoId: item.id.videoId
            });
        } else {
            var player = new YT.Player('ytplayer', {
                height: window.innerHeight,
                width: window.innerWidth,
                videoId: item.id.playlistId
            });
        }


        window.scrollTo(0, document.body.scrollHeight);
    }

    render(res) {
        if (this.state) {
            let items = this.state.res.result.items;
            console.dir(this.state.res.result.nextPageToken);
            return (
                <div>
                    <ul>
                        {items.map((item, idx)=> {
                            let snippet = item.snippet;
                            let videoId = item.id.videoId;
                            return (
                                <li key={idx} onClick={this.onPlaying.bind(null, item)}>
                                    {/*<span>{snippet.description}</span>*/}
                                    <img src={snippet.thumbnails.high.url} width="100%" height="200px"></img>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="youtube_loading">
                    <div>
                        <div className="c1"></div>
                        <div className="c2"></div>
                        <div className="c3"></div>
                        <div className="c4"></div>
                    </div>
                    <span>loading</span>
                </div>
            )
        }
    }
}

export default YoutubeComponent;
