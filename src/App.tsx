import { OptionType } from "Autocomplete/types/AutocompleteTypes";
import "./App.css";
import { useState } from "react";
import ContractorsAutocomplete from "Autocomplete/components/ContractorsAutocomplete";

const getRandom = (length: number) => {
  const max = 10 ** length - 1;
  const min = 10 ** (length - 1);
  return Math.round(Math.random() * (max - min) + min);
};

const el: OptionType[] = [];
for (let i = 0; i < 1000; i++) {
  el.push({
    name: "element " + i,
    inn: getRandom(10).toString(),
    ogrn: getRandom(13).toString(),
    kpp: getRandom(9).toString(),
  });
}

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  setTimeout(() => {
    setIsLoading(true);
  }, 3000);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        justifyContent: "center",
      }}
    >
      <form>
        <ContractorsAutocomplete
          onCreate={(e) => console.log(e)}
          onEdit={(e) => console.log(e)}
          required
          onChange={(e) => console.log(e)}
          label="elements"
          options={el}
        />
      </form>
      {/*     <Autocomplete grouped label="elements" options={groupedEl} />
      <Select options={el} />
      <MuiAutocomplete
        id="combo-box-demo"
        options={el}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
*/}
    </div>
  );
};

export default App;
