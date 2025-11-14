import React from 'react';
import './TableResponse.css'; 

const TableResponse = ({ data }) => {
  if (!data || !data.headers || !data.rows || data.rows.length === 0) {
    return <p className="table-empty-state">No structured data available for this query.</p>;
  }

  return (
    <div className="table-responsive-wrapper">
      <table className="data-table">
        <thead className="table-header">
          <tr>
            {data.headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="table-header-cell"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="table-row">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="table-cell"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableResponse;