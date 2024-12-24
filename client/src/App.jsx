import { useState } from 'react'
// import './App.css'

function App() {
  const [image, setImage] = useState(null);

  const uploadImage=async (e)=>{
    console.log(e.target.files);
    const formData=new FormData();
    formData.append("file",e.target.files[0]);
    setImage(e.target.files[0]);
    e.target.value=null;

    try {
      const options={
        method:"POST",
        body:formData
      }

      const response=await fetch("http://localhost:3000/upload",options);
      const data=await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <div className=''>
      {image && <img className="uploadImageSection" src={URL.createObjectURL(image)} />}
      <br/>
      <label htmlFor='files'>upload and image</label>
      <input onChange={uploadImage} type='file' id="files" accept='image/*'/>
    </div>
    </>
  )
}

export default App
