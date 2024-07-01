import React,{useState} from 'react'
import Upload from '../adminpages/upload'

function advertisedpage() {
    const [addphoto, setaddedPhoto] = useState([]);
  return (
    <>
      <div className="container border">
        <h1>Make your advertised</h1>
        <form >
            <h3>Add your banner Image</h3>
            <Upload addphoto={addphoto} setaddedPhoto={setaddedPhoto} />
            <h3>Url of your website</h3>
            <input type="url" />
            <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default advertisedpage
