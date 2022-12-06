import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Loader } from '@ahaui/react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import {
  register as myRegister,
  login,
  getUserInfo,
} from 'redux/actions/user.action';
import { EMAIL_REGEX, NAME_REGEX } from 'constants/validation';
import { isEmpty } from 'utils/library';
import { IFormSignUpInputs } from 'types/form';
import { useTypedDispatch } from 'hooks';
import { InlineError } from 'components/Common';
import { ReactComponent as Logo } from 'assets/images/logo-only.svg';
import styles from './SignUp.module.scss';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<IFormSignUpInputs>({ mode: 'onChange' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const location = useLocation();
  const prevPath = location.state?.prevPath || '/';

  const handleSignUpSubmit = (data: IFormSignUpInputs) => {
    if (data.email && data.password && data.name) {
      setIsLoading(true);
      const { email, name, password } = data;
      dispatch(myRegister(name, email, password))
        .then(() => dispatch(login(email, password)))
        .then(() => dispatch(getUserInfo()))
        .then(() => {
          setIsLoading(false);
          if (prevPath !== '/login' && prevPath !== '/signup') {
            navigate(prevPath);
          }
          else {
            navigate('/');
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <Form
      className={classNames(
        styles.signUp,
        'u-backgroundWhite u-paddingVerticalMedium u-paddingHorizontalMedium u-positionAbsolute u-positionCenter u-flex u-flexColumn u-shadowMedium u-roundedMedium',
      )}
    >
      <Logo
        width={40}
        height={40}
        className="u-marginLeftAuto u-marginRightAuto"
      />
      <h1 className="u-textCenter u-marginTopExtraSmall u-marginBottomMedium u-text800">
        Register to Hello
      </h1>

      <Form.Group sizeControl="large">
        <Form.Input
          type="text"
          placeholder="Your name"
          {...register('name', {
            validate: {
              isEmpty: (value: string) =>
                isEmpty(value) || 'Please enter your name',
            },
            maxLength: {
              value: 30,
              message: 'Maximum length of name is 30 characters',
            },
            pattern: {
              value: NAME_REGEX,
              message: 'Name should not contain any special characters, numbers or have more than one space between words',
            },
          })}
        />
        {errors.name && <InlineError>{errors.name.message}</InlineError>}
      </Form.Group>

      <Form.Group sizeControl="large">
        <Form.Input
          type="text"
          placeholder="Email"
          {...register('email', {
            pattern: {
              value: EMAIL_REGEX,
              message: 'Email is invalid',
            },
            maxLength: {
              value: 30,
              message: 'Maximum length of email is 30 characters',
            },
            validate: {
              isEmpty: (value: string) =>
                isEmpty(value) || 'Please enter your email',
            },
          })}
        />
        {errors.email && <InlineError>{errors.email.message}</InlineError>}

      </Form.Group>

      <Form.Group sizeControl="large">
        <Form.Input
          type="password"
          placeholder="Password"
          {...register('password', {
            validate: {
              isEmpty: (value: string) =>
                isEmpty(value) || 'Please enter your password',
            },
            minLength: {
              value: 6,
              message: 'Password should be at least 6 characters',
            },
          })}
        />

        {errors.password && <InlineError>{errors.password.message}</InlineError>}
      </Form.Group>

      <Link
        to="/login"
        className="u-marginLeftAuto u-marginBottomSmall u-textPrimary hover:u-textPrimary hover:u-textUnderline"
        state={
          { prevPath }
        }
      >
        I already have an account
      </Link>

      {!isLoading && (
        <Button
          variant="primary"
          size="large"
          className="u-backgroundPrimary hover:u-background"
          onClick={handleSubmit(handleSignUpSubmit)}
          type="submit"
        >
          Register
        </Button>
      )}
      {isLoading && <Loader className="u-marginAuto" />}
    </Form>
  );
};

export default SignUp;
