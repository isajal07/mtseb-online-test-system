import React,{useState} from 'react'
import axios, { post } from 'axios';

const ImageUpload = () =>  {

  const [file, setFile] = useState(null)
  const [img, setImg] = useState(null)

  const onImageFormSubmit = (e) =>{
    e.preventDefault() // Stop form submit

    const url = 'https://api.imgur.com/3/image/';
    let formData = new FormData();
    formData.append('image',file)
    const config = {
        headers: {
            'content-type': 'multipar',
            'Authorization': 'Client-ID 74e09b95b31f454'
        }
    }
    return  axios.post(url, formData, config).then((response)=>{
      setImg(response.data.data.link)
    })
  
  }

  const onChangeImage = (e) => {
    setFile(e.target.files[0])
  }

    return (
      <form onSubmit={onImageFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={onChangeImage} />
        <button type="submit">Upload</button>
        <img src={img}/>
      </form>
   )
  
}



export default ImageUpload