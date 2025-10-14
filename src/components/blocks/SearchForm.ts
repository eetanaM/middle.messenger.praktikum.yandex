import { Block } from "../../services/block";
import connect from "../../services/store/connect";

import { FormInput } from "../partials";
import SearchResults from "./SearchResults";

import type { IBlockProps } from "../../types/services/block/Block";

class SearchForm extends Block {
  constructor(props?: IBlockProps) {
    const ConnectedSearchResults = connect((state) => ({
      results: state.searchResults || [],
      isVisible: true,
    }))(SearchResults);
    const SearchResultsComponent = new ConnectedSearchResults();

    super({
      ...props,
      SearchInput: new FormInput({
        type: 'text',
        name: 'search',
        placeholder: 'Поиск',
        attr: { autocomplete: "off" },
      }),
      SearchResults: SearchResultsComponent,
    });
  }

  override render() {
    return `
      <form class="menu__menu-search">
        {{{ SearchInput }}}
        {{{ SearchResults }}}
      </form>
    `;
  }
}

export default SearchForm;
