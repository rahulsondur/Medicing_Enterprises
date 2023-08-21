
import React, { useState } from 'react';

function LandingPage({ data, submitCallBack }) {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  const handleField1Change = (event) => {
    setField1(event.target.value);
  };

  const handleField2Change = (event) => {
    setField2(event.target.value);
  };

  const handleCheckbox1Change = () => {
    setCheckbox1(!checkbox1);
    if (!checkbox1) {
      setCheckbox2(false);
      setCheckbox3(false);
    }
  };

  const handleCheckbox2Change = () => {
    setCheckbox2(!checkbox2);
  };

  const handleCheckbox3Change = () => {
    setCheckbox3(!checkbox3);
  };

  const canSubmit = field1 !== '' && field2 !== '' && (checkbox1 || checkbox2 || checkbox3);
  const canVerify = !checkbox1;

  const handleSubmit = (event) => {
    submitCallBack(2);
  };

  return (
    <div className="landing-page">
      <div className="current-machines">
        <h3>
          List of Current Records
        </h3>
        <div className="records-table">
          <table>
            <thead>
              <tr>
                <th>Unique ID</th>
                <th>Machine Name</th>
                <th>Machine Number</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {data.map((machine) => (
                <tr key={machine.id}>
                  <td>{machine.id}</td>
                  <td>{machine.machineName}</td>
                  <td>{machine.machineNumber}</td>
                  <td>{machine.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="new-machine">
        <h3>New Machine</h3>
        <div className="lp-form-container">
          <form onSubmit={handleSubmit} className="lp-form">
            <div className="lp-form-row">
              <label className="lp-form-label">
                Machine Name
                <input className="lp-form-input" type="text" value={field1} onChange={handleField1Change} />
              </label>
            </div>
            <div className="lp-form-row">
              <label className="lp-form-label">
                Machine Number
                <input className="lp-form-input" type="text" value={field2} onChange={handleField2Change} />
              </label>
            </div>
            <div className="lp-form-row">
              <label className="lp-checkbox-label">
                <input type="checkbox" checked={checkbox1} onChange={handleCheckbox1Change} />
                Machine Qualified
              </label>
              {canVerify &&
                <label className="lp-checkbox-label">
                  <input type="checkbox" checked={checkbox2} onChange={handleCheckbox2Change} />
                  Gap Assestment
                </label>
              }
              {canVerify &&
                <label className="lp-checkbox-label">
                  <input type="checkbox" checked={checkbox3} onChange={handleCheckbox3Change} />
                  Validation
                </label>
              }
            </div>
            {canSubmit && <button type="submit" className="lp-submit-button">Submit</button>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;