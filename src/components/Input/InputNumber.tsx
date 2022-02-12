import { FC } from "react";

interface Props {
  label: string;
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
}

const InputNumber: FC<Props> = ({ label, state, setState }) => {
  return (
    <>
      <label>
        <span>{label}</span>
        <input
          required
          type="number"
          onChange={(e) => setState(Number(e.target.value))}
          value={state}
        />
      </label>
    </>
  );
};

export default InputNumber;
