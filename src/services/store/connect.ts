import type { IBlockProps } from "../../types/services/block/Block";
import type { Indexed } from "../../types/services/store/Store";
import { isEqual } from "../../utils/helpers";
import type { Block } from "../block";
import Store, { StoreEvents } from "./Store";

function connect(storeSelector: (state: Indexed) => Indexed) {
  // eslint-disable-next-line func-names
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props?: IBlockProps) {
        let state = storeSelector(Store.getState());

        super({ ...props, ...state });

        Store.on(StoreEvents.STORE_UPD, () => {
          const newState = storeSelector(Store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        });
      }
    };
  };
}

export default connect;
