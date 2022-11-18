import { CategoryContext } from "context/categories";
import { useContext } from "react";

const useCategory = () => {
  const context = useContext(CategoryContext);

  if (Array.isArray(context)) return context;

  throw Error("Category context should be used inside CategoryProvider");
};

export default useContext;
