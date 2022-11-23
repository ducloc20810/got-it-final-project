import { Button } from "@ahaui/react";
import { useTypedDispatch } from "hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { clearModal } from "redux/actions/modal.action";

type AuthorizationWarningProps = {
  action: string;
};

const AuthorizationWarning: React.FC<AuthorizationWarningProps> = ({
  action,
}) => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  return (
    <div>
      <p className="u-text500">You need to login to {action}!</p>

      <p className="u-text400">Do you want to login now?</p>

      <div className="u-backgroundLightest u-paddingHorizontalMedium u-paddingVerticalSmall u-flex u-alignItemsCenter u-justifyContentBetween">
        <Button
          variant="secondary"
          onClick={() => dispatch(clearModal())}
          width="full"
          className="u-marginRightMedium"
        >
          Cancel
        </Button>

        <Button
          width="full"
          variant="primary"
          onClick={() => {
            dispatch(clearModal());
            navigate("/login");
          }}
        >
          Okay
        </Button>
      </div>
    </div>
  );
};

export default AuthorizationWarning;
