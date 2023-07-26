import { OptionType } from "Autocomplete/types/AutocompleteTypes";

export class Filtration {
  static byString(options: OptionType[], filterString: string): OptionType[] {
    const newArr = [];
    let is_create = true;
    for (let i = 0; i < options.length; i++) {
      if (options[i].name === filterString) {
        is_create = false;
      }
      if (
        options[i].name.includes(filterString) ||
        (options[i].hasOwnProperty("inn") &&
          options[i].inn!.includes(filterString)) ||
        (options[i].hasOwnProperty("kpp") &&
          options[i].kpp!.includes(filterString)) ||
        (options[i].hasOwnProperty("ogrn") &&
          options[i].ogrn!.includes(filterString))
      ) {
        newArr.push(options[i]);
      }
    }
    if (is_create) newArr.push({ name: filterString, __creatable: true });
    return newArr;
  }

  static byDisabled(options: OptionType[]): OptionType[] {
    const newArr = [];
    for (let i = 0; i < options.length; i++) {
      if (!(options[i] as OptionType).isDisabled) {
        newArr.push(options[i]);
      }
    }
    return newArr;
  }
}
