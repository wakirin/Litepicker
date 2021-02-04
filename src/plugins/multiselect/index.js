import './style.css';

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
          picker.preMultipleDates = picker.preMultipleDates.filter(x => x !== time);

          picker.emit('multiselect.deselect', picker.DateTime(time));
        }
        else {
          picker.preMultipleDates[picker.preMultipleDates.length] = time;

          picker.emit('multiselect.select', picker.DateTime(time));
        }

        if (picker.options.autoApply) {
          picker.emit('button:apply');
        }

        picker.render();

        previewPreSelect();
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
