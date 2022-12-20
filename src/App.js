import React, { useState } from 'react';
import { read, writeFile } from 'xlsx';
import {FaGithub} from 'react-icons/fa';
import './App.css';
import logo from './img/XLStoXLSX.png';

const App = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const xlsFiles = [];

    // Iterate through the selected files and filter out any that are not .xls files
    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i].name.endsWith('.xls')) {
        xlsFiles.push(selectedFiles[i]);
      }
    }

    // If no .xls files were selected, display an error message
    if (xlsFiles.length === 0) {
      setError('No .xls files were selected');
      return;
    }

    setFiles(xlsFiles);
    setError(null);
  };

  async function handleConvert() {
    if (files.length === 0) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      // Read the .xls file using the xlsx library's readFile function
      const data = await files[i].arrayBuffer();

      const workbook = read(data);
      
      console.log(files[i])
      // Convert the data to the .xlsx format using the xlsx library's writeFile function
      const newWorkbook = writeFile(workbook, `${(files[i].name).slice(0, -4)}.xlsx`);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center h-screen">
      <a href="https://github.com/enricopro/xls-to-xlsx">
        <FaGithub className="text-3xl" />
      </a>
      <img className="" src={logo} alt="logo" />
      <input
        className="border-dashed border-2 border-indigo-600 p-4 rounded-lg"
        type="file"
        accept=".xls"
        multiple
        onChange={handleFileChange}
      />
      {error && <p className="text-red-600 my-2">{error}</p>}
      <button className="bg-blue-500 p-4 rounded-3xl text-white mt-5 hover:scale-110 transition-all" onClick={handleConvert}>
        Convert to .xlsx and download
      </button>
      <p className="absolute italic bottom-5 text-center px-5">N.B. This project computes your files locally, so it does not keep trace of your data. Anyway, the code is public and you can check the <a className="underline" href="https://github.com/enricopro/xls-to-xlsx">it</a>.</p>
    </div>
  );
};

export default App;
