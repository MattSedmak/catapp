export const Button = ({ onClick, title, disabled, className }) => {
  return (
    <input
      type='button'
      className={className}
      value={title}
      onClick={() => onClick()}
      disabled={disabled}
    />
  );
};
