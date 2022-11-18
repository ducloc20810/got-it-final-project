import React from "react";

type TableProps = {
  list: Array<any>;
  headers: Array<string>;
};

const Table: React.FC<TableProps> = ({ list, headers }) => {
  console.log(list);
  return (
    <>
      {list && list.length > 0 && (
        <div>
          <table className="Table Table--stickyHeader Table--bordered  u-backgroundWhite u-textDark u-text200 u-marginTopSmall">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={item.id}>
                  {Object.keys(list[0]).map((keyValue) => (
                    <td key={keyValue}>{list[index][keyValue]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {((list && list.length === 0) || !list) && <div>No data</div>}
    </>
  );
};

export default Table;
