import { Button } from "@ahaui/react";
import { useForm, Controller } from "react-hook-form";
import CategoriesTable from "components/Categories/CategoriesTable";
import { PageWithTable } from "components/Common";
import { useThunkDispatch } from "hooks";
import { fetchCategoryList } from "redux/actions/category.action";
import { clearModal, setLoading, setModal } from "redux/actions/modal.action";
import { CategoryType } from "./CategoriesType";
import { IFormCRUDInputs } from "types/form";
import CategoryCreateForm from "components/Categories/CategoryCreateForm";
import CategoryService from "services/category.service";
import { useEffect } from "react";

const Categories = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormCRUDInputs>({ mode: "onChange" });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const dispatch = useThunkDispatch();

  const renderTable = (list: Array<CategoryType>) => (
    <CategoriesTable
      list={list}
      removeHandle={() => {}}
      editHandle={() => {}}
    />
  );

  const closeModalHandle = () => {
    dispatch(clearModal());
  };

  const submitModalHandle = (data: IFormCRUDInputs) => {
    console.log("hello");
    if (data.name && data.description && data.imageUrl) {
      dispatch(setLoading());

      CategoryService.createCategories({
        name: data.name,
        description: data.description,
        image_url: data.imageUrl,
      });
    }
  };

  const createCategoryOnClick = () => {
    dispatch(
      setModal({
        Children: <CategoryCreateForm />,
        isLoading: false,
        isOpen: true,
        title: "Create category form",
        SubmitButton: (
          <Button
            variant="primary"
            width="full"
            onClick={handleSubmit(submitModalHandle)}
          >
            Submit
          </Button>
        ),
        CloseButton: (
          <Button variant="secondary" width="full" onClick={closeModalHandle}>
            Close
          </Button>
        ),
        closeHandle: closeModalHandle,
      })
    );
  };

  return (
    <div>
      <PageWithTable
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
