import React from 'react';
import './table.css'

const Table = ({ data }) => {
  const rows = data.flatMap((item, index) => [
    {
      type: 'fetched_at',
      key: `fetched_at_${item._id}`,
      fetched_at: item.fetched_at,
    },
    // Add a row for each coin
    ...item.coins.map((coin) => ({
      type: 'coin',
      key: coin._id,
      symbol: coin.symbol,
      name: coin.name,
      current_price: coin.current_price,
      last_updated: coin.last_updated,
    })),
  ]);

  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Current Price</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          if (row.type === 'fetched_at') {
            // Render the fetched_at row
            return (
              <tr key={row.key}>
                <td colSpan="5">Data fetched at: {new Date(row.fetched_at).toLocaleString()}</td>
              </tr>
            );
          } else {
            // Render the coin row
            return (
              <tr key={row.key}>
                <td>{row.symbol}</td>
                <td>{row.name}</td>
                <td>{row.current_price}</td>
                <td>{row.last_updated ? new Date(row.last_updated).toLocaleString() : 'N/A'}</td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};

export default Table;
