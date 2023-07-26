import { OptionType } from "Autocomplete/types/AutocompleteTypes";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import IconButton from "./IconButton";
import CloseIcon from "../icons/CloseIcon";
import ArrowDropDownIcon from "../icons/ArrowDropDownIcon";
import cl from "../../styles/components/UI/Input.module.css";
import { VirtualListRef } from "./VirtualList";
import { Filtration } from "Autocomplete/utils/Filtration";
import CircularLoader from "./CircularLoader";

interface InputProps {
  disabled?: boolean;
  isLoading?: boolean;
  defaultValue?: OptionType;
  required?: boolean;
  onChangeInput?: (event: string) => void;
  onChange?: (event: OptionType | null) => void;
  onCreate?: (value: string) => void;
  setSelectedOption: (option: OptionType | null) => void;
  selectedOption: OptionType | null;
  setIsFilteredList: (visible: boolean) => void;
  isFilteredList: boolean;
  filteredList: OptionType[];
  setFilteredList: (option: OptionType[]) => void;
  options: OptionType[];
  label?: string;
  optionsRef: React.RefObject<VirtualListRef>;
}

export interface InputRef {
  selectOption: (option: OptionType) => void;
  getInputValue: () => string;
}

const Input = forwardRef<InputRef, InputProps>(
  (
    {
      onCreate,
      disabled = false,
      isLoading = false,
      defaultValue,
      required,
      options,
      label,
      onChange,
      onChangeInput,
      setSelectedOption,
      selectedOption,
      setIsFilteredList,
      isFilteredList,
      filteredList,
      setFilteredList,
      optionsRef,
    },
    ref,
  ) => {
    const [invalid, setInvalid] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({
      selectOption(option: OptionType) {
        if (!option.hasOwnProperty("__creatable")) {
          selectHandler(option);
        } else if (onCreate) {
          onCreate(option.name);
        }
      },
      getInputValue() {
        return inputRef.current?.value;
      },
    }));

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value;
      if (invalid) setInvalid(false);
      if (onChangeInput) onChangeInput(inputValue);
      setIsFilteredList(true);
      if (inputValue !== "") {
        const newList = Filtration.byString(options, inputValue);
        setFilteredList(newList);
      } else {
        setFilteredList(options);
      }
    };

    const selectHandler = (el: OptionType) => {
      if (el.isDisabled) return;
      if (invalid) setInvalid(false);
      if (onChange) onChange(el);
      if (onChangeInput) onChangeInput(el.name);
      inputRef.current!.value = el.name;
      setSelectedOption(el);
      setIsFilteredList(false);
    };

    const blurHandler = () => {
      if (selectedOption === null) {
        inputRef.current!.value = "";
        if (onChangeInput) onChangeInput("");
        setFilteredList(options);
      } else {
        inputRef.current!.value = selectedOption.name;
        if (onChangeInput) onChangeInput(selectedOption.name);
        const newList = Filtration.byString(options, selectedOption.name);
        setFilteredList(newList);
      }
      setIsFilteredList(false);
    };

    const clearHandler = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      e.preventDefault();
      inputRef.current!.focus();
      inputRef.current!.value = "";
      setFilteredList(options);
      setSelectedOption(null);
      if (onChangeInput) onChangeInput("");
      if (onChange) onChange(null);
    };

    const dropDownHandler = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      e.preventDefault();
      inputRef.current!.focus();
      setIsFilteredList(!isFilteredList);
    };

    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const notDisabled = Filtration.byDisabled(filteredList);
      if (!isFilteredList || notDisabled.length === 0) {
        return;
      }
      if (e.key === "ArrowUp") {
        optionsRef.current!.prevHover();
      }
      if (e.key === "ArrowDown") {
        optionsRef.current!.nextHover();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const hoveredOption = optionsRef.current!.getHovered();
        if (!hoveredOption.hasOwnProperty("__creatable")) {
          selectHandler(hoveredOption);
        } else if (onCreate) {
          onCreate(hoveredOption.name);
        }
      }
    };

    return (
      <>
        <input
          disabled={disabled || isLoading}
          defaultValue={defaultValue ? defaultValue.name : ""}
          onInvalid={(e) => {
            e.preventDefault();
            setInvalid(true);
          }}
          required={required}
          onKeyDown={(e) => keyDownHandler(e)}
          onFocus={() => setIsFilteredList(true)}
          onBlur={blurHandler}
          ref={inputRef}
          placeholder="placeholder"
          className={invalid ? [cl.input, cl._invalid].join(" ") : cl.input}
          onChange={(e) => changeHandler(e)}
          type="text"
        />
        <div onClick={() => inputRef.current?.focus()} className={cl.label}>
          {label}
        </div>
        {isLoading && (
          <CircularLoader style={{ width: "2rem" }} className={cl.loader} />
        )}
        {!isLoading && (
          <IconButton
            disabled={disabled || isLoading}
            onMouseDown={(e) => e.preventDefault()}
            onClick={clearHandler}
            className={cl.close_btn}
          >
            <CloseIcon className={cl.close_btn_icon} />
          </IconButton>
        )}
        <IconButton
          disabled={disabled || isLoading}
          onMouseDown={(e) => e.preventDefault()}
          onClick={dropDownHandler}
          className={cl.drop_btn}
        >
          <ArrowDropDownIcon
            className={
              isFilteredList
                ? [cl.drop_btn_icon, cl._reverse].join(" ")
                : cl.drop_btn_icon
            }
          />
        </IconButton>
        {invalid && (
          <span className={cl.invalid_message}>
            {inputRef.current?.validationMessage}
          </span>
        )}
      </>
    );
  },
);

export default Input;
