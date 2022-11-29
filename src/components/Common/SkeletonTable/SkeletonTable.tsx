import { Skeleton } from '@ahaui/react';
import { ITEMS_PER_PAGE } from 'constants/pagination';
import { generateNumberArray } from 'utils/library';

const SkeletonTable = () => (
  <table className="Table u-backgroundWhite u-textDark u-text200">
    <thead>
      <tr>
        <th aria-label="th"><Skeleton /></th>
        <th aria-label="th"><Skeleton /></th>
        <th aria-label="th"><Skeleton /></th>
        <th aria-label="th"><Skeleton /></th>
        <th aria-label="th"><Skeleton /></th>

      </tr>
    </thead>
    <tbody>
      { generateNumberArray(ITEMS_PER_PAGE).map((item) => (
        <tr key={`${item}${Math.random() * 100}`}>
          <td><Skeleton /></td>
          <td width="10%"><Skeleton width="100%" height="50px" /></td>
          <td width="30%"><Skeleton width="100%" /></td>
          <td width="40%"><Skeleton width="100%" /></td>
          <td width="15%"><Skeleton width="100%" /></td>
        </tr>
      ))}

    </tbody>
  </table>
);

export default SkeletonTable;
