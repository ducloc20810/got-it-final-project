import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

type InlineErrorProps = {
  children: React.ReactNode;
};

const InlineError: React.FC<InlineErrorProps> = ({ children }) => (
  <span className="u-textNegative u-flex u-alignItemsStart u-text200 u-marginTopTiny u-justifyContentStart">
    <FaExclamationCircle
      fontSize={14}
      className="u-marginRightExtraSmall u-marginTopExtraTiny"
    />
    <span className="u-textLeft">{children}</span>

  </span>
);

export default InlineError;
