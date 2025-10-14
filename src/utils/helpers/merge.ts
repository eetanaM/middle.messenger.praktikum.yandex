/* eslint-disable no-param-reassign */
import type { Indexed } from "../../types/services/store/Store";

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  Object.keys(rhs).forEach((p) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(p)) {
      return;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  });

  return lhs;
}

export default merge;
