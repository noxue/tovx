import './App.css';
import Clipboard from 'react-clipboard.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [weixin, setWeixin] = useState("");
  const [icon, setIcon] = useState("");
  const [ok, setOk] = useState(false);
  const [images, setImages] = useState([]);
  useEffect(() => {

    axios.get("./data.json?="+Math.random()).then((res) => {
      if (res.status !== 200) {
        alert(res.statusText)
        return;
      }
      console.log(res.data)
      setWeixin(res.data.weixin)
      setIcon(res.data.icon)
      setOk(res.data.ok)
      setImages(res.data.images)
      document.body.title = res.data.title
    })


  }, [])

  return (
    <div className="App">

      {
        images.map((img,i)=>{
          console.log(img)
          return <img class="img" src={img} key={i} />
        })
      }
      <div class="copy-btn" hidden={!ok}>
        <Clipboard data-clipboard-text={weixin} onClick={() => {
          window.location.href = "weixin://"
        }}></Clipboard>
        <img src={icon} />
      </div>

    </div>
  );
}

export default App;
