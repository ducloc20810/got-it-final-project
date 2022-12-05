import isURL from 'validator/lib/isURL';
import { useForm } from 'react-hook-form';
import { Button, Form } from '@ahaui/react';
import { modalSelector } from 'redux/reducers/modal.reducer';
import { useAppSelector } from 'hooks';
import { isEmpty } from 'utils/library';
import { TABLE_ITEM_NAME_REGEX } from 'constants/validation';
import { IFormCategoryInputs } from 'types/form';
import { InlineError } from 'components/Common';
import { CategoryPayload } from 'pages/Categories/CategoriesType';

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
    formState: { errors, isValid, isDirty },
  } = useForm<IFormCategoryInputs>({
    mode: 'onChange',
    defaultValues: initValue
      ? {
        name: initValue.name,
        description: initValue.description,
        imageUrl: initValue.imageUrl,
      }
      : {},
  });
  const { isLoading } = useAppSelector(modalSelector);

  return (
    <Form>
      <div className="u-paddingMedium">
        <Form.Group sizeControl="large">
          <Form.Input
            type="text"
            placeholder="Name"
            {...register('name', {
              maxLength: {
                value: 30,
                message: 'Maximum length of name is 30 character.',
              },
              validate: {
                isEmpty: (value: string) => isEmpty(value) || 'Please enter your category name.',
              },
              pattern: {
                value: TABLE_ITEM_NAME_REGEX,
                message: 'Website only supports English. ',
              },
            })}
          />

          {errors.name && <InlineError>{errors.name.message}</InlineError>}
        </Form.Group>

        <Form.Group sizeControl="large">
          <Form.Input
            type="text"
            placeholder="Image Url"
            {...register('imageUrl', {
              maxLength: {
                value: 200,
                message: 'Maximum length of image URL is 200 characters.',
              },

              validate: {
                isEmpty: (value: string) =>
                  isEmpty(value) || 'Please enter your category image URL.',
                isURL: (value: string) => isURL(value) || 'Please enter a valid URL.',
              },
            })}
          />
          {errors.imageUrl && <InlineError>{errors.imageUrl.message}</InlineError>}
        </Form.Group>

        <Form.Group sizeControl="large">
          <Form.Input
            type="text"
            placeholder="Description"
            {...register('description', {
              maxLength: {
                value: 200,
                message: 'Maximum length of description is 200 characters.',
              },
              validate: {
                isEmpty: (value: string) =>
                  isEmpty(value) || 'Please enter your category description.',
              },

              pattern: {
                value: TABLE_ITEM_NAME_REGEX,
                message: 'Website only supports English.',
              },
            })}
          />

          {errors.description && <InlineError>{errors.description.message}</InlineError>}
        </Form.Group>
      </div>
      <div className="u-backgroundLightest u-paddingMedium u-flex u-alignItemsCenter u-justifyContentEnd u-roundedLarge">
        <Button
          className="u-marginRightSmall"
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            closeHandle();
          }}
          width="full"
          type="button"
        >
          Close
        </Button>

        <Button
          width="full"
          variant="primary"
          onClick={handleSubmit(submitHandle)}
          disabled={isLoading || !isValid || !isDirty}
          type="submit"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </div>
    </Form>
  );
};

export default CategoryCreateForm;
