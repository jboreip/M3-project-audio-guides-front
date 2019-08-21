import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
 
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.PROJECT_ID,
  storageBucket: 'gs://city-audio-guides.appspot.com'
};
firebase.initializeApp(config);

class FileUploadComponent extends Component {
  state = {
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };


 
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.props.changeImg(url)
        this.setState({ avatarURL: url })
      });
  };
 
  render() {
    const {isUploading, progress, avatarURL} = this.state;
    return (
      <>
        <form className='image-uploader-form'>
          <label>
            <span>Change</span>
          {/* {isUploading && <p>Progress: {progress}</p>} */}
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
          </label>
        </form>
      </>
    );
  }
}
 
export default FileUploadComponent;