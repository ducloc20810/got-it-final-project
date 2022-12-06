import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Button, Loader } from '@ahaui/react';
import { getUserInfo, login } from 'redux/actions/user.action';
import { IFormLoginInputs } from 'types/form';
import { EMAIL_REGEX } from 'constants/validation';
import { useTypedDispatch } from 'hooks';
import { isEmpty } from 'utils/library';
import { ReactComponent as Logo } from 'assets/images/logo-only.svg';
import { InlineError } from 'components/Common';
import styles from './Login.module.scss';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<IFormLoginInputs>({ mode: 'onChange' });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const location = useLocation();
  const prevPath = location.state?.prevPath || '/';

  const handleLoginSubmit = (data: IFormLoginInputs) => {
    if (data.email && data.password) {
      setIsLoading(true);

      dispatch(login(data.email, data.password))
        .then(() => dispatch(getUserInfo()))
        .then(() => {
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
    setFocus('email');
  }, [setFocus]);

  return (
    <Form
      className={classNames(
        styles.login,
        'u-backgroundWhite u-paddingVerticalMedium u-paddingHorizontalMedium u-positionAbsolute u-positionCenter u-flex u-flexColumn u-shadowMedium u-roundedMedium',
      )}
    >
      <Logo width={40} height={40} className="u-marginLeftAuto u-marginRightAuto" />
      <h1 className="u-textCenter u-marginTopExtraSmall u-marginBottomMedium u-text800">
        Login to Hello
      </h1>
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
        to="/signup"
        className="u-marginLeftAuto u-marginBottomSmall u-textPrimary hover:u-textPrimary hover:u-textUnderline"
      >
        Create account
      </Link>

      {!isLoading && (
        <Button
          variant="primary"
          size="large"
          className="u-backgroundPrimary hover:u-background"
          onClick={handleSubmit(handleLoginSubmit)}
          type="submit"
        >
          Login
        </Button>
      )}
      {isLoading && <Loader className="u-marginAuto" />}
    </Form>
  );
};

export default Login;
