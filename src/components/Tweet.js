import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet, formatDate } from "../utils/helpers";
import { handleToggleTweet} from '../actions/tweets'
import {Link,} from 'react-router-dom'

class Tweet extends Component {
    toParent = (e, id) => {
        e.preventDefault();
        
    };
    handleLike = (e) => {
        e.preventDefault();
        
        const{dispatch, tweet, authedUser} = this.props

        dispatch(handleToggleTweet({
            id:tweet.id,
            hasLiked:tweet.hasLiked,
            authedUser
        }))
    };
    render() {
        const { tweet } = this.props;

        if (tweet === null) {
            return <p>this tweet does not exist</p>;
        }

        console.log(this.props);

        const {
            name,
            avatar,
            timestamp,
            text,
            hasLiked,
            likes,
            replies,
            id,
            parent,
        } = tweet;
        return (
            <Link to={`/tweet/${id}`}className='tweet'>
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <div>
                        <span> {name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button
                                className='replying-to'
                                onClick={(e) => this.toParent(e, parent.id)}>
                                replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>

                    <div className='tweet-icons'>
                        {
                            //icona replies
                        }
                        <span>{replies !== 0 && replies}</span>
                        <button
                            className='heart-button'
                            onClick={this.handleLike}>
                            {
                                hasLiked === true ? (
                                    <span className='tweet-icon'>X</span> //icona cuore piena
                                ) : (
                                    <span className='tweet-icon'>Y</span>
                                ) //icona cuore vuota
                            }
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        );
    }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) {
    const tweet = tweets[id];
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

    return {
        authedUser,
        tweet: tweet
            ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
            : null,
    };
}

export default connect(mapStateToProps)(Tweet);
