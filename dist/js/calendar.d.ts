import { DateTime } from './datetime';
export declare class Calendar {
    protected options: any;
    protected calendars: DateTime[];
    protected picker: HTMLElement;
    protected datePicked: DateTime[];
    protected nextFocus: HTMLElement;
    protected render(): void;
    protected renderMonth(date: DateTime): HTMLDivElement;
    protected renderDay(date: DateTime): HTMLAnchorElement;
    protected renderFooter(): HTMLDivElement;
    protected renderWeekNumber(date: any): HTMLDivElement;
    protected renderTooltip(): HTMLDivElement;
    protected dateIsBooked(date: any, inclusivity: any): any;
    private weekdayName;
    private calcSkipDays;
}
