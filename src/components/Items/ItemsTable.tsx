import React from 'react';
import { Icon } from '@ahaui/react';
import { Link } from 'react-router-dom';
import { ItemType } from 'pages/Items/ItemsType';

type TableProps = {
  categoryId: number | string;
  list: Array<ItemType> | undefined;
  editHandle: (arg1: number) => void;
  removeHandle: (arg1: number) => void;
};

const Table: React.FC<TableProps> = ({ categoryId, list, editHandle, removeHandle }) => (
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
              <th>Author</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list
              && list.map((item) => (
                <tr key={item.id}>
                  <td width="5%">
                    <Link to={`/categories/${categoryId}/items/${item.id}`}>{item.id}</Link>
                  </td>
                  <td width="10%">
                    <img
                      width="100%"
                      height="auto"
                      style={{ objectFit: 'cover' }}
                      src={item.imageUrl}
                      alt=""
                    />
                  </td>
                  <td width="100px">{item.author.name}</td>
                  <td>{item.description}</td>

                  <td style={{ whiteSpace: 'nowrap' }} width="100px">
                    <div
                      className="u-inlineBlock u-paddingExtraSmall u-roundedCircle hover:u-backgroundLightest hover:u-textPrimary u-cursorPointer"
                      onClick={() => editHandle(item.id)}
                      onKeyPress={() => null}
                      role="button"
                      tabIndex={0}
                      aria-label="Edit item"
                    >
                      <Icon size="small" name="edit" />
                    </div>

                    <div
                      className="u-inlineBlock u-paddingExtraSmall u-roundedCircle hover:u-backgroundLightest hover:u-textPrimary u-cursorPointer"
                      onClick={() => removeHandle(item.id)}
                      onKeyPress={() => null}
                      role="button"
                      tabIndex={0}
                      aria-label="Remove item"
                    >
                      <Icon size="small" name="trash" />
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
