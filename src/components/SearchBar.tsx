import { FC } from "react";
import Input from "./form/Input";
import { useSearchSlice } from "../stores/search";

const SearchBar: FC = () => {
  const searchTerm = useSearchSlice((state) => state.searchTerm);
  const setSearchTerm = useSearchSlice((state) => state.setSearchTerm);

  return <>
    <Input
      type="search"
      label="Search"
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />

    {searchTerm &&
      <p>&quot;{searchTerm}&quot; için arama sonuçları
      </p>
    }
  </>
};

export default SearchBar;
