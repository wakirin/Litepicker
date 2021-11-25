/* eslint-disable no-param-reassign */
import './style.css';

Litepicker.add('ranges', {
  init(picker) {
    const defaultOptions = {
      position: 'left',
      customRanges: {},
      rangeInputs: false,
      customRangesLabels: ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month'],
      force: false,
      autoApply: picker.options.autoApply,
    };
    picker.options.ranges = { ...defaultOptions, ...picker.options.ranges };
    picker.options.singleMode = false;

    const options = picker.options.ranges;
    const date = picker.DateTime();

    const customInput1 = document.createElement('input');
    customInput1.value = picker.getStartDate().format('MM-DD-YYYY');
    customInput1.dataset.time = picker.getStartDate().getTime();

    const customInput2 = document.createElement('input');
    customInput2.value = picker.getEndDate().format('MM-DD-YYYY');
    customInput2.dataset.time = picker.getEndDate().getTime();

    const thisMonth = (currDate) => {
      const d1 = currDate.clone();
      d1.setDate(1);
      const d2 = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0);

      return [d1, d2];
    };

    const lastMonth = (currDate) => {
      const d1 = currDate.clone();
      d1.setDate(1);
      d1.setMonth(currDate.getMonth() - 1);
      const d2 = new Date(currDate.getFullYear(), currDate.getMonth(), 0);

      return [d1, d2];
    };

    // Set Default ranges if there are no custom ranges specified in options
    if (!Object.keys(options.customRanges).length) {
      options.customRanges = {
        [options.customRangesLabels[0]]: [date.clone(), date.clone()],
        [options.customRangesLabels[1]]: [date.clone().subtract(1, 'day'), date.clone().subtract(1, 'day')],
        [options.customRangesLabels[2]]: [date.clone().subtract(6, 'day'), date],
        [options.customRangesLabels[3]]: [date.clone().subtract(29, 'day'), date],
        [options.customRangesLabels[4]]: thisMonth(date),
        [options.customRangesLabels[5]]: lastMonth(date),
      };
    }

    const input1 = document.createElement('input');
    input1.value = picker.getStartDate().format('MM-DD-YYYY');
    const input2 = document.createElement('input');
    input2.value = picker.getEndDate().format('MM-DD-YYYY');

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
                options.force,
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

      if (options.rangeInputs) {
        input1.setAttribute('type', 'text');
        input1.className = 'form-control';
        input1.id = 'start-date';

        input2.setAttribute('type', 'text');
        input2.className = 'form-control';
        input2.id = 'end-date';

        input1.addEventListener('blur', (e) => {
          const el = e.target;

          if (el) {
            const startDate = picker.DateTime(input1.value);
            const endEnd = picker.DateTime(input2.value);

            if (options.autoApply) {
              picker.setDateRange(
                startDate,
                endEnd,
                options.force,
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

        input2.addEventListener('blur', (e) => {
          const el = e.target;

          if (el) {
            const startDate = picker.DateTime(input1.value);
            const endEnd = picker.DateTime(input2.value);

            if (options.autoApply) {
              picker.setDateRange(
                startDate,
                endEnd,
                options.force,
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

        picker.on('ranges.preselect', (date1, date2) => {
          input1.value = date1.format('MM-DD-YYYY');
          input2.value = date2.format('MM-DD-YYYY');
        });

        picker.on('preselect', (date1, date2) => {
          input1.value = date1.format('MM-DD-YYYY');
          input2.value = date1.format('MM-DD-YYYY');

          if (date2) {
            input2.value = date2.format('MM-DD-YYYY');
          }
        });

        const customButton = document.createElement('button');
        customButton.className = 'custom-button';
        customButton.innerText = 'Custom';
        customButton.tabIndex = ui.dataset.plugins.indexOf('keyboardnav') >= 0 ? 1 : -1;

        const customForm = document.createElement('form');
        customForm.className = 'container__custom-range';

        const customFormGroup = document.createElement('div');
        customFormGroup.className = 'form-group';

        const customDiv1 = document.createElement('div');

        const customLabel1 = document.createElement('label');
        customLabel1.innerText = 'From';

        customDiv1.appendChild(customLabel1);

        const customDiv2 = document.createElement('div');
        customDiv2.className = 'form-control-wrapper';

        const customLabel2 = document.createElement('label');
        customLabel2.innerText = 'To';

        customDiv2.appendChild(customLabel2);

        customFormGroup.appendChild(customDiv1);
        customFormGroup.appendChild(customDiv2);

        customForm.appendChild(customFormGroup);

        customButton.addEventListener('click', (e) => {
          const el = e.target;
          if (el) {
            if (customForm.style.display === 'none') {
              customForm.style.display = 'block';
            } else {
              customForm.style.display = 'none';
            }
          }
        });

        customDiv1.appendChild(input1);
        customDiv2.appendChild(input2);
        block.appendChild(customButton);
        block.appendChild(customForm);
      }

      ui.querySelector('.container__main').prepend(block);
    });
  },
});
