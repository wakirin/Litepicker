import './style.css';

const MultiselectEvent = {
  SELECT: 'multiselect.select',
  DESELECT: 'multiselect.deselect',
  MULTI_SELECT: 'multiselect.multi.select',
  MULTI_DESELECT: 'multiselect.multi.deselect',
}

Litepicker.add('multiselect', {
  init: function (picker) {
    Object.defineProperties(picker, {
      multipleDates: {
        value: [],
        enumerable: true,
        writable: true,
      },
      preMultipleDates: {
        value: [],
        writable: true,
      },
    });

    const defaultOptions = {
      max: null,
    };
    picker.options.multiselect = { ...defaultOptions, ...picker.options.multiselect };

    picker.options.autoApply = picker.options.inlineMode;
    picker.options.showTooltip = false;

    const previewPreSelect = () => {
      const days = picker.preMultipleDates.length;
      const previewEl = picker.ui.querySelector('.preview-date-range');
      if (previewEl && days > 0) {
        const pluralName = picker.pluralSelector(days);
        const pluralText = picker.options.tooltipText[pluralName]
          ? picker.options.tooltipText[pluralName]
          : `[${pluralName}]`;
        const text = `${days} ${pluralText}`;
        previewEl.innerText = text;
      }
    }

    /**
     * Removes `time` and emits `events`
     * 
     * `time` - time
     * `events` - list of events, 
     * 
     * @param {{ 
     *   time: number, 
     *   events: Array<string>,
     *  }} paramObj
     */
    const removeTime = ({ time, events = [MultiselectEvent.DESELECT]}) => {
      picker.preMultipleDates = picker.preMultipleDates.filter(x => x !== time);

      emitEvents({ events, payload: picker.DateTime(time) })
    }

    /**
     * Removes multiple `times` and 
     * Emits `events`
     * 
     * `times` - time list
     * `events` - list of events, 
     * 
     * @param {{ 
     *  times: Array<number>, 
     *  events: Array<string>,
     * }} paramObj
     */
    const removeMultipleTimes = ({ times, events = [MultiselectEvent.MULTI_DESELECT]}) => {
      picker.preMultipleDates = picker.preMultipleDates.filter(x => !times.include(x));

      emitEvents({ events, payload: formatPayload({ times }) })
    }

    /**
     * Adds `time` and emits `events`
     * 
     * `time` - time
     * `events` - list of events, 
     * 
     * @param {{ 
     *   time: number, 
     *   events: Array<string>,
     *  }} paramObj
     */
    const addTime = ({ time, events = [MultiselectEvent.SELECT]}) => {
      picker.preMultipleDates.push(time);

      emitEvents({ events, payload: picker.DateTime(time) })
    }

    /**
     * Adds multiple `times` and 
     * Emits `events`
     * 
     * `times` - time list
     * `events` - list of events, 
     * 
     * @param {{ 
     *  times: Array<number>, 
     *  events: Array<string>,
     * }} paramObj
     * 
     */
    const addMultipleTimes = ({ times , events = [MultiselectEvent.MULTI_SELECT] }) => {
      picker.preMultipleDates = [...picker.preMultipleDates, ...times];
      
      emitEvents({ events, payload: formatPayload({times}) })
    }

    /**
     * Maps `times` to `DateTime` array
     * 
     * @param {{times: Array<number>}} paramObj
     * 
     * @returns 
     */
    const formatPayload = ({ times }) => {
      return times.map(time => picker.DateTime(time));
    }

    /**
     * Emits every `event` with `payload`
     * 
     * @param {{ events: Array<string>, payload: any }} paramObj
     */
    const emitEvents = ({ events, payload }) => {
      events.forEach(event => {
        picker.emit(event, payload);
      })
    }

    const finalizeBeforeClick = () => {
      if (picker.options.autoApply) {
        picker.emit('button:apply');
      }

      picker.render();

      previewPreSelect();
    }

    picker.on('before:show', () => {
      picker.preMultipleDates = [...picker.multipleDates];
    });

    picker.on('show', () => {
      previewPreSelect();
    });

    picker.on('before:click', (target) => {
      if (target.classList.contains('day-item')) {
        picker.preventClick = true;

        if (target.classList.contains('is-locked')) {
          target.blur();
          return;
        }

        const time = Number(target.dataset.time);

        if (target.classList.contains('is-selected')) {
          removeTime({ time, events: [MultiselectEvent.DESELECT] })
        }
        else {
          addTime({ time, events: [MultiselectEvent.SELECT] })
        }

        finalizeBeforeClick();
      }
    });

    picker.on('render:day', (day) => {
      const isSelected = picker.preMultipleDates.filter(x => x === Number(day.dataset.time)).length;
      const optionMax = Number(picker.options.multiselect.max);

      if (isSelected) {
        day.classList.add('is-selected');
      }
      else if (optionMax && picker.preMultipleDates.length >= optionMax) {
        day.classList.add('is-locked');
      }
    });

    picker.on('button:cancel', () => {
      picker.preMultipleDates.length = 0;
    });

    picker.on('button:apply', () => {
      picker.multipleDates = [...picker.preMultipleDates].sort((a, b) => a - b);
    });

    picker.on('clear:selection', () => {
      picker.clearMultipleDates();

      picker.render();
    });

    /**
     * Deselects Date and
     * Emits every `event` from `events`
     * 
     * `events` - by default => `['multiselect.deselect']`
     * 
     * @param {Date | string | number} date 
     * @param {{events: Array<string>}} paramObj 
     */
    picker.deselectDate = (date, { events = [MultiselectEvent.DESELECT] } = {}) => {
      const time = new Date(date).getTime();

      removeTime({ time, events })
      
      finalizeBeforeClick();
    }

    /**
     * Deselects multiple Dates and
     * Emits every `event` from `events`
     * 
     * `events` - by default => `['multiselect.multi.deselect']`
     * 
     * @param {Date[] | string[] | number[]} dates
     * @param {{events: Array<string>}} paramObj 
     */
     picker.deselectMultipleDates = (dates, { events = [MultiselectEvent.MULTI_DESELECT] } = {}) => {
      const times = dates.map(date => new Date(date).getTime());

      removeMultipleTimes({ times, events })
      
      finalizeBeforeClick();
    }
    
    /**
     * Selects Date and
     * Emits every event from `events`
     * 
     * `events` - by default => `['multiselect.select']`
     * 
     * @param {Date | string | number} date 
     * @param {{events: Array<string>}} paramObj 
     */
    picker.selectDate = (date, { events = [MultiselectEvent.SELECT] } = {}) => {
      const time = new Date(date).getTime();

      addTime({ time, events })
    
      finalizeBeforeClick();
    }

    /**
     * Selects multiple Dates and
     * Emits every `event` from `events`
     * 
     * `events` - by default => `['multiselect.multi.select']`
     * 
     * @param {Date[] | string[] | number[]} dates
     * @param {{events: Array<string>}} paramObj 
     */
    picker.selectMultipleDates = (dates, { events = [MultiselectEvent.MULTI_SELECT] } = {}) => {
      const times = dates.map(date => new Date(date).getTime());

      addMultipleTimes({ times, events })
      
      finalizeBeforeClick();
    }

    picker.clearMultipleDates = () => {
      picker.preMultipleDates.length = 0;
      picker.multipleDates.length = 0;
    }

    picker.getMultipleDates = () => {
      return picker.multipleDates.map(x => picker.DateTime(x));
    }

    picker.multipleDatesToString = (format = 'YYYY-MM-DD', delimiter = ',') => {
      return picker.multipleDates.map(x => picker.DateTime(x).format(format)).join(delimiter);
    }
  }
})
