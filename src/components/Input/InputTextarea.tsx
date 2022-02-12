import { FC } from "react";

interface Props {
  label: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const InputTextarea: FC<Props> = ({ label, state, setState }) => {
  return (
    <>
      <label>
        <span>{label}</span>
        <textarea
          required
          onChange={(e) => setState(e.target.value)}
          value={state}
        />
      </label>
    </>
  );
};

export default InputTextarea;
