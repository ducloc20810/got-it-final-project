import React from 'react';
import { Icon } from '@ahaui/react';
import { Link } from 'react-router-dom';
import { CategoryType } from 'pages/Categories/CategoriesType';

type TableProps = {
  list: Array<CategoryType> | undefined;
  editHandle: (arg1: number) => void;
  removeHandle: (arg1: number) => void;
};

const Table: React.FC<TableProps> = ({
  list,
  editHandle,
  removeHandle,
}) => (
  <>
    {list && list.length > 0 && (
      <div>
        <table
          width="100%"
          className="Table Table--stickyHeader Table--bordered  u-backgroundWhite u-textDark u-text200"
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list
              && list.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td width="10%">
                    <img
                      width="100%"
                      height="auto"
                      style={{ objectFit: 'cover' }}
                      src={category.imageUrl}
                      alt=""
                    />
                  </td>
                  <td width="30%">
                    <Link to={`/categories/${category.id}`}>
                      {category.name}
                    </Link>
                  </td>
                  <td width="40%">{category.description}</td>

                  <td width="15%">
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

export default Table;
