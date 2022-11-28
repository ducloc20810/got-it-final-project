import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Loader } from '@ahaui/react';
import { useForm } from 'react-hook-form';
import { ReactComponent as Logo } from 'assets/images/logo-only.svg';
import { useTypedDispatch } from 'hooks';
import { getUserInfo, login } from 'redux/actions/user.action';
import { InlineError } from 'components/Common';
import { IFormLoginInputs } from 'types/form';
import classNames from 'classnames';
import { EMAIL_REGEX } from 'constants/validation';
import styles from './Login.module.scss';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
            required: 'Email is required',
            pattern: EMAIL_REGEX,
            maxLength: 30,
          })}
        />

        {errors.email?.type === 'required' && <InlineError>Please enter your email</InlineError>}
        {errors.email?.type === 'pattern' && <InlineError>Email is invalid</InlineError>}

        {errors.email?.type === 'maxLength' && (
          <InlineError>Maximum length of email is 30 characters</InlineError>
        )}
      </Form.Group>

      <Form.Group sizeControl="large">
        <Form.Input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: 6,
          })}
        />

        {errors.password?.type === 'required' && (
          <InlineError>Please enter your password</InlineError>
        )}

        {errors.password?.type === 'minLength' && (
          <InlineError>Password should be at least 6 characters</InlineError>
        )}
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
        >
          Login
        </Button>
      )}
      {isLoading && <Loader className="u-marginAuto" />}
    </Form>
  );
};

export default Login;
