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
    let customActive = false;
    let field1Value = picker.getStartDate().format('MM-DD-YYYY');
    let field2Value = picker.getEndDate().format('MM-DD-YYYY');

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
        [options.customRangesLabels[0]]: [date.clone(), date.clone(), true],
        [options.customRangesLabels[1]]: [date.clone().subtract(1, 'day'), date.clone().subtract(1, 'day'), false],
        [options.customRangesLabels[2]]: [date.clone().subtract(6, 'day'), date, false],
        [options.customRangesLabels[3]]: [date.clone().subtract(29, 'day'), date, false],
        [options.customRangesLabels[4]]: [...thisMonth(date), false],
        [options.customRangesLabels[5]]: [...lastMonth(date), false],
      };
    }

    picker.on('ranges.preselect', (date1, date2) => {
      field1Value = date1.format('MM-DD-YYYY');
      field2Value = date2.format('MM-DD-YYYY');
    });

    picker.on('preselect', (date1, date2) => {
      field1Value = date1.format('MM-DD-YYYY');
      field2Value = date1.format('MM-DD-YYYY');

      if (date2) {
        field2Value = date2.format('MM-DD-YYYY');
      }
    });

    picker.on('render', (ui) => {
      const block = document.createElement('div');
      block.className = 'container__predefined-ranges';
      picker.ui.dataset.rangesPosition = options.position;

      // Set up HTML Elements for Custom Range Group
      const customForm = document.createElement('form');
      customForm.className = 'container__custom-range';
      const customFormGroup = document.createElement('div');
      customFormGroup.className = 'form-group';
      const customDiv1 = document.createElement('div');
      customDiv1.className = 'form-control-wrapper';
      const customLabel1 = document.createElement('label');
      customLabel1.innerText = 'From';
      const customDiv2 = document.createElement('div');
      customDiv2.className = 'form-control-wrapper spacer';
      const customLabel2 = document.createElement('label');
      customLabel2.innerText = 'To';
      const customFieldButton = document.createElement('button');
      customFieldButton.className = `${customActive ? 'custom-button active' : 'custom-button inactive'}`;
      customFieldButton.innerText = 'Custom';
      customFieldButton.tabIndex = ui.dataset.plugins.indexOf('keyboardnav') >= 0 ? 1 : -1;
      const customFieldInput1 = document.createElement('input');
      customFieldInput1.value = customFieldInput1.setAttribute('type', 'text');
      customFieldInput1.className = 'form-control';
      customFieldInput1.id = 'start-date';
      customFieldInput1.value = field1Value;
      customFieldInput1.disabled = !customActive;
      const customFieldInput2 = document.createElement('input');
      customFieldInput2.setAttribute('type', 'text');
      customFieldInput2.className = 'form-control';
      customFieldInput2.id = 'end-date';
      customFieldInput2.value = field2Value;
      customFieldInput2.disabled = !customActive;

      customDiv1.appendChild(customLabel1);
      customDiv2.appendChild(customLabel2);
      customFormGroup.appendChild(customDiv1);
      customFormGroup.appendChild(customDiv2);
      customForm.appendChild(customFormGroup);

      Object.keys(options.customRanges).forEach((itemKey) => {
        const values = options.customRanges[itemKey];

        const item = document.createElement('button');
        item.innerText = itemKey;
        item.tabIndex = ui.dataset.plugins.indexOf('keyboardnav') >= 0 ? 1 : -1;
        item.dataset.start = values[0].getTime();
        item.dataset.end = values[1].getTime();
        item.className = values[2] ? 'active' : 'inactive';

        item.addEventListener('click', (e) => {
          const el = e.target;

          if (el) {
            const startDate = picker.DateTime(Number(el.dataset.start));
            const endEnd = picker.DateTime(Number(el.dataset.end));

            // Update the button state for all buttons
            Object.keys(options.customRanges).forEach((iK) => {
              const val = options.customRanges[iK];
              val[2] = false;
            });

            customActive = false;

            // Set button active
            values[2] = true;

            if (options.autoApply) {
              picker.setDateRange(
                startDate,
                endEnd,
                options.force,
              );

              picker.emit('selected', startDate, endEnd);

              picker.hide();
            } else {
              picker.datePicked = [
                startDate,
                endEnd,
              ];

              picker.emit('preselect', startDate, endEnd);
            }

            if (picker.options.inlineMode || !options.autoApply) {
              picker.gotoDate(startDate);
            }
          }
        });

        block.appendChild(item);
      });

      if (options.rangeInputs) {
        customFieldInput1.addEventListener('keypress', (keydown) => {
          if (keydown.key === 'Enter') {
            customFieldInput1.blur();
          }
        });
        customFieldInput1.addEventListener('blur', (e) => {
          const el = e.target;

          if (el) {
            let startDate = picker.DateTime(customFieldInput1.value);
            const endEnd = picker.DateTime(customFieldInput2.value);

            if (endEnd.getTime() < startDate.getTime()) {
              startDate = picker.DateTime(customFieldInput2.value);
            }

            if (options.autoApply) {
              picker.setDateRange(
                startDate,
                endEnd,
                options.force,
              );

              picker.emit('selected', startDate, endEnd);

              picker.hide();
            } else {
              picker.datePicked = [
                startDate,
                endEnd,
              ];

              picker.emit('preselect', startDate, endEnd);
            }

            if (picker.options.inlineMode || !options.autoApply) {
              picker.gotoDate(startDate);
            }
          }
        });

        customFieldInput2.addEventListener('keypress', (keydown) => {
          if (keydown.key === 'Enter') {
            customFieldInput2.blur();
          }
        });
        customFieldInput2.addEventListener('blur', (e) => {
          const el = e.target;

          if (el) {
            const startDate = picker.DateTime(customFieldInput1.value);
            let endEnd = picker.DateTime(customFieldInput2.value);

            if (endEnd.getTime() < startDate.getTime()) {
              endEnd = picker.DateTime(customFieldInput1.value);
            }

            if (endEnd.getTime() > date.getTime()) {
              endEnd = picker.DateTime(date);
            }

            if (options.autoApply) {
              picker.setDateRange(
                startDate,
                endEnd,
                options.force,
              );

              picker.emit('selected', startDate, endEnd);

              picker.hide();
            } else {
              picker.datePicked = [
                startDate,
                endEnd,
              ];

              picker.emit('preselect', startDate, endEnd);
            }

            if (picker.options.inlineMode || !options.autoApply) {
              picker.gotoDate(startDate);
            }
          }
        });

        customFieldButton.addEventListener('click', (e) => {
          const el = e.target;
          if (el) {
            // Update the button state for all buttons
            Object.keys(options.customRanges).forEach((iK) => {
              const values = options.customRanges[iK];
              values[2] = false;
            });

            customActive = true;

            const startDate = picker.DateTime(customFieldInput1.value);
            const endEnd = picker.DateTime(customFieldInput2.value);

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

        customDiv1.appendChild(customFieldInput1);
        customDiv2.appendChild(customFieldInput2);
        block.appendChild(customFieldButton);
        block.appendChild(customForm);
      }

      ui.querySelector('.container__main').prepend(block);
    });
  },
});
