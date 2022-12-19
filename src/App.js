import React, { useState } from 'react';
import { read, writeFile } from 'xlsx';
import { saveAs } from 'file-saver';

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
    <div className="container mx-auto p-4 flex flex-col items-center">
      <input
        className="bg-gray-200 p-2 rounded-lg"
        type="file"
        accept=".xls"
        multiple
        onChange={handleFileChange}
      />
      {error && <p className="text-red-600">{error}</p>}
      <button className="bg-blue-500 p-2 rounded-lg text-white" onClick={handleConvert}>
        Convert to .xlsx
      </button>
    </div>
  );
};

export default App;
