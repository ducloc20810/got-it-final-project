type DeleteWarningProps={
  itemName:string
}
const DeleteWarning:React.FC<DeleteWarningProps> = ({ itemName }) => (
  <div>
    <p>
      Are you sure you want to delete
      {' '}
      <b>{itemName}</b>
    </p>
  </div>
);

export default DeleteWarning;
