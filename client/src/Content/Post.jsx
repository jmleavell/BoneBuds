import React, { Component } from 'react';
import Comment from './Comment';
import axios from 'axios'
import moment from 'moment';

class Post extends Component {
  constructor (props) {
    super(props);

    this.state = {
      post: '',
      comments: [],
      comment: ''
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitComment = this.onSubmitComment.bind(this);
    this.likePost = this.likePost.bind(this);
  }

  componentDidMount () {
    const socket = this.props.socket;

    socket.on(`comments ${this.props.postID}`, comments => {
      this.setState({
        comments: comments
      })
    })

    const payload = {
      postID: this.props.postID
    }

  axios.post('/posts/findUserFromPost', { userID: this.props.post.userID})
    .then( postResult => {
      axios.post('/comments/fetchAllCommentsByPost', payload)
        .then( commentResponse => {
          this.setState({
            comments: commentResponse.data,
            post: postResult.data
          })
        })
        .catch( err => {
          console.log(err);
        })
    })
    .catch( e => {
      console.log(e);
    })
  }

  onSubmitComment (e) {

    e.preventDefault()

    const payload = {
      postID: this.props.postID,
      text: this.state.comment,
      username: this.props.userData.username,
      userID: this.props.userData.userID

    }

    axios.post('/comments/createComment', payload)
      .then( response => {
        // this.setState({
        //   comments: response.data
        // })
      })
      .catch( err => {
        console.log(err);
      })

      e.target.reset();
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  likePost(e) {
    console.log('clicked', this.props.post);
    let liked = ++this.props.post.likes
    const payload = {
      ID: this.props.post.postID,
      likes: liked
    }
    axios.put('/posts/likePost', payload)
      .then((res) => {
        console.log(res);
      })
  }
  render () {
    // console.log('this is state for post component', this.props)
    let liked = '';
    if (this.props.post.likes === 1) {
      liked = `${this.props.post.likes} person likes this`;
    } else {
      liked = `${this.props.post.likes} people like this`
    }
    let pic = '';
    if (this.state.post.profileUrl === 'undefined') {
      pic = '/logo.svg';
    } else {
      pic = this.state.post.profileUrl;
    }
    return (
      <div>
        <div id="profile-page-wall-post" className="card blue lighten-5 ">
          <div className="card-profile-title">
            <div className="row">
              <div className="col s1">
                <img src={pic} alt="" className="circle responsive-img valign profile-post-uer-image"/>
              </div>
              <div className="col s10">
                  <p className="grey-text text-darken-4 margin">{this.state.post.username || "Anonymous"}{' '}
                    <small className="grey-text text-darken-1 ultra-small">{moment(this.props.post.createdAt).fromNow()}</small>
                  </p>
              </div>
              <div className="col s1 right-align">
                <i className="mdi-navigation-expand-more"></i>
              </div>
            </div>
          </div>

          <div className="card-content">
            <h5>{this.props.post.text}</h5>
          </div>

          <div className="card-action row">
            <div className="col s2 card-action-share">
              <a onClick={this.likePost} value={this.props.postID} href="#"><i className="material-icons left">thumb_up</i>{liked}</a>
            </div>

              <div className="input-field col s10 margin right">
                <form onSubmit={this.onSubmitComment} >
                  <input
                    id="profile-comments"
                    type="text"
                    name="comment"
                    className="validate margin"
                    onChange={this.onChangeHandler}
                  />
                </form>
                <label htmlFor="profile-comments" className="active">Comments</label>
                <h5 className="right">Comments</h5>
              </div>


            <div className="row col s10 small right">
              {this.state.comments.map( comment => {
                return  ( <Comment key={comment.commentID} ID={comment.commentID} comment={comment} userData={this.props.userData}/> )
              })}
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Post;