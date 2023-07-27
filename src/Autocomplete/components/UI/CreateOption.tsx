import { OptionType } from "../../types/AutocompleteTypes";
import cl from "../../styles/components/UI/CreateOption.module.css";

interface CreateOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  isHovered: boolean;
  option: OptionType;
  optionRef: React.LegacyRef<HTMLDivElement>;
}

export function CreateOption({
  isHovered,
  option,
  optionRef,
  ...props
}: CreateOptionProps) {
  let optionStyle = "default";
  if (option.isDisabled) {
    optionStyle = "disabled";
  } else if (isHovered) {
    optionStyle = "hovered";
  }

  return (
    <div
      {...props}
      ref={optionRef}
      className={
        {
          default: cl.option,
          hovered: [cl.option, cl._hover].join(" "),
        }[optionStyle]
      }
    >
      <span>
        Создать: "<b>{option.name}</b>"?
      </span>
    </div>
  );
}
