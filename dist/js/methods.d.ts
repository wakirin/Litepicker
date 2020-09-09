declare module './litepicker' {
    interface Litepicker {
        show(element?: any): any;
        hide(): any;
        getDate(): any;
        getStartDate(): any;
        getEndDate(): any;
        setDate(date: any): any;
        setStartDate(date: any): any;
        setEndDate(date: any): any;
        setDateRange(date1: any, date2: any): any;
        setLockDays(array: any): any;
        setBookedDays(array: any): any;
        setHighlightedDays(array: any): any;
        gotoDate(date: any, idx?: any): any;
        setOptions(options: any): any;
        clearSelection(): any;
        destroy(): any;
    }
}
export {};
