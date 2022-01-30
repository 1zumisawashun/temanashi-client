import { FC } from "react";

interface Props {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}

const InputCheckbox: FC<Props> = ({ state, setState, text }) => {
  return (
    <>
      <div className="checkbox-container">
        {state && (
          <label htmlFor="checkbox-area" className="checkbox">
            <span className="icon -checked"></span>
          </label>
        )}
        {!state && (
          <label htmlFor="checkbox-area" className="checkbox">
            <span className="icon"></span>
          </label>
        )}
        <input
          required
          type="checkbox"
          onChange={() => setState(!state)}
          id="checkbox-area"
          hidden
        />
        <p className="text">{text}</p>
      </div>
    </>
  );
};

export default InputCheckbox;
