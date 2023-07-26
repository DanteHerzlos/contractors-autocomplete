import { OptionType } from "Autocomplete/types/AutocompleteTypes";
import cl from "../../styles/components/UI/Option.module.css";
import EditIcon from "../icons/EditIcon";
import IconButton from "./IconButton";

interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
  onEdit?: (option: OptionType) => void;
  isSelected: boolean;
  isHovered: boolean;
  option: OptionType;
  optionRef: React.LegacyRef<HTMLDivElement>;
}

export function Option({
  onEdit,
  isHovered,
  isSelected,
  option,
  optionRef,
  ...props
}: OptionProps) {
  let optionStyle = "default";
  if (option.isDisabled) {
    optionStyle = "disabled";
  } else if (isSelected) {
    optionStyle = "selected";
  } else if (isHovered) {
    optionStyle = "hovered";
  }

  const editHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onEdit) onEdit(option);
  };

  return (
    <div
      {...props}
      ref={optionRef}
      className={
        {
          default: cl.option,
          hovered: [cl.option, cl._hover].join(" "),
          selected: [cl.option, cl._selected].join(" "),
          disabled: [cl.option, cl._disabled].join(" "),
        }[optionStyle]
      }
    >
      <div className={cl.info}>
        <span className={cl.name}>{option.name}</span>

        <div className={cl.codes}>
          <span>ИНН: {option.inn}</span>
          <span>КПП:{option.kpp}</span>
          <span>ОГРН: {option.ogrn}</span>
        </div>
      </div>
      <IconButton onClick={editHandler} type="button">
        <EditIcon className={cl.editBtn} />
      </IconButton>
    </div>
  );
}
