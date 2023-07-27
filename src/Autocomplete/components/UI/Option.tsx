import { OptionType } from "Autocomplete/types/AutocompleteTypes";
import cl from "../../styles/components/UI/Option.module.css";
import EditIcon from "../icons/EditIcon";
import IconButton from "./IconButton";

interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
  onEdit?: (option: OptionType) => void;
  highlight?: string;
  isSelected: boolean;
  isHovered: boolean;
  option: OptionType;
  optionRef: React.LegacyRef<HTMLDivElement>;
}

export function Option({
  onEdit,
  highlight,
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

  function highlighter(text: string) {
    if (highlight) {
      const start = text.toLowerCase().indexOf(highlight.toLowerCase());
      if (start !== -1) {
        const end = start + highlight.length;
        return (
          <>
            {text.slice(0, start)}
            <b>{text.slice(start, end)}</b>
            {text.slice(end)}
          </>
        );
      }
    }
    return <>{text}</>;
  }

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
        <span className={cl.name}>{highlighter(option.name)}</span>
        <div className={cl.codes}>
          {option.inn && <span>ИНН: {highlighter(option.inn)}</span>}
          {option.kpp && <span>КПП: {highlighter(option.kpp)}</span>}
          {option.ogrn && <span>ОГРН: {highlighter(option.ogrn)}</span>}
        </div>
      </div>
      <IconButton onClick={editHandler} type="button">
        <EditIcon className={cl.editBtn} />
      </IconButton>
    </div>
  );
}
