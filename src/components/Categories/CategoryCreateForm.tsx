import { Form } from "@ahaui/react";
import { InlineError } from "components/Common";
import React from "react";

type CreateFormProps = any;

const CategoryCreateForm: React.FC<CreateFormProps> = ({ form }) => {
  const {
    formState: { errors },
    register,
  } = form;
  return (
    <>
      <Form.Group sizeControl="large">
        <Form.Input
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "name is required",
            maxLength: 30,
          })}
        />

        {errors.name?.type === "required" && (
          <InlineError>Please enter your name</InlineError>
        )}

        {errors.name?.type === "maxLength" && (
          <InlineError>Maximum length of name is 30 characters</InlineError>
        )}
      </Form.Group>

      <Form.Group sizeControl="large">
        <Form.Input
          type="text"
          placeholder="Image Url"
          {...register("imageUrl", {
            maxLength: 200,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              console.log(e.target.value),
          })}
        />

        {errors.imageUrl?.type === "required" && (
          <InlineError>Please enter your image url</InlineError>
        )}

        {errors.imageUrl?.type === "maxLength" && (
          <InlineError>
            Maximum length of image url is 200 characters
          </InlineError>
        )}
      </Form.Group>

      <Form.Group sizeControl="large">
        <Form.Input
          type="text"
          placeholder="Description"
          {...register("description", {
            required: "description is required",
            maxLength: 200,
          })}
        />

        {errors.description?.type === "required" && (
          <InlineError>Please enter description</InlineError>
        )}

        {errors.description?.type === "maxLength" && (
          <InlineError>
            Maximum length of description is 200 characters
          </InlineError>
        )}
      </Form.Group>
    </>
  );
};

export default CategoryCreateForm;
