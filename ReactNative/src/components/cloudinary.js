import React, { Component } from 'react'
export default class cloudinary extends Component{
  constructor(props){
    super(props)
    this.state={
      uri: `https://cloudinary.com/console/media_library#/dialog/image/upload/${uri}`,
      isPresent: false,

    }
  }
}
const cloudinaryURI = 
const CLOUDINARY_UPLOAD_PRESET = 'wyaejzmi';


var imgPreview = document.getElementById('img-preview');
var fileUpload = document.getElementById('file-upload');

fileUpload.addEventListener('change',function(event){
  var file = event.target.files[0]
  var formData = new FormData();
  formData.append('file',file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  axios({
    url: CLOUDINARY_URL,
    method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
  }).then(function(res){
    console.log(res);
    imgPreview.src = res.data.secure_url;
  }).catch(function(err){
    console.error(err);
  })
})
