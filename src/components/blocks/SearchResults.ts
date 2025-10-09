import { Block } from "../../services/block";

import { SearchResultsItem } from "../partials";

import type { IBlockProps } from "../../types/services/block/Block";
import type { TUserDetails } from "../../types/services/store/Store";
import { BaseController } from "../../controllers/Controller";

class SearchResults extends Block {
  constructor(props: IBlockProps) {
    const results = props.results as unknown as TUserDetails[] || [];

    super({
      ...props,
      SearchResultItems: results.map((user: any) => new SearchResultsItem({
        displayName: user.display_name,
        firstName: user.first_name,
        avatar: user.avatar,
        id: user.id,
      })),
      isVisible: props.isVisible,
      events: {
        mouseleave: () => {
          BaseController.store.set("searchResults", []);
          this.setProps({ isVisible: false });
        },
      },
    });
  }

  override componentDidUpdate(_oldProps: IBlockProps, newProps: IBlockProps): boolean {
    if (Array.isArray(newProps.results)) {
      console.log(newProps.results);
      this.setList("SearchResultItems", newProps.results.map((user: any) => new SearchResultsItem({
        displayName: user.display_name,
        firstName: user.first_name,
        avatar: user.avatar,
        id: user.id,
      })));
    }
    return true;
  }

  override render() {
    return `
      <div class="search-results {{#unless isVisible}}hidden{{/unless}}">
        <ul class="search-results__list">
          {{{ blockList "SearchResultItems" }}}
        </ul>
      </div>
    `;
  }
}

export default SearchResults;
