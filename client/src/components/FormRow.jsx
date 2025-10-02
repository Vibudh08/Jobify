const FormRow = ({type, name, labelText,disabled, defaultValue, onChange}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        className="form-input"
        name={name}
        defaultValue={defaultValue || ""}
        onChange={onChange}
        required
        disabled={disabled}
      />
    </div>
  );
};
export default FormRow