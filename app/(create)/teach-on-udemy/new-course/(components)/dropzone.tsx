import axios from 'axios';
import React from 'react';
import {useDropzone} from 'react-dropzone';

export default function Basic(props:any) {

    const onDrop = async(acceptedFiles:any) => {
        try {
            // Create a FormData object to hold the file data
            const formData = new FormData();
            acceptedFiles.forEach((file:any) => {
              formData.append('files', file); // Append each file to the FormData object with the 'files' key
            });
      
            // Make a POST request to the server to upload the files
            const response = await axios.post('/api/upload', formData);
      
            // Handle the response from the server, if needed
            console.log('Files uploaded:', response.data);
          } catch (error) {
            console.error('Error uploading files:', error);
          }
      };


  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});


    console.log(acceptedFiles);
    console.log(getInputProps);
    
    
  return (  
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
      <aside>
        <ul>
        {acceptedFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </aside>
    </section>
  );
}