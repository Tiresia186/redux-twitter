import React,  {Component} from 'react'
import {connect} from 'react-redux'
import Tweet from './Tweet'

class Dashboard extends Component {
    render(){
        console.log('Dashboard props', this.props)
        return(
            <div>
            <h3 className='center'>Your Timeline</h3>
            <ul className='dashboard-list'>
                {this.props.tweetIds.map((id)=>(
                    <li key={id}>
                        <Tweet id={id}/>
                    </li>
                ))}
            </ul>
            </div>
        )
    }
}



function mapStateToProps ({tweets}){
    return{
        tweetIds:Object.keys(tweets).sort((a,b) =>tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)


//mapStateToProps - If this argument is specified, the new component will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object, which will be merged into the component’s props. If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps.

// mapDispatchToProps - If an object is passed, each function inside it is assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props. If a function is passed, it will be given dispatch as the first parameter. It’s up to you to return an object that somehow uses dispatch to bind action creators in your own way. (Tip: you may use the bindActionCreators() helper from Redux.)