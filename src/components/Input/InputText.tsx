import { FC } from "react";

interface Props {
  label: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const InputText: FC<Props> = ({ label, state, setState }) => {
  return (
    <>
      <label>
        <span>{label}</span>
        <input
          required
          type="text"
          onChange={(e) => setState(e.target.value)}
          value={state}
        />
      </label>
    </>
  );
};

export default InputText;
