import { Button, Form } from '@ahaui/react';
import { useForm } from 'react-hook-form';
import { CategoryPayload } from 'pages/Categories/CategoriesType';
import { InlineError } from 'components/Common';
import { IFormCategoryInputs } from 'types/form';

type CreateFormProps = {
  submitHandle: (data: IFormCategoryInputs) => void;
  closeHandle: () => void;
  initValue?: CategoryPayload;
};

const CategoryCreateForm: React.FC<CreateFormProps> = ({
  submitHandle,
  closeHandle,
  initValue,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormCategoryInputs>({ mode: 'onChange',
    defaultValues: initValue ? {
      name: initValue.name,
      description: initValue.description,
      imageUrl: initValue.imageUrl,
    } : {} });

  return (
    <>
      <div className="u-paddingMedium">
        <Form.Group sizeControl="large">
          <Form.Input
            type="text"
            placeholder="Name"
            {...register('name', {
              required: 'name is required',
              maxLength: 30,
            })}
          />

          {errors.name?.type === 'required' && (
            <InlineError>Please enter your category name</InlineError>
          )}

          {errors.name?.type === 'maxLength' && (
            <InlineError>Maximum length of name is 30 characters</InlineError>
          )}
        </Form.Group>

        <Form.Group sizeControl="large">
          <Form.Input
            type="text"
            placeholder="Image Url"
            {...register('imageUrl', {
              maxLength: 200,
              required: 'Image url is required',
            })}
          />

          {errors.imageUrl?.type === 'required' && (
            <InlineError>Please enter your category image URL</InlineError>
          )}

          {errors.imageUrl?.type === 'maxLength' && (
            <InlineError>Maximum length of image url is 200 characters</InlineError>
          )}
        </Form.Group>

        <Form.Group sizeControl="large">
          <Form.Input
            type="text"
            placeholder="Description"
            {...register('description', {
              required: 'description is required',
              maxLength: 200,
            })}
          />

          {errors.description?.type === 'required' && (
            <InlineError>Please enter your category description</InlineError>
          )}

          {errors.description?.type === 'maxLength' && (
            <InlineError>Maximum length of description is 200 characters</InlineError>
          )}
        </Form.Group>
      </div>
      <div className="u-backgroundLightest u-paddingMedium u-flex u-alignItemsCenter u-justifyContentEnd">
        <Button
          className="u-marginRightSmall"
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            closeHandle();
          }}
          width="full"
        >
          Close
        </Button>

        <Button width="full" variant="primary" onClick={handleSubmit(submitHandle)}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default CategoryCreateForm;
