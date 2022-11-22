import { Button } from "@ahaui/react";
import CategoriesTable from "components/Categories/CategoriesTable/CategoriesTable";
import { PageWithTable } from "components/Common";
import { fetchCategoryList } from "redux/actions/category.action";
import { CategoryType } from "./CategoriesType";

const Categories = () => {
  const renderTable = (list: Array<CategoryType>) => (
    <CategoriesTable
      list={list}
      removeHandle={() => {}}
      editHandle={() => {}}
    />
  );

  return (
    <div>
      <PageWithTable
        renderTable={renderTable}
        breadcrumb={"Manage Category"}
        fetchData={fetchCategoryList}
        CreateButton={<Button>Create category</Button>}
        tableTitle={"Category List"}
      />
    </div>
  );
};

export default Categories;
