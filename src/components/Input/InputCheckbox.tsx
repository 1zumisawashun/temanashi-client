import { FC } from "react";

interface Props {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const InputCheckbox: FC<Props> = ({ state, setState }) => {
  return (
    <>
      <label>
        <input
          required
          type="checkbox"
          onChange={(e) => setState(e.target.value)}
          value={state}
        />
      </label>
    </>
  );
};

export default InputCheckbox;
