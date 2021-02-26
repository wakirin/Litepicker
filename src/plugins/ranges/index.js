import './style.css';

Litepicker.add('ranges', {
  init: function (picker) {
    const defaultOptions = {
      position: 'left',
      customRanges: {},
      force: false,
      autoApply: picker.options.autoApply,
    };
    picker.options.ranges = { ...defaultOptions, ...picker.options.ranges };

    picker.options.singleMode = false;

    if (!Object.keys(picker.options.ranges.customRanges).length) {
      const date = picker.DateTime();

      const thisMonth = (date) => {
        const d1 = date.clone();
        d1.setDate(1);
        const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        return [d1, d2];
      };

      const lastMonth = (date) => {
        const d1 = date.clone();
        d1.setDate(1);
        d1.setMonth(date.getMonth() - 1);
        const d2 = new Date(date.getFullYear(), date.getMonth(), 0);

        return [d1, d2];
      };

      picker.options.ranges.customRanges = {
        Today: [date.clone(), date.clone()],
        Yesterday: [date.clone().subtract(1, 'day'), date.clone().subtract(1, 'day')],
        'Last 7 Days': [date.clone().subtract(6, 'day'), date],
        'Last 30 Days': [date.clone().subtract(29, 'day'), date],
        'This Month': thisMonth(date),
        'Last Month': lastMonth(date),
      };
    }

    const options = picker.options.ranges;

    picker.on('render', (ui) => {
      const block = document.createElement('div');
      block.className = 'container__predefined-ranges';
      picker.ui.dataset.rangesPosition = options.position;

      Object.keys(options.customRanges).forEach((itemKey) => {
        const values = options.customRanges[itemKey];

        const item = document.createElement('button');
        item.innerText = itemKey;
        item.tabIndex = ui.dataset.plugins.indexOf('keyboardnav') >= 0 ? 1 : -1;
        item.dataset.start = values[0].getTime();
        item.dataset.end = values[1].getTime();
        item.addEventListener('click', (e) => {
          const el = e.target;

          if (el) {
            const startDate = picker.DateTime(Number(el.dataset.start));
            const endEnd = picker.DateTime(Number(el.dataset.end));

            if (options.autoApply) {
              picker.setDateRange(
                startDate,
                endEnd,
                options.force
              );

              picker.emit('ranges.selected', startDate, endEnd);

              picker.hide();
            } else {
              picker.datePicked = [
                startDate,
                endEnd,
              ];

              picker.emit('ranges.preselect', startDate, endEnd);
            }

            if (picker.options.inlineMode || !options.autoApply) {
              picker.gotoDate(startDate);
            }
          }
        });

        block.appendChild(item);
      });

      ui.querySelector('.container__main').prepend(block);
    });
  }
})
