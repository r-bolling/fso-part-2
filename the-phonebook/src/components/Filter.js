import React from 'react';

const Filter = ({ search, handleSearch }) => {
  return (
    <>
      Search filter: <input value={search} onChange={handleSearch} />{' '}
    </>
  );
};

export default Filter;
