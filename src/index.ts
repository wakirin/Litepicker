import { Litepicker } from './litepicker';
import './methods';

if (window instanceof Window) {
  window.Litepicker = Litepicker;
}

export { Litepicker };
export default Litepicker;
