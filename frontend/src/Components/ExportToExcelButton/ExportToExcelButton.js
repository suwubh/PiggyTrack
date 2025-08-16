import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportToExcelButton = ({ data, fileName, buttonText = 'Download Excel' }) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert('No data to export!');
      return;
    }

    // Prepare data: Ensure it's a flat array of objects
    // If your incomes/expenses have nested objects or unwanted fields, you might need to map them here
    // Example: const processedData = data.map(({ _id, title, amount, date, description }) => ({
    //   Title: title,
    //   Amount: amount,
    //   Date: new Date(date).toLocaleDateString(),
    //   Description: description
    // }));

    const worksheet = XLSX.utils.json_to_sheet(data); // Converts JSON array to a worksheet
    const workbook = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data'); // Appends the worksheet to the workbook

    // Generates a binary string for the Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Creates a Blob object and triggers download
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, `${fileName}.xlsx`);
  };

  return (
    <button onClick={handleExport} style={{ padding: '8px 15px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer', background: '#e0e0e0', color: '#333' }}>
      {buttonText}
    </button>
  );
};

export default ExportToExcelButton;
