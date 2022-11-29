type AuthWarningProps={
  action:string
}

const AuthWarning:React.FC<AuthWarningProps> = ({ action }) => (
  <div>
    <span className="u-text400 u-block">
      You need to login to
      {' '}
      {action}
    </span>
    <span className="u-text400 u-block u-marginVerticalSmall">Do you want to login now?</span>
  </div>
);

export default AuthWarning;
