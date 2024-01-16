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
const items: string[] = [
  "John Doe",
  "Jane Smith",
  "Nick Giannopoulos",
  "Alice Johnson",
];

const ShashanksChipComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("target", inputRef.current?.offsetWidth);

    setInputValue(value);

    if (value.trim() === "") {
      setFilteredItems([]);
    } else {
      const filtered = items.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    }
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

  const inputClickHandler = () => {
    if (chips?.length >= items?.length) return;

    setFilteredItems(filteredItems?.length ? filteredItems : items);
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
          <span>{inputValue}</span>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onClick={inputClickHandler}
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
  );
};

export default ShashanksChipComponent;
