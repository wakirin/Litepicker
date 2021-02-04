const now = new Date();
const demoCfg = {
  base: {
    numberOfColumns: 2,
    numberOfMonths: 2,
  },
  index: {
    element: '#index-demo-lp',
    singleMode: false,
    inlineMode: true,
    plugins: ['mobilefriendly'],
    setup: function (picker) {
      picker.on('selected', function (date1, date2) {
        document.getElementById('index-demo-selection').innerHTML = date1.format('D MMMM YYYY') + ' - ' + date2.format('D MMMM YYYY');
      }) 
    }
  },
  allowRepick: {
    element: '#input-start-allow-repick',
    elementEnd: '#input-end-allow-repick',
    singleMode: false,
    startDate: now,
    allowRepick: true,
    endDate: (new Date()).setDate(now.getDate() + 7),
  },
  autoApply: {
    element: '#input-auto-apply',
    numberOfColumns: 1,
    numberOfMonths: 1,
    autoApply: false,
  },

  egShowNights: {
    element: '#input-eg-show-nights',
    singleMode: false,
    tooltipText: {
      one: 'night',
      other: 'nights'
    },
    tooltipNumber: function (totalDays) {
      return totalDays - 1;
    }
  },
  egShowPrevious: {
    element: '#input-eg-show-previous-month',
    startDate: new Date(),
    setup: function (picker) {
      picker.on('show', function () {
        let date = picker.getDate();
        if (date) {
          date.setMonth(date.getMonth() - 1);
          picker.gotoDate(date);
        }
      });
    }
  },

  keyboardnav: {
    element: '#input-keyboardnav',
    plugins: ['keyboardnav']
  },
  mobilefriendly: {
    element: '#input-mobilefriendly',
    plugins: ['mobilefriendly']
  },
  ranges: {
    element: '#input-ranges',
    plugins: ['ranges']
  },
  multiselect: {
    element: '#input-multiselect',
    plugins: ['multiselect'],
    setup: (picker) => {
      picker.on('button:apply', () => {
        document.getElementById('input-multiselect').value = picker.multipleDatesToString();
      });
    }
  },
}

const collapse = {
  hide: function (element) {
    const sectionHeight = element.scrollHeight;
    const elementTransition = element.style.transition;
    element.style.transition = '';

    requestAnimationFrame(function () {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;

      requestAnimationFrame(function () {
        element.style.height = 0 + 'px';
      });
    });

    element.setAttribute('data-collapsed', 'false');
  },

  show: function (element) {
    const sectionHeight = element.scrollHeight;

    element.style.height = sectionHeight + 'px';

    element.addEventListener('transitionend', function (e) {
      element.removeEventListener('transitionend', arguments.callee);

      //element.style.height = null;
    });

    element.setAttribute('data-collapsed', 'true');
  },

  initialize: function () {
    const btns = Array.from(document.querySelectorAll('.collapse button[type="button"]'));
    btns.forEach(function (btn) {
      btn.addEventListener('click', function (evt) {
        evt.preventDefault();

        const content = btn.closest('.collapse').querySelector('.collapse__content');
        const isCollapsed = content.getAttribute('data-collapsed') === 'true';
        btn.blur();

        if (isCollapsed) {
          collapse.hide(content)
        } else {
          collapse.show(content)
        }
      })
    })
  }
}

const lp = {
  tags: function () {
    const stored = JSON.parse(localStorage.getItem('version'));
    if (stored && stored.d === (new Date).getDate()) {
      return new Promise(function (resolve, reject) {
        resolve(stored.v);
      });
    }

    return fetch('https://api.github.com/repos/wakirin/litepicker/tags')
      .then(function (r) { return r.json() })
      .then(function (json) { return lp.latestTag(json) });
  },
  latestTag: function (json) {
    const version = json.filter(function (x) { return !x.name.includes('beta') })
      .map(function (x) { return x.name = /^v/.test(x.name) ? x.name : 'v' + x.name })
      .reduce(function (a, b) {
        return 0 < a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
          ? a
          : b
      });
    if (version) {
      localStorage.setItem('version', JSON.stringify({ d: (new Date()).getDate(), v: version }));

      return version;
    }

    return null;
  },
  addScript: function (version) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/litepicker@' + version.replace(/^v/, '') + '/dist/bundle.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = function () {
      if (document.readyState === 'complete') {
        lp.initialize();
      }
      else {
        document.addEventListener('readystatechange', function () {
          if (document.readyState === 'complete') {
            lp.initialize();
          }
        });
      }
    };
    document.head.appendChild(script);
  },
  initialize: function () {
    const elems = Array.from(document.querySelectorAll('.demo-wrapper'));

    elems.forEach(function (wrapper) {
      const cfg = Object.assign({}, demoCfg.base, demoCfg[wrapper.dataset.cfg]);

      cfg.element = document.querySelector(cfg.element);

      if (cfg.elementEnd) {
        cfg.elementEnd = document.querySelector(cfg.elementEnd);
      }

      new Litepicker(cfg);
    });
  },
  favicon: function () {
    const date = (new Date()).getDate();
    const favicon = document.querySelector('link[rel="shortcut icon"]');

    favicon.setAttribute('href', '{{ "assets/favicon/" | relative_url }}' + date + '.png');
  },
  toggableDarkMode: function () {
    const toggleDarkMode = document.querySelector('.js-promo-color-modes-toggle');

    jtd.addEvent(toggleDarkMode, 'click', function () {
      if (jtd.getTheme() === 'dark') {
        jtd.setTheme('light');
      } else {
        jtd.setTheme('dark');
      }
    });
  }
}

lp.favicon();

lp.tags().then(function (ver) { return lp.addScript(ver) });

jtd.onReady(function () {
  lp.toggableDarkMode();

  collapse.initialize();
});