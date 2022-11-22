import React from "react";
import classNames from "classnames";
import { Icon } from "@ahaui/react";
import { Link } from "react-router-dom";
import { CategoryType } from "pages/Categories/CategoriesType";

type TableProps = {
  list: Array<CategoryType> | undefined;
  editHandle: Function;
  removeHandle: Function;
};

const Table: React.FC<TableProps> = ({ list, editHandle, removeHandle }) => {
  return (
    <>
      {list && list.length > 0 && (
        <div>
          <table className="Table Table--stickyHeader Table--bordered  u-backgroundWhite u-textDark u-text200">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Image url</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list &&
                list.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>
                      <Link to={`/categories/${category.id}`}>
                        {category.name}
                      </Link>
                    </td>
                    <td>{category.description}</td>
                    <td>{category.image_url}</td>

                    <td width={130}>
                      <div className="u-inlineBlock u-paddingExtraSmall u-roundedCircle hover:u-backgroundLightest hover:u-textPrimary u-cursorPointer">
                        <Icon
                          size="small"
                          name="edit"
                          onClick={() => editHandle(category.id)}
                        />
                      </div>

                      <div className="u-inlineBlock u-paddingExtraSmall u-roundedCircle hover:u-backgroundLightest hover:u-textPrimary u-cursorPointer">
                        <Icon
                          size="small"
                          name="trash"
                          onClick={() => removeHandle(category.id)}
                        />
                      </div>
                    </td>
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
