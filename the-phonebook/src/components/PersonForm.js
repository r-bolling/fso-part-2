import React from 'react';

const PersonForm = ({
  formSubmit,
  nameValue,
  nameChange,
  numberValue,
  numberChange,
}) => {
  return (
    <>
      <form onSubmit={formSubmit}>
        <div>
          name: <input value={nameValue} onChange={nameChange} />
          <br />
          number: <input value={numberValue} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
