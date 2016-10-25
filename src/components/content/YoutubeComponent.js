import React, {Component} from 'react';
import youtube from '../../../vendor/gapi';
import style from '../../styles/youtube_loading.css';

class YoutubeComponent extends Component {
    constructor(props) {
        super(props);
        this.itemList = [];
        this.onLoading = false;
        this.setLoadClient();
        this.attachedEvent();
    }

    attachedEvent() {
        window.addEventListener("orientationchange", ()=> {
            if (document.getElementById('ytplayer')) {
                document.getElementById('ytplayer').setAttribute('width', window.innerWidth);
                document.getElementById('ytplayer').setAttribute('height', window.innerHeight);
            }
        });

        window.addEventListener('touchend', ()=> {
            let windowHeight = window.document.body.offsetHeight;
            if (window.scrollY >= (windowHeight / 2)) {

                if(this.onLoading == false){
                    setTimeout(()=> {
                        this.sendRequest({pageToken: this.state.nextPageToken});
                    }, 500);
                }
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
        this.onLoading = true;

        var options = {
            part: 'snippet', //required
            q: 'ps4',
            order: 'date',
            maxResults: 10
        }

        if (query) {
            options = Object.assign(options, query);
        }

        var request = window.gapi.client.youtube.search.list(options);

        request.then(this.onSuccess.bind(this), this.onError.bind(this));
    }

    onSuccess(res) {
        this.result = res.result;
        this.itemList = this.itemList.concat(this.result.items);
        this.setState({
            nextPageToken: this.result.nextPageToken,
            prevPageToken: this.result.prevPageToken,
            res: res
        });

        this.onLoading = false;
    }

    onError(err) {
        console.log(err);
    }

    onPlaying(item) {
        if (document.querySelector('.wrap_player')) {
            document.querySelector('.wrap_player').remove();
        }

        let wrapPlayer = document.createElement('div');
        wrapPlayer.setAttribute('class', 'wrap_player');

        let cancelBtn = document.createElement('a');
        cancelBtn.setAttribute('class', 'btn_cle');
        cancelBtn.addEventListener('click', ()=>{
            document.querySelector('.wrap_player').remove();
        })

        let tempPlayer = document.createElement('div');
        tempPlayer.setAttribute('id', 'ytplayer');
        tempPlayer.setAttribute('class', 'ytplayer');

        wrapPlayer.appendChild(tempPlayer);
        wrapPlayer.appendChild(cancelBtn);

        document.getElementById('wrap').appendChild(wrapPlayer);

        if (item.id.videoId) {
            var player = new YT.Player('ytplayer', {
                height: window.innerHeight,
                width: window.innerWidth,
                videoId: item.id.videoId,
                autoplay: 1
            });
        } else {
            var player = new YT.Player('ytplayer', {
                height: window.innerHeight,
                width: window.innerWidth,
                videoId: item.id.playlistId,
                autoplay: 1
            });
        }
    }

    render() {
        if (this.state) {
            return (
                <div>
                    <ul>
                        {this.itemList.map((item, idx)=> {
                            let snippet = item.snippet;
                            let videoId = item.id.videoId;
                            return (
                                <li key={idx} onClick={this.onPlaying.bind(null, item)}>
                                    <img src={snippet.thumbnails.high.url} width="100%" height="100%"></img>
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
