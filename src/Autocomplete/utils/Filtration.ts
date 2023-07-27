import { OptionType } from "Autocomplete/types/AutocompleteTypes";

export class Filtration {
  static byString(options: OptionType[], filterString: string): OptionType[] {
    const filterStringLC = filterString.toLowerCase()
    const newArr = [];
    let is_create = true;
    for (let i = 0; i < options.length; i++) {
      if (options[i].name === filterString) {
        is_create = false;
      }
      if (
        options[i].name.toLowerCase().includes(filterStringLC) ||
        (options[i].hasOwnProperty("inn") &&
          options[i].inn!.includes(filterStringLC)) ||
        (options[i].hasOwnProperty("kpp") &&
          options[i].kpp!.includes(filterStringLC)) ||
        (options[i].hasOwnProperty("ogrn") &&
          options[i].ogrn!.includes(filterStringLC))
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
