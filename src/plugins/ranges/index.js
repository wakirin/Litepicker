import './style.css';

// eslint-disable-next-line no-undef
Litepicker.add('ranges', {
  init (picker) {
    const defaultOptions = {
      position: 'left',
      customRanges: {},
      rangeInputs: false,
      customRangesLabels: [
        'Today',
        'Yesterday',
        'Last 7 Days',
        'Last 30 Days',
        'This Month',
        'Last Month'
      ],
      force: false,
      autoApply: picker.options.autoApply
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
      const d2 = new Date(
        currDate.getFullYear(),
        currDate.getMonth() + 1, 0
      );

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
        [options.customRangesLabels[0]]: [
          date.clone(),
          date.clone(),
          true
        ],
        [options.customRangesLabels[1]]: [
          date.clone().subtract(1, 'day'),
          date.clone().subtract(1, 'day'),
          false
        ],
        [options.customRangesLabels[2]]: [
          date.clone().subtract(6, 'day'),
          date,
          false
        ],
        [options.customRangesLabels[3]]: [
          date.clone().subtract(29, 'day'),
          date,
          false
        ],
        [options.customRangesLabels[4]]: [...thisMonth(date), false],
        [options.customRangesLabels[5]]: [...lastMonth(date), false]
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

      // eslint-disable-next-line no-undef
      Litepicker.add('ranges', {
        init (picker) {
          const defaultOptions = {
            position: 'left',
            customRanges: {},
            rangeInputs: false,
            customRangesLabels: [
              'Today',
              'Yesterday',
              'Last 7 Days',
              'Last 30 Days',
              'This Month',
              'Last Month'
            ],
            force: false,
            autoApply: picker.options.autoApply
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
            const d2 = new Date(
              currDate.getFullYear(),
              currDate.getMonth() + 1, 0
            );

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
              [options.customRangesLabels[0]]: [
                date.clone(),
                date.clone(),
                true
              ],
              [options.customRangesLabels[1]]: [
                date.clone().subtract(1, 'day'),
                date.clone().subtract(1, 'day'),
                false
              ],
              [options.customRangesLabels[2]]: [
                date.clone().subtract(6, 'day'),
                date,
                false
              ],
              [options.customRangesLabels[3]]: [
                date.clone().subtract(29, 'day'),
                date,
                false
              ],
              [options.customRangesLabels[4]]: [...thisMonth(date), false],
              [options.customRangesLabels[5]]: [...lastMonth(date), false]
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
                  const startDate = picker.DateTime(
                    Number(el.dataset.start)
                  );
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
                      options.force
                    );

                    picker.emit('selected', startDate, endEnd);

                    picker.hide();
                  } else {
                    picker.datePicked = [startDate, endEnd];

                    picker.emit('preselect', startDate, endEnd);
                  }

                  if (picker.options.inlineMode || !options.autoApply) {
                    picker.gotoDate(startDate);
                  }
                }
              });

              block.appendChild(item);
              block.css = ('width', '200');
            });

            // Set up HTML Elements for Custom Range Group
            const customRangesButton = document.createElement('button');
            customRangesButton.className = `${customActive ? 'custom-button active' : 'custom-button inactive'}`;
            customRangesButton.innerText = 'Custom';
            customRangesButton.tabIndex = ui.dataset.plugins.indexOf('keyboardnav') >= 0 ? 1 : -1;

            const customRangesForm = document.createElement('form');
            customRangesForm.className = 'container__custom-range';

            const customRangesFormGroup = document.createElement('div');
            customRangesFormGroup.className = 'form-group';

            // Form and Main Container
            customRangesForm.appendChild(customRangesFormGroup);
            block.appendChild(customRangesButton);
            block.appendChild(customRangesForm);

            // From Input / Label Container
            const customRangesFromDiv = document.createElement('div');
            const customRangesFromDiv1 = document.createElement('div');
            const customRangesFromDiv2 = document.createElement('div');
            customRangesFromDiv.className = 'form-control-wrapper';
            customRangesFromDiv1.className = 'form-control-div'; // Label Div
            customRangesFromDiv2.className = 'form-control-div'; // Input Div

            const customRangesLabel1 = document.createElement('label');
            customRangesLabel1.innerText = 'From';
            const customRangesInput1 = document.createElement('input');
            customRangesInput1.value = customRangesInput1.setAttribute(
              'type',
              'text'
            );
            customRangesInput1.className = 'form-control';
            customRangesInput1.id = 'start-date';
            customRangesInput1.value = field1Value;
            customRangesInput1.disabled = !customActive;

            customRangesFromDiv.appendChild(customRangesFromDiv1);
            customRangesFromDiv.appendChild(customRangesFromDiv2);
            customRangesFromDiv1.appendChild(customRangesLabel1);
            customRangesFromDiv2.appendChild(customRangesInput1);

            // To Input / Label Container
            const customRangesToDiv = document.createElement('div');
            const customRangesToDiv1 = document.createElement('div');
            const customRangesToDiv2 = document.createElement('div');
            customRangesToDiv.className = 'form-control-wrapper spacer';
            customRangesToDiv1.className = 'form-control-div'; // Label Div
            customRangesToDiv2.className = 'form-control-div'; // Input Div

            const customRangesLabel2 = document.createElement('label');
            customRangesLabel2.innerText = 'To';
            const customRangesInput2 = document.createElement('input');
            customRangesInput2.setAttribute('type', 'text');
            customRangesInput2.className = 'form-control';
            customRangesInput2.id = 'end-date';
            customRangesInput2.value = field2Value;
            customRangesInput2.disabled = !customActive;

            customRangesToDiv.appendChild(customRangesToDiv1);
            customRangesToDiv.appendChild(customRangesToDiv2);
            customRangesToDiv1.appendChild(customRangesLabel2);
            customRangesToDiv2.appendChild(customRangesInput2);

            customRangesFormGroup.appendChild(customRangesFromDiv);
            customRangesFormGroup.appendChild(customRangesToDiv);

            if (options.rangeInputs) {
              customRangesInput1.addEventListener('keypress', (keydown) => {
                if (keydown.key === 'Enter') {
                  customRangesInput1.blur();
                }
              });
              customRangesInput1.addEventListener('blur', (e) => {
                const el = e.target;

                if (el) {
                  let startDate = picker.DateTime(
                    customRangesInput1.value
                  );
                  const endEnd = picker.DateTime(
                    customRangesInput2.value
                  );

                  if (endEnd.getTime() < startDate.getTime()) {
                    startDate = picker.DateTime(
                      customRangesInput2.value
                    );
                  }

                  if (options.autoApply) {
                    picker.setDateRange(
                      startDate,
                      endEnd,
                      options.force
                    );

                    picker.emit('selected', startDate, endEnd);

                    picker.hide();
                  } else {
                    picker.datePicked = [startDate, endEnd];

                    picker.emit('preselect', startDate, endEnd);
                  }

                  if (picker.options.inlineMode || !options.autoApply) {
                    picker.gotoDate(startDate);
                  }
                }
              });
              customRangesInput2.addEventListener('keypress', (keydown) => {
                if (keydown.key === 'Enter') {
                  customRangesInput2.blur();
                }
              });
              customRangesInput2.addEventListener('blur', (e) => {
                const el = e.target;

                if (el) {
                  const startDate = picker.DateTime(
                    customRangesInput1.value
                  );
                  let endEnd = picker.DateTime(customRangesInput2.value);

                  if (endEnd.getTime() < startDate.getTime()) {
                    endEnd = picker.DateTime(customRangesInput1.value);
                  }

                  if (endEnd.getTime() > date.getTime()) {
                    endEnd = picker.DateTime(date);
                  }

                  if (options.autoApply) {
                    picker.setDateRange(
                      startDate,
                      endEnd,
                      options.force
                    );

                    picker.emit('selected', startDate, endEnd);

                    picker.hide();
                  } else {
                    picker.datePicked = [startDate, endEnd];

                    picker.emit('preselect', startDate, endEnd);
                  }

                  if (picker.options.inlineMode || !options.autoApply) {
                    picker.gotoDate(startDate);
                  }
                }
              });
              customRangesButton.addEventListener('click', (e) => {
                const el = e.target;
                if (el) {
                  // Update the button state for all buttons
                  Object.keys(options.customRanges).forEach((iK) => {
                    const values = options.customRanges[iK];
                    values[2] = false;
                  });

                  customActive = true;

                  const startDate = picker.DateTime(
                    customRangesInput1.value
                  );
                  const endEnd = picker.DateTime(
                    customRangesInput2.value
                  );

                  if (options.autoApply) {
                    picker.setDateRange(
                      startDate,
                      endEnd,
                      options.force
                    );

                    picker.emit('ranges.selected', startDate, endEnd);

                    picker.hide();
                  } else {
                    picker.datePicked = [startDate, endEnd];

                    picker.emit('ranges.preselect', startDate, endEnd);
                  }

                  if (picker.options.inlineMode || !options.autoApply) {
                    picker.gotoDate(startDate);
                  }
                }
              });
            }

            ui.querySelector('.container__main').prepend(block);
          });
        }
      });

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
            const startDate = picker.DateTime(
              Number(el.dataset.start)
            );
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
                options.force
              );

              picker.emit('selected', startDate, endEnd);

              picker.hide();
            } else {
              picker.datePicked = [startDate, endEnd];

              picker.emit('preselect', startDate, endEnd);
            }

            if (picker.options.inlineMode || !options.autoApply) {
              picker.gotoDate(startDate);
            }
          }
        });

        block.appendChild(item);
        block.css = ('width', '200');
      });

      // Set up HTML Elements for Custom Range Group
      const customRangesButton = document.createElement('button');
      customRangesButton.className = `${customActive ? 'custom-button active' : 'custom-button inactive'}`;
      customRangesButton.innerText = 'Custom';
      customRangesButton.tabIndex = ui.dataset.plugins.indexOf('keyboardnav') >= 0 ? 1 : -1;

      const customRangesForm = document.createElement('form');
      customRangesForm.className = 'container__custom-range';

      const customRangesFormGroup = document.createElement('div');
      customRangesFormGroup.className = 'form-group';

      // Form and Main Container
      customRangesForm.appendChild(customRangesFormGroup);
      block.appendChild(customRangesButton);
      block.appendChild(customRangesForm);

      // From Input / Label Container
      const customRangesFromDiv = document.createElement('div');
      const customRangesFromDiv1 = document.createElement('div');
      const customRangesFromDiv2 = document.createElement('div');
      customRangesFromDiv.className = 'form-control-wrapper';
      customRangesFromDiv1.className = 'form-control-div'; // Label Div
      customRangesFromDiv2.className = 'form-control-div'; // Input Div

      const customRangesLabel1 = document.createElement('label');
      customRangesLabel1.innerText = 'From';
      const customRangesInput1 = document.createElement('input');
      customRangesInput1.value = customRangesInput1.setAttribute(
        'type',
        'text'
      );
      customRangesInput1.className = 'form-control';
      customRangesInput1.id = 'start-date';
      customRangesInput1.value = field1Value;
      customRangesInput1.disabled = !customActive;

      customRangesFromDiv.appendChild(customRangesFromDiv1);
      customRangesFromDiv.appendChild(customRangesFromDiv2);
      customRangesFromDiv1.appendChild(customRangesLabel1);
      customRangesFromDiv2.appendChild(customRangesInput1);

      // To Input / Label Container
      const customRangesToDiv = document.createElement('div');
      const customRangesToDiv1 = document.createElement('div');
      const customRangesToDiv2 = document.createElement('div');
      customRangesToDiv.className = 'form-control-wrapper spacer';
      customRangesToDiv1.className = 'form-control-div'; // Label Div
      customRangesToDiv2.className = 'form-control-div'; // Input Div

      const customRangesLabel2 = document.createElement('label');
      customRangesLabel2.innerText = 'To';
      const customRangesInput2 = document.createElement('input');
      customRangesInput2.setAttribute('type', 'text');
      customRangesInput2.className = 'form-control';
      customRangesInput2.id = 'end-date';
      customRangesInput2.value = field2Value;
      customRangesInput2.disabled = !customActive;

      customRangesToDiv.appendChild(customRangesToDiv1);
      customRangesToDiv.appendChild(customRangesToDiv2);
      customRangesToDiv1.appendChild(customRangesLabel2);
      customRangesToDiv2.appendChild(customRangesInput2);

      customRangesFormGroup.appendChild(customRangesFromDiv);
      customRangesFormGroup.appendChild(customRangesToDiv);

      if (options.rangeInputs) {
        customRangesInput1.addEventListener('keypress', (keydown) => {
          if (keydown.key === 'Enter') {
            customRangesInput1.blur();
          }
        });
        customRangesInput1.addEventListener('blur', (e) => {
          const el = e.target;

          if (el) {
            let startDate = picker.DateTime(
              customRangesInput1.value
            );
            const endEnd = picker.DateTime(
              customRangesInput2.value
            );

            if (endEnd.getTime() < startDate.getTime()) {
              startDate = picker.DateTime(
                customRangesInput2.value
              );
            }

            if (options.autoApply) {
              picker.setDateRange(
                startDate,
                endEnd,
                options.force
              );

              picker.emit('selected', startDate, endEnd);

              picker.hide();
            } else {
              picker.datePicked = [startDate, endEnd];

              picker.emit('preselect', startDate, endEnd);
            }

            if (picker.options.inlineMode || !options.autoApply) {
              picker.gotoDate(startDate);
            }
          }
        });
        customRangesInput2.addEventListener('keypress', (keydown) => {
          if (keydown.key === 'Enter') {
            customRangesInput2.blur();
          }
        });
        customRangesInput2.addEventListener('blur', (e) => {
          const el = e.target;

          if (el) {
            const startDate = picker.DateTime(
              customRangesInput1.value
            );
            let endEnd = picker.DateTime(customRangesInput2.value);

            if (endEnd.getTime() < startDate.getTime()) {
              endEnd = picker.DateTime(customRangesInput1.value);
            }

            if (endEnd.getTime() > date.getTime()) {
              endEnd = picker.DateTime(date);
            }

            if (options.autoApply) {
              picker.setDateRange(
                startDate,
                endEnd,
                options.force
              );

              picker.emit('selected', startDate, endEnd);

              picker.hide();
            } else {
              picker.datePicked = [startDate, endEnd];

              picker.emit('preselect', startDate, endEnd);
            }

            if (picker.options.inlineMode || !options.autoApply) {
              picker.gotoDate(startDate);
            }
          }
        });
        customRangesButton.addEventListener('click', (e) => {
          const el = e.target;
          if (el) {
            // Update the button state for all buttons
            Object.keys(options.customRanges).forEach((iK) => {
              const values = options.customRanges[iK];
              values[2] = false;
            });

            customActive = true;

            const startDate = picker.DateTime(
              customRangesInput1.value
            );
            const endEnd = picker.DateTime(
              customRangesInput2.value
            );

            if (options.autoApply) {
              picker.setDateRange(
                startDate,
                endEnd,
                options.force
              );

              picker.emit('ranges.selected', startDate, endEnd);

              picker.hide();
            } else {
              picker.datePicked = [startDate, endEnd];

              picker.emit('ranges.preselect', startDate, endEnd);
            }

            if (picker.options.inlineMode || !options.autoApply) {
              picker.gotoDate(startDate);
            }
          }
        });
      }

      ui.querySelector('.container__main').prepend(block);
    });
  }
});
