import React from "react";
import classNames from "classnames";
import styles from "./Table.module.scss";
import CategoryContent from "./TableContent/CategoryContent";

type TableProps = {
  list: Array<any> | undefined;
  type: string;
  editHandle: Function;
  removeHandle: Function;
};

const Table: React.FC<TableProps> = ({
  list,
  type,
  editHandle,
  removeHandle,
}) => {
  return (
    <>
      {list && list.length > 0 && (
        <div>
          <table
            className={classNames(
              styles.myTable,
              "Table Table--stickyHeader Table--bordered  u-backgroundWhite u-textDark u-text200"
            )}
          >
            {type.toLowerCase() === "category" && (
              <CategoryContent
                list={list}
                editHandle={editHandle}
                removeHandle={removeHandle}
              />
            )}
          </table>
        </div>
      )}

      {((list && list.length === 0) || !list) && <div>No data</div>}
    </>
  );
};

export default Table;
