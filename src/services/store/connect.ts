import type { IBlockProps } from "../../types/services/block/Block";
import type { Indexed } from "../../types/services/store/Store";
import { isEqual } from "../../utils/helpers";
import type { Block } from "../block";
import Store, { StoreEvents } from "./Store";

function connect(storeSelector: (state: Indexed) => Indexed) {
  // eslint-disable-next-line func-names
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: IBlockProps) {
        let state = storeSelector(window.store.getState());

        super({ ...props, ...state });

        window.store.on(StoreEvents.STORE_UPD, () => {
          const newState = storeSelector(window.store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...Store.getState() });
          }

          state = newState;
        });
      }
    };
  };
}

export default connect;
