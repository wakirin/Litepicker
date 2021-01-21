import { Litepicker } from './litepicker';
import './methods';
import './window';

if (window instanceof Window) {
  window.Litepicker = Litepicker;
}

export { Litepicker };
export default Litepicker;
