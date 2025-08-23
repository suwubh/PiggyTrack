import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportToExcelButton = ({ data, fileName, buttonText = 'Download Excel' }) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert('No data to export!');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

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
