import type { Block } from "../block";
import Store, { StoreEvents } from "./Store";

function connect(Component: typeof Block) {
  return class extends Component {
    constructor(...args: any) {
      super(...args);
      Store.on(StoreEvents.STORE_UPD, () => {
        console.log("store updated");
        this.setProps({ ...Store.getState() });
      });
    }
  };
}

export default connect;
