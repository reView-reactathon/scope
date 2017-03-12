import React from 'react';
import { captureUserMedia, S3Upload } from './AppUtils';
import Webcam from './Webcam.react';
import RecordRTC from 'recordrtc';
import { Modal } from 'react-bootstrap';
var database = firebase.database();

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia || navigator.msGetUserMedia);

class RecordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recordVideo: null,
      src: null,
      uploadSuccess: null,
      uploading: false,
      user: ''
    };

    this.requestUserMedia = this.requestUserMedia.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    if(!hasGetUserMedia) {
      alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
      return;
    }
    this.requestUserMedia();
  }

  requestUserMedia() {
    console.log('requestUserMedia')
    captureUserMedia((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) });
      console.log('setting state', this.state)
    });
  }

  startRecord() {
    captureUserMedia((stream) => {
      this.state.recordVideo = RecordRTC(stream, { type: 'video' });
      this.state.recordVideo.startRecording();
    });

    setTimeout(() => {
      this.stopRecord();
    }, 4000);
  }

  stopRecord() {
    this.state.recordVideo.stopRecording(() => {
      let params = {
        type: 'video/webm',
        data: this.state.recordVideo.blob,
        id: Math.floor(Math.random()*90000) + 10000,
        user: this.state.user
      }

      this.setState({ uploading: true });

      function writeUserData(userId) {
        firebase.database().ref('users/' + userId).set({
          videoId: 12345,
          questionId: 4888
        });
      }

      S3Upload(params)
      .then((success) => {
        console.log('enter then statement')
        if(success) {
          console.log(success)
          this.setState({ uploadSuccess: true, uploading: false });
          // Then add user and video ID to firebase

          writeUserData(params.user)
        }
      }, (error) => {
        console.log("ERROR, error", error)
        alert(error, 'error occurred. check your aws settings and try again.')
      })
    });
  }

  updateUser(event){
    // console.log(event)
    console.log(event.target.value)
    this.setState({user: event.target.value})
  }

  render() {
    return(
      <div>
        <Modal show={this.state.uploadSuccess}><Modal.Body>Upload success!</Modal.Body></Modal>
        <div><Webcam src={this.state.src}/></div>
        {this.state.uploading ?
          <div>Uploading...</div> : null}
        <div><button onClick={this.startRecord}>Start Record</button></div>
        <div>Enter username:<input type="text" onBlur={this.updateUser}></input></div>
      </div>
    )
  }
}

export default RecordPage;

