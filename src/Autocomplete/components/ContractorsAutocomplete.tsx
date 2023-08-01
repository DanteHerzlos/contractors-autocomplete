import {
  forwardRef,
  useDeferredValue,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import cl from "../styles/components/Autocomplete.module.css";
import { OptionType } from "../types/AutocompleteTypes";
import Input, { InputRef } from "./UI/Input";
import VirtualList, { VirtualListRef } from "./UI/VirtualList";

export interface ContractorsAutocompleteRef {
  reset: () => void;
}

interface AutocompleteProps {
  onCreate?: (value: string) => void;
  onEdit?: (option: OptionType) => void;
  isLoading?: boolean;
  disabled?: boolean;
  defaultValue?: OptionType;
  required?: boolean;
  options?: OptionType[];
  label?: string;
  noOptionsMessage?: string;
  optionHi?: number;
  onChange?: (event: OptionType | null) => void;
  onChangeInput?: (event: string) => void;
}

const ContractorsAutocomplete = forwardRef<
  ContractorsAutocompleteRef,
  AutocompleteProps
>(
  (
    {
      isLoading = false,
      disabled = false,
      defaultValue,
      required,
      optionHi = 68,
      options,
      label = "",
      noOptionsMessage = "Нет элементов",
      onCreate,
      onEdit,
      onChange,
      onChangeInput,
    },
    ref,
  ) => {
    const inputRef = useRef<InputRef>(null);
    const optionsRef = useRef<VirtualListRef>(null);
    const [isFilteredList, setIsFilteredList] = useState<boolean>(false);
    const [filteredList, setFilteredList] = useState<OptionType[]>(
      options || [],
    );
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(
      defaultValue || null,
    );
    const deferredFilteredList = useDeferredValue(filteredList);

    useEffect(() => {
      if (options !== filteredList) setFilteredList(options || []);
    }, [options]);

    useImperativeHandle(ref, () => ({
      reset() {
        inputRef.current?.reset();
      },
    }));

    return (
      <div className={cl.container}>
        <Input
          onCreate={onCreate}
          disabled={disabled}
          isLoading={isLoading}
          defaultValue={defaultValue}
          required={required}
          ref={inputRef}
          onChange={onChange}
          onChangeInput={onChangeInput}
          setFilteredList={setFilteredList}
          filteredList={deferredFilteredList}
          isFilteredList={isFilteredList}
          setIsFilteredList={setIsFilteredList}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
          label={label}
          options={options || []}
          optionsRef={optionsRef}
        />
        <VirtualList
          onEdit={onEdit}
          optionHi={optionHi}
          ref={optionsRef}
          isDefOptions={deferredFilteredList !== filteredList}
          options={deferredFilteredList}
          selectedOption={selectedOption}
          visible={isFilteredList && !isLoading}
          noOptionMessage={noOptionsMessage}
          inputRef={inputRef}
        />
      </div>
    );
  },
);

export default ContractorsAutocomplete;
