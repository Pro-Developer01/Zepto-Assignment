import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import "../ChipComponent.css";

interface Chip {
  id: number;
  label: string;
}

const ChipComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: string[] = [
    "John Doe",
    "Jane Smith",
    "Nick Giannopoulos",
    "Alice Johnson",
    "Alison George",
    "Berkley Hudson",
    "Jhon wick",
  ];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // if (value.trim() === "") {
    //   setFilteredItems([]);
    // } else {
      const filtered = items.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    // }
  };

  const handleChipClick = (item: string) => {
    setChips((prevChips) => [...prevChips, { id: Date.now(), label: item }]);
    setInputValue("");
    setFilteredItems(
      filteredItems.filter((filteredItem) => filteredItem !== item)
    );
  };

  const handleChipRemove = (id: number) => {
    const removedChip = chips.find((chip) => chip.id === id);
    if (removedChip) {
      setChips(chips.filter((chip) => chip.id !== id));
      setFilteredItems([...filteredItems, removedChip.label]);
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
      // Highlight and remove the last chip when backspace is pressed with an empty input
      const lastChip = chips[chips.length - 1];
      handleChipRemove(lastChip.id);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <center>
      <div style={{
          fontSize : 30,
          color : "#800080",
          fontFamily: "Times New Roman",
      }}>
        Pick users
      </div>
      <div className="chip-container-wrapper">
        <div
          className="chip-container"
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          {/* //chips  */}
          {/* <div className="chips"> */}
          {chips.map((chip) => (
            <div key={chip.id} className="chip">
              {chip.label}
              <button
                className="remove"
                onClick={() => handleChipRemove(chip.id)}
              >
                X
              </button>
            </div>
          ))}
          {/* </div> */}
          {/* //input Element  */}

          <div>
            <span>{inputValue ? inputValue : "Type user name.." }</span>
          </div>

          <input
            placeholder="Add new user..."
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            // onClick={inputClickHandler}
            className="input"
            // style={{width:`${inputValue?.length*12||4}px`}}
          />
        </div>

        <ul className="item-list">
          {filteredItems.map((item) => (
            <li key={item} onClick={() => handleChipClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </center>
  );
};

export default ChipComponent;
