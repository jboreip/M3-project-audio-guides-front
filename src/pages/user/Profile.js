import React, { Component } from 'react'
import withAuth from '../../components/Auth/withAuth';
import { Link } from 'react-router-dom';
import ImageUpload from '../../components/Uploader/ImageUpload.js'
import userService from '../../services/user-service';



class Profile extends Component {

state = {
  img: this.props.user.img,
}

changeImg = (imgURL) => {
  userService.changeProfilePic(imgURL);
  this.setState({
    img: imgURL
  })
}

  render() {

    return (
      <div className='profile-container'>
        <ImageUpload changeImg={this.changeImg}/>
        <img src={this.state.img}/>
        <h1>{this.props.user.name}</h1>
        <p>{this.props.user.email}</p>
        <Link className='logout' onClick={this.props.logout}>Logout</Link>
      </div>
    )
  }
}

export default withAuth(Profile);