export const InputField = ({ onChange, name }) => {
  return (
    <input
      type='text'
      className='input-field'
      placeholder='Ange ett namn på katten'
      size='30'
      value={name}
      onChange={onChange}
    />
  );
};
