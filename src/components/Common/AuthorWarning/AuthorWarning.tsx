import { Button } from '@ahaui/react';
import { useEffect, useRef } from 'react';

type AuthorWarningProps = {
  itemName: string;
  confirmHandle: () => void;
};
const AuthorWarning: React.FC<AuthorWarningProps> = ({ itemName, confirmHandle }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const keyUpEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && buttonRef.current) {
        buttonRef.current.click();
      }
    };

    window.addEventListener('keyup', keyUpEventHandler);

    return () => {
      window.removeEventListener('keyup', keyUpEventHandler);
    };
  }, []);

  return (
    <div>
      <span className="u-text400 u-block u-marginSmall">
        You are not the author of
        {' '}
        <b>{itemName}</b>
      </span>
      <div className="u-backgroundLightest u-paddingExtraSmall u-flex u-alignItemsCenter u-justifyContentEnd u-marginTopSmall">
        <Button variant="primary" onClick={confirmHandle} ref={buttonRef}>
          Okay
        </Button>
      </div>
    </div>
  );
};

export default AuthorWarning;
