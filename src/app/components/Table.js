"use client";

import React, { useState } from 'react';
import Row from './Row';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Table = () => {
  const [rows, setRows] = useState([{ id: 1, variants: [null, null] }, { id: 2, variants: [null, null] }]);

  const moveRow = (dragIndex, hoverIndex) => {
    const draggedRow = rows[dragIndex];
    const newRows = [...rows];
    newRows.splice(dragIndex, 1);
    newRows.splice(hoverIndex, 0, draggedRow);
    setRows(newRows);
  };

  const addRow = () => setRows([...rows, { id: rows.length + 1, variants: [null, null] }]);
  const deleteRow = (id) => setRows(rows.filter((row) => row.id !== id));

  const updateVariants = (id, variants) => {
    setRows(rows.map(row => row.id === id ? { ...row, variants } : row));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Rules Creation</h1>
          <button onClick={addRow} className="p-2 bg-green-500 text-white">Add Row</button>
        </div>
        <div className="border border-gray-300 rounded-lg">
          {rows.map((row, index) => (
            <Row
              key={row.id}
              id={row.id}
              index={index}
              moveRow={moveRow}
              deleteRow={deleteRow}
              rowVariants={row.variants}
              setRowVariants={(variants) => updateVariants(row.id, variants)}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Table;
