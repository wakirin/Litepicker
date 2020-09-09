import { Calendar } from './calendar';
export declare class Litepicker extends Calendar {
    protected triggerElement: any;
    protected backdrop: any;
    private readonly pluralSelector;
    constructor(options: any);
    private onInit;
    private parseInput;
    private updateInput;
    private isSamePicker;
    private shouldShown;
    private shouldResetDatePicked;
    private shouldSwapDatePicked;
    private shouldCheckLockDays;
    private shouldCheckBookedDays;
    private onClick;
    private showTooltip;
    private hideTooltip;
    private shouldAllowMouseEnter;
    private shouldAllowRepick;
    private isDayItem;
    private onMouseEnter;
    private onMouseLeave;
    private onInput;
    private isShowning;
    private loadPolyfillsForIE11;
}
