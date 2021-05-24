import React, { Component } from "react";
import axios from "axios";
import ProfileImg from "./ProfileImg";
import 'antd/dist/antd.css'
import { Avatar } from 'antd';

class ImgUpload extends Component {
  
  state={
    profileImage: "",
    selectedFile: null 
  }

  fileSelectedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    console.log(event.target.files[0]);
  };

  fileUploadHandler = () => {
    var data = null;
    const id = localStorage.getItem("id")
    axios.get('http://localhost:5000/getUser/' + id)
    .then(res => {
      console.log(res);
      data = res["data"];
      console.log(data);

      const fd = new FormData();
      fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
      //needs to send an http request
      axios
        .put("http://localhost:5000/profile_pic_upload/" + data["_id"], fd, {
          onUploadProgress: (progressEvent) => {
            console.log(
              "Upload Progress:" +
                Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                "%"
            );
          }
        })
        .then((res) => {
          console.log(res);
          axios
          .get("http://localhost:5000/profile_pic_retrieve/" + data["_id"])
            .then((res) => {
               console.log(res);
               this.setState({
                profileImage: res["data"]
              })
              console.log(res["data"]);
          })
          .catch(function (error) {
            console.log(error);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    
    })
    .catch(function (e) {
    //Not handling the error. Just logging into the console.
      console.log(e);
    });
  };

  render() {
    return (
      <div className="ImgUpload">
        <input
          // style={{ display: "none" }}
          type="file"
          onChange={this.fileSelectedHandler}
          ref={(fileInput) => (this.fileInput = fileInput)}
        />
        {/* <button onClick={() => this.fileInput.click()}>Pick File</button> */}
        <button onClick={this.fileUploadHandler}>Upload</button>
        <div>
        <Avatar 
        style={{ "margin-top": "5px" }}
        size={350} 
        icon="img"
        src={this.state.profileImage}
        />
        {/* <ProfileImg img="https://picsum.photos/200" /> */}
        </div>
      </div>
    );
  }
}

export default ImgUpload;
