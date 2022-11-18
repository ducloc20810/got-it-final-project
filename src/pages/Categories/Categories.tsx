import { useEffect, useReducer } from "react";
import classNames from "classnames";
import { Pagination } from "@ahaui/react";
import { Table } from "components";
import {
  categoryAction,
  categoryReducer,
  initState,
} from "reducers/categoryReducer";
import { CategoryContext } from "context/categories";
import { useThunkDispatch } from "hooks";
import { fetchCategoryList } from "redux/actions/category.action";
import styles from "./Categories.module.scss";

const categoryTableHeaders = ["Id", "Name", "Image Url", "Description"];
const categoryKeys = ["id", "name", "image_url", "description"];

const Categories = () => {
  const [state, dispatch] = useReducer(categoryReducer, initState);

  const typedDispatch = useThunkDispatch();

  useEffect(() => {
    typedDispatch(fetchCategoryList()).then((data) =>
      dispatch({ type: categoryAction.SET_CATEGORIES, payload: data })
    );
  }, [typedDispatch]);

  return (
    <CategoryContext.Provider value={[state, dispatch]}>
      <div className={classNames(styles.categories)}>
        <h1 className="u-text600">Manage Category</h1>

        <div
          className={classNames(
            styles.categoriesContent,
            "u-shadowMedium u-backgroundWhite u-roundedMedium"
          )}
        >
          <header className="u-backgroundLightest u-paddingHorizontalMedium u-paddingVerticalTiny u-textPrimaryDarker">
            Category list
          </header>
          <div className="u-paddingHorizontalMedium u-paddingVerticalTiny">
            <Table
              list={state.categories?.items}
              headers={categoryTableHeaders}
              objectKeys={categoryKeys}
            />
            <div className="u-flex u-justifyContentBetween">
              <Pagination>
                <Pagination.Prev />
                <Pagination.Item ref="#1">1</Pagination.Item>
                <Pagination.Item active href="#2">
                  2
                </Pagination.Item>
                <Pagination.Item href="#3">3</Pagination.Item>
                <Pagination.Item href="#4">4</Pagination.Item>
                <Pagination.Item href="#5">5</Pagination.Item>
                <Pagination.Item href="#6">6</Pagination.Item>
                <Pagination.Item href="#7">7</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </CategoryContext.Provider>
  );
};

export default Categories;
