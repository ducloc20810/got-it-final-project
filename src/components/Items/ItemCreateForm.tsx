import { Button, Form } from '@ahaui/react';
import { useForm } from 'react-hook-form';
import isURL from 'validator/lib/isURL';
import { InlineError } from 'components/Common';
import { IFormItemInputs } from 'types/form';
import { modalSelector } from 'redux/reducers/modal.reducer';
import { ItemPayload } from 'pages/Items/ItemsType';
import { useAppSelector } from 'hooks';

type CreateFormProps = {
  submitHandle: (data: IFormItemInputs) => void;
  closeHandle: () => void;
  initValue?: ItemPayload;
};

const ItemCreateForm: React.FC<CreateFormProps> = ({
  submitHandle,
  closeHandle,
  initValue,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormItemInputs>({ mode: 'onChange',
    defaultValues: initValue ? {
      description: initValue.description,
      imageUrl: initValue.imageUrl,
    } : {} });

  const { isLoading } = useAppSelector(modalSelector);
  return (
    <>
      <div className="u-paddingMedium">
        <Form.Group sizeControl="large">
          <Form.Input
            type="text"
            placeholder="Image Url"
            {...register('imageUrl', {
              maxLength: 200,
              required: 'Image url is required',
              validate: isURL,
            })}
          />

          {errors.imageUrl?.type === 'required' && (
            <InlineError>Please enter your item image URL</InlineError>
          )}

          {errors.imageUrl?.type === 'validate' && (
          <InlineError>Please enter a valid URL</InlineError>
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
            <InlineError>Please enter your item description</InlineError>
          )}

          {errors.description?.type === 'maxLength' && (
            <InlineError>Maximum length of description is 200 characters</InlineError>
          )}
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
        >
          Close
        </Button>

        <Button width="full" variant="primary" onClick={handleSubmit(submitHandle)} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </div>
    </>
  );
};

export default ItemCreateForm;
