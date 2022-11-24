type AuthWarningProps={
  action:string
}

const AuthWarning:React.FC<AuthWarningProps> = ({ action }) => (
  <div>
    <p>
      You need to logged in to
      {' '}
      {action}
    </p>
    <p className="u-text400">Do you want to login now?</p>
  </div>
);

export default AuthWarning;
