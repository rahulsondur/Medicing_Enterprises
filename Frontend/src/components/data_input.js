import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

function AdditionalField({ index, value, onChange }) {
  return (
    <div className="di-form-group">
      <label>Additional Field {index + 1}:</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
      />
    </div>
  );
}

function DataInput({ data, submitCallBack }) {

  const [deviceName, setDeviceName] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [deviceSpec, setDeviceSpec] = useState('');
  const [numAdditionalFields, setNumAdditionalFields] = useState(0);
  const [additionalDetails, setAdditionalDetails] = useState([]);
  const [createButtonClass, setCreateButtonClass] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const formContainerRef = useRef(null);
  const handleAdditionalFieldChange = (index, fieldValue) => {
    const updatedAdditionalDetails = [...additionalDetails];
    updatedAdditionalDetails[index] = fieldValue;
    setAdditionalDetails(updatedAdditionalDetails);
  };

  const handleCreateDocument = async (e) => {
    e.preventDefault();

    setIsButtonDisabled(true);
    setCreateButtonClass('loading');

    const pdf = new jsPDF(); // Set PDF format to A4   

    try {
      // Use html2canvas to render the form as an image
      const canvas = await html2canvas(formContainerRef.current);
      const imgData = canvas.toDataURL('image/png');

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 150); // Use A4 dimensions (adjust as needed)

      // Convert the PDF to a Blob and save it to the public folder
      const blob = pdf.output('blob');
      saveAs(blob, 'form_submission.pdf');
      // Save the PDF
      //pdf.save('form_submission1.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }

    setIsButtonDisabled(false);
    setCreateButtonClass('');
    submitCallBack(3);
  };
  useEffect(() => {
    const areFieldsFilled =
      deviceName.trim() !== '' &&
      deviceModel.trim() !== '' &&
      deviceSpec.trim() !== '' &&
      additionalDetails.every((detail) => detail.trim() !== '');

    setIsButtonDisabled(!areFieldsFilled);
  }, [deviceName, deviceModel, deviceSpec, additionalDetails]);

  return (
    <div className="data-input">
      <div className="di-form">
        <form>
          <div className='di-pdf-container' ref={formContainerRef}>
            <div className="di-form-group">
              <label>Device Name:</label>
              <input
                type="text"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
              />
            </div>
            <div className="di-form-group">
              <label>Device Model:</label>
              <input
                type="text"
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
              />
            </div>
            <div className="di-form-group">
              <label>Device Spec:</label>
              <input
                type="text"
                value={deviceSpec}
                onChange={(e) => setDeviceSpec(e.target.value)}
              />
            </div>
            <div className="di-form-group">
              <label>Additional Details:</label>
              <input
                type="number"
                value={numAdditionalFields}
                onChange={(e) => setNumAdditionalFields(parseInt(e.target.value))}
              />
            </div>
            {Array.from({ length: numAdditionalFields }).map((_, index) => (
              <AdditionalField
                key={index}
                index={index}
                value={additionalDetails[index] || ''}
                onChange={handleAdditionalFieldChange}
              />
            ))}
          </div>
          <div className="di-create-button-container">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                className={createButtonClass}
                onClick={handleCreateDocument}
                disabled={isButtonDisabled}
              >
                Create Document
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default DataInput;