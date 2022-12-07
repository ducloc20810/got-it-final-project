import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import isURL from 'validator/lib/isURL';
import { Button, Form } from '@ahaui/react';
import { isEmpty } from 'utils/library';
import { IFormItemInputs } from 'types/form';
import { modalSelector } from 'redux/reducers/modal';
import { useAppSelector } from 'hooks';
import { TABLE_ITEM_NAME_REGEX } from 'constants/validation';
import { InlineError } from 'components/Common';
import { ItemPayload } from 'components/Items/ItemsType';

type CreateFormProps = {
  submitHandle: (data: IFormItemInputs) => void;
  closeHandle: () => void;
  initValue?: ItemPayload;
};

const ItemCreateForm: React.FC<CreateFormProps> = ({ submitHandle, closeHandle, initValue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setFocus,
  } = useForm<IFormItemInputs>({
    mode: 'onChange',
    defaultValues: initValue
      ? {
        description: initValue.description,
        imageUrl: initValue.imageUrl,
      }
      : {},
  });

  const { isLoading } = useAppSelector(modalSelector);

  useEffect(() => {
    setTimeout(() => {
      setFocus('imageUrl');
    }, 100);
  }, [setFocus]);

  return (
    <Form>
      <div className="u-paddingMedium">
        <Form.Group sizeControl="large">
          <Form.Input
            type="text"
            placeholder="Image Url"
            {...register('imageUrl', {
              maxLength: {
                value: 200,
                message: 'Maximum length of image URL is 200 characters',
              },

              validate: {
                isEmpty: (value: string) =>
                  isEmpty(value) || 'Please enter your item image URL',
                isURL: (value: string) => isURL(value) || 'Please enter a valid URL',
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
                message: 'Maximum length of description is 200 characters',
              },
              validate: {
                isEmpty: (value: string) =>
                  isEmpty(value) || 'Please enter your item description',
              },

              pattern: {
                value: TABLE_ITEM_NAME_REGEX,
                message: 'Website only supports English',
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

export default ItemCreateForm;
