import React from "react";
import { Icon } from "@ahaui/react";
import { Link } from "react-router-dom";

type TableCategoryContentProps = {
  list: Array<any> | undefined;
  editHandle: Function;
  removeHandle: Function;
};

const CategoryContent: React.FC<TableCategoryContentProps> = ({
  list,
  editHandle,
  removeHandle,
}) => {
  return (
    <>
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
                <Link to={`/categories/${category.id}`}>{category.name}</Link>
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
    </>
  );
};

export default CategoryContent;
