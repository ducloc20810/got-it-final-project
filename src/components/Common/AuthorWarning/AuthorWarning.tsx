import { Button } from '@ahaui/react';

type AuthorWarningProps={
  itemName:string
  confirmHandle: ()=>void
}
const AuthorWarning:React.FC<AuthorWarningProps> = ({ itemName, confirmHandle }) => (
  <div>
    <span className="u-text400 u-block u-marginSmall">
      You are not the author of
      {' '}
      <b>{itemName}</b>
    </span>

    <div className="u-backgroundLightest u-paddingExtraSmall u-flex u-alignItemsCenter u-justifyContentEnd u-marginTopSmall">
      <Button variant="primary" onClick={confirmHandle}>Okay</Button>
    </div>
  </div>
);

export default AuthorWarning;
