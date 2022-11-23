import { Button } from "@ahaui/react";
import CategoriesTable from "components/Categories/CategoriesTable";
import { PageWithTable } from "components/Common";
import { useThunkDispatch } from "hooks";
import {
  createCategory,
  fetchCategoryList,
} from "redux/actions/category.action";
import {
  clearModal,
  closeModal,
  setLoading,
  setModal,
} from "redux/actions/modal.action";
import { CategoriesDataType, CategoryType } from "./CategoriesType";
import { IFormCRUDInputs } from "types/form";
import CategoryCreateForm from "components/Categories/CategoryCreateForm";
import { useState } from "react";

const Categories = () => {
  const [data, setData] = useState<CategoriesDataType>({
    total_items: 0,
    items: [],
  });
  const dispatch = useThunkDispatch();

  const renderTable = (list: Array<CategoryType>) => (
    <CategoriesTable
      list={list}
      removeHandle={() => {}}
      editHandle={() => {}}
    />
  );

  const submitCreateFormModalHandle = (data: IFormCRUDInputs) => {
    if (data.name && data.description && data.imageUrl) {
      dispatch(setLoading());

      dispatch(
        createCategory({
          name: data.name,
          description: data.description,
          image_url: data.imageUrl,
        })
      )
        .then((data) => {
          setData((prev) => ({
            ...prev,
            total_items: prev.total_items + 1,
            items: [...prev.items, data],
          }));
          dispatch(clearModal());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const closeModalHandle = () => {
    dispatch(clearModal());
  };

  const createCategoryOnClick = () => {
    dispatch(
      setModal({
        Children: (
          <CategoryCreateForm
            submitHandle={submitCreateFormModalHandle}
            closeHandle={closeModalHandle}
          />
        ),
        isLoading: false,
        isOpen: true,
        title: "Create category form",
        closeHandle: closeModalHandle,
      })
    );
  };

  return (
    <div>
      <PageWithTable
        data={data}
        setData={setData}
        renderTable={renderTable}
        breadcrumb={"Manage Category"}
        fetchData={fetchCategoryList}
        CreateButton={
          <Button onClick={createCategoryOnClick}>Create category</Button>
        }
        tableTitle={"Category List"}
      />
    </div>
  );
};

export default Categories;
