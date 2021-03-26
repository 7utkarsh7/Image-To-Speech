import React, { useState } from "react";
import Tesseract from "tesseract.js";
import ImageUploader from "react-images-upload";
import ClipLoader from "react-spinners/ClipLoader";
import Voice from "./Voiceloader";
import "./imageLoader.css";
/* eslint-disable */

function ImageLoader() {
  const [picUrl, setPicUrl] = useState([]);
  const [ocrText, setOcrText] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const onDrop = (_, pictureURL) => {
    setPicUrl(pictureURL);
  };

  const runOcr = a => {
    picUrl.forEach((picture) =>
      Tesseract.recognize(picture, a).then(({ data: { text } }) => {
        setOcrText((oldarray) => [...oldarray, text]);
      })
    );
    setIsLoading(true);
  };
  const [lang, setLang]=useState("");
  
  
  return (
    <div className="centered">
      <ImageUploader
        withIcon={true}
        withPreview={true}
        buttonText="Upload your Images"
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
  <h3>Choose Language</h3>
  <input type="text" id="default" list="languages"
   placeholder="e.g. Hindi" onChange={e=>{setLang(e.target.value); runOcr(e.target.value)}}/>
  
  <datalist id="languages">
    <option value="eng">English</option>
    <option value="hin">Hindi</option>
    <option value="kor">Korean</option>
    <option value="rus">Russian</option>
    <option value="fra">French</option> 
    <option value="ita">Italian</option>
  </datalist>
   
 

  {ocrText.length > 0 ? (
        <ul className="ocr-list">
          {ocrText.map((ot) => (
            <li className="ocr-element" key={ocrText.indexOf(ot)}>
              <strong>Text fetched from OCR via Tesseract</strong>
              <p>{ot}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ClipLoader color="#666666" loading={isLoading} size={150}>It may take upto 90 seconds(for larger files) please wait</ClipLoader>
      )}

      {ocrText.length > 0 &&(
        <ul >
          {ocrText.map((ot) => (
            <li  key={ocrText.indexOf(ot)}>
              <Voice text={ot} language={lang.slice(0,2)}/> 
            </li>
          ))}</ul>)}
    </div>
  );
}

export default ImageLoader;
