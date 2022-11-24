import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

type InlineErrorProps = {
  children: React.ReactNode;
};

const InlineError: React.FC<InlineErrorProps> = ({ children }) => (
  <span className="u-textNegative u-flex u-alignItemsStart u-text200 u-marginTopTiny">
    <FaExclamationCircle
      fontSize={14}
      className="u-marginRightExtraSmall u-marginTopExtraTiny"
    />

    {children}
  </span>
);

export default InlineError;
