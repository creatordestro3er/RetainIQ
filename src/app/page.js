// src/app/page.js

import React from 'react';
import Table from './components/Table';

const HomePage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Rules Creation</h1>
      <Table />
    </div>
  );
};

export default HomePage;
