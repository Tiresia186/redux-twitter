import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Navigate} from 'react-router-dom'
import { handleAddTweet } from '../actions/tweets'

class NewTweet extends Component {

    state= {
        text: '',
        toHome:false,
    }
handleChange=(e)=>{
    const  text= e.target.value
    this.setState(()=>({
        text
    }))
}
handleSubmit=(e)=>{
    e.preventDefault()
    const { text}= this.state
  const {dispatch, id} = this.props

  dispatch(handleAddTweet(text, id))

    this.setState(()=>({
        text:'',
        toHome: id ? false : true,
    }))
}   
 render (){
const {text, toHome} = this.state
if(toHome===true){
    return <Navigate to ='/'/>
}
const tweetLeft= 280 - text.length
        return(
            <div>
                <h3 className='center'> Compose new Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                <textarea
                placeholder="what's happening?"
                value={text}
                onChange={this.handleChange}
                className='textarea'
                maxLenght={280}/>
                {tweetLeft <= 100 &&(
                    <div className='tweet-lenght'>
                        {tweetLeft}
                    </div>
                )}
                <button 
                className='btn'
                type='submit'
                disabled={text === ''}>
                    Submit
                </button>
                </form>
            </div>
        )
    }
}

export default connect ()(NewTweet) 