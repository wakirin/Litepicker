export class DateTime {

  public static parseDateTime(date, format = 'YYYY-MM-DD', lang = 'en-US') {
    if (!date) return new Date(NaN);

    if (date instanceof Date) return DateTime.getDateZeroTime(new Date(date));
    if (date instanceof DateTime) return date.clone();

    if (/^\d{10,}$/.test(date)) return DateTime.getDateZeroTime(new Date(Number(date)));

    if (typeof date === 'string') {
      const match = format.match(/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}/g);
      if (match) {
        const datePattern = {
          year: 1,
          month: 2,
          day: 3,
          value: '',
        };
        let shortMonths = null;
        let longMonths = null;

        if (match.indexOf('MMM') !== -1) {
          shortMonths = this.MONTH_JS.map(x => new Date(2019, x).toLocaleString(lang, { month: 'short' }));
        }

        if (match.indexOf('MMMM') !== -1) {
          longMonths = this.MONTH_JS
            .map(x => new Date(2019, x).toLocaleString(lang, { month: 'long' }));
        }

        for (const [k, v] of Object.entries(match)) {
          const key = Number(k);
          const value = String(v);

          if (key > 0) datePattern.value += '.*?'; // any delimiter

          switch (value) {
            case 'YY':
            case 'YYYY':
              datePattern.year = key + 1;
              datePattern.value += `(\\d{${value.length}})`;
              break;

            case 'M':
              datePattern.month = key + 1;
              datePattern.value += '(\\d{1,2})';
              break;

            case 'MM':
              datePattern.month = key + 1;
              datePattern.value += `(\\d{${value.length}})`;
              break;

            case 'MMM':
              datePattern.month = key + 1;
              datePattern.value += `(${shortMonths.join('|')})`;
              break;

            case 'MMMM':
              datePattern.month = key + 1;
              datePattern.value += `(${longMonths.join('|')})`;
              break;

            case 'D':
              datePattern.day = key + 1;
              datePattern.value += '(\\d{1,2})';
              break;

            case 'DD':
              datePattern.day = key + 1;
              datePattern.value += `(\\d{${value.length}})`;
              break;
          }
        }

        const dateRegex = new RegExp(`^${datePattern.value}$`);

        if (dateRegex.test(date)) {
          const d = dateRegex.exec(date);

          const year = Number(d[datePattern.year]);
          let month = Number(d[datePattern.month]) - 1;

          if (shortMonths) {
            month = shortMonths.indexOf(d[datePattern.month]);
          } else if (longMonths) {
            month = longMonths.indexOf(d[datePattern.month]);
          }
          const day = Number(d[datePattern.day]) || 1;

          return new Date(year, month, day, 0, 0, 0, 0);
        }
      }
    }

    return DateTime.getDateZeroTime(new Date(date));
  }

  public static convertArray(array, format) {
    return array
      .map((d) => {
        if (d instanceof Array) {
          return d.map(d1 => new DateTime(d1, format));
        }
        return new DateTime(d, format);
      });
  }

  public static getDateZeroTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  }

  private static readonly MONTH_JS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  protected lang;

  private dateInstance;

  constructor(date = null, format: string = null, lang = 'en-US') {
    if (format) {
      this.dateInstance = (DateTime.parseDateTime(date, format, lang));
    } else if (date) {
      this.dateInstance = (DateTime.parseDateTime(date));
    } else {
      this.dateInstance = (DateTime.parseDateTime(new Date()));
    }

    this.lang = lang;
  }

  public toISOString() {
    return this.dateInstance.toISOString();
  }

  public toLocaleString(arg0, arg1) {
    return this.dateInstance.toLocaleString(arg0, arg1);
  }

  public toDateString() {
    return this.dateInstance.toDateString();
  }

  public getSeconds() {
    return this.dateInstance.getSeconds();
  }

  public getDay() {
    return this.dateInstance.getDay();
  }

  public getTime() {
    return this.dateInstance.getTime();
  }

  public getDate() {
    return this.dateInstance.getDate();
  }

  public getMonth() {
    return this.dateInstance.getMonth();
  }

  public getFullYear() {
    return this.dateInstance.getFullYear();
  }

  public setMonth(arg) {
    return this.dateInstance.setMonth(arg);
  }

  public setSeconds(arg) {
    return this.dateInstance.setSeconds(arg);
  }

  public setDate(arg) {
    return this.dateInstance.setDate(arg);
  }

  public setFullYear(arg) {
    return this.dateInstance.setFullYear(arg);
  }

  public getWeek(firstDay) {
    const target = new Date(this.timestamp());
    const dayNr = (this.getDay() + (7 - firstDay)) % 7;
    target.setDate(target.getDate() - dayNr);
    const startWeekday = target.getTime();
    target.setMonth(0, 1);
    if (target.getDay() !== firstDay) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((startWeekday - target.getTime()) / 604800000);
  }

  public clone() {
    return new DateTime(this.getTime());
  }

  public isBetween(date1, date2, inclusivity = '()') {

    switch (inclusivity) {
      default:
      case '()':
        return this.timestamp() > date1.getTime() && this.timestamp() < date2.getTime();

      case '[)':
        return this.timestamp() >= date1.getTime() && this.timestamp() < date2.getTime();

      case '(]':
        return this.timestamp() > date1.getTime() && this.timestamp() <= date2.getTime();

      case '[]':
        return this.timestamp() >= date1.getTime() && this.timestamp() <= date2.getTime();
    }
  }

  public isBefore(date, unit = 'seconds') {
    switch (unit) {
      case 'second':
      case 'seconds':
        return date.getTime() > this.getTime();

      case 'day':
      case 'days':
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
          > new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();

      case 'month':
      case 'months':
        return new Date(date.getFullYear(), date.getMonth(), 1).getTime()
          > new Date(this.getFullYear(), this.getMonth(), 1).getTime();

      case 'year':
      case 'years':
        return date.getFullYear() > this.getFullYear();
    }

    throw new Error('isBefore: Invalid unit!');
  }

  public isSameOrBefore(date, unit = 'seconds') {
    switch (unit) {
      case 'second':
      case 'seconds':
        return date.getTime() >= this.getTime();

      case 'day':
      case 'days':
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
          >= new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();

      case 'month':
      case 'months':
        return new Date(date.getFullYear(), date.getMonth(), 1).getTime()
          >= new Date(this.getFullYear(), this.getMonth(), 1).getTime();
    }

    throw new Error('isSameOrBefore: Invalid unit!');
  }

  public isAfter(date, unit = 'seconds') {
    switch (unit) {
      case 'second':
      case 'seconds':
        return this.getTime() > date.getTime();

      case 'day':
      case 'days':
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime()
          > new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

      case 'month':
      case 'months':
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime()
          > new Date(date.getFullYear(), date.getMonth(), 1).getTime();

      case 'year':
      case 'years':
        return this.getFullYear() > date.getFullYear();
    }

    throw new Error('isAfter: Invalid unit!');
  }

  public isSameOrAfter(date, unit = 'seconds') {
    switch (unit) {
      case 'second':
      case 'seconds':
        return this.getTime() >= date.getTime();

      case 'day':
      case 'days':
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime()
          >= new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

      case 'month':
      case 'months':
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime()
          >= new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    }

    throw new Error('isSameOrAfter: Invalid unit!');
  }

  public isSame(date, unit = 'seconds') {
    switch (unit) {
      case 'second':
      case 'seconds':
        return this.getTime() === date.getTime();

      case 'day':
      case 'days':
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime()
          === new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

      case 'month':
      case 'months':
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime()
          === new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    }

    throw new Error('isSame: Invalid unit!');
  }

  public add(duration, unit = 'seconds') {
    switch (unit) {
      case 'second':
      case 'seconds':
        this.setSeconds(this.getSeconds() + duration);
        break;

      case 'day':
      case 'days':
        this.setDate(this.getDate() + duration);
        break;

      case 'month':
      case 'months':
        this.setMonth(this.getMonth() + duration);
        break;
    }

    return this;
  }

  public subtract(duration, unit = 'seconds') {
    switch (unit) {
      case 'second':
      case 'seconds':
        this.setSeconds(this.getSeconds() - duration);
        break;

      case 'day':
      case 'days':
        this.setDate(this.getDate() - duration);
        break;

      case 'month':
      case 'months':
        this.setMonth(this.getMonth() - duration);
        break;
    }

    return this;
  }

  public diff(date, unit = 'seconds') {
    const oneDay = 1000 * 60 * 60 * 24;

    switch (unit) {
      default:
      case 'second':
      case 'seconds':
        return this.getTime() - date.getTime();

      case 'day':
      case 'days':
        return Math.round((this.timestamp() - date.getTime()) / oneDay);

      case 'month':
      case 'months':
      // @TODO
    }
  }

  public format(format, lang = 'en-US') {
    let response = '';
    const match = format.match(/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}/g);

    if (match) {
      let shortMonths = null;
      let longMonths = null;
      if (match.indexOf('MMM') !== -1) {
        shortMonths = DateTime.MONTH_JS
          .map(x => new Date(2019, x).toLocaleString(lang, { month: 'short' }));
      }

      if (match.indexOf('MMMM')) {
        longMonths = DateTime.MONTH_JS
          .map(x => new Date(2019, x).toLocaleString(lang, { month: 'long' }));
      }

      for (const [k, v] of Object.entries(match)) {
        const key = Number(k);
        const value = String(v);

        if (key > 0) {
          const prev = match[key - 1];
          response += format.substring(format.indexOf(prev) + prev.length, format.indexOf(value));
        }

        switch (value) {
          case 'YY':
            response += String(this.getFullYear()).slice(-2);
            break;

          case 'YYYY':
            response += String(this.getFullYear());
            break;

          case 'M':
            response += String(this.getMonth() + 1);
            break;

          case 'MM':
            response += `0${this.getMonth() + 1}`.slice(-2);
            break;

          case 'MMM':
            response += shortMonths[this.getMonth()];
            break;

          case 'MMMM':
            response += longMonths[this.getMonth()];
            break;

          case 'D':
            response += String(this.getDate());
            break;

          case 'DD':
            response += `0${this.getDate()}`.slice(-2);
            break;
        }
      }
    }

    return response;
  }

  private timestamp() {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0).getTime();
  }

}
