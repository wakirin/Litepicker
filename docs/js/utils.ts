const getType = (entry) => {
  return entry && entry.type ? ` (${entry.type})` : '';
}

const getDefault = (entry) => {
  return entry && entry.default ? ` Default: ${entry.default}` : '';
}

const getRequired = (entry) => {
  return entry && entry.required ? ' required' : '';
}

const getMinVersion = (entry) => {
  return entry && entry.minVersion ? ` ${entry.minVersion}+` : '';
}

const getDeprecated = (entry) => {
  return entry && entry.deprecated ? 'Deprecated ' : '';
}

const getDeprecatedReason = (entry) => {
  return entry && entry.deprecated && entry.deprecated.reason
    ? `<div class="deprecated-reason">Reason: ${entry.deprecated.reason}</div>`
    : '';
}

const getDeprecatedReplacement = (entry) => {
  return entry && entry.deprecated && entry.deprecated.replacement
    ? `<div class="deprecated-replacement"><p>Replacement:</p> ${entry.deprecated.replacement}</div>`
    : '';
}

const getDependencies = (entry) => {
  return entry && entry.dependencies ? entry.dependencies : [];
}

const getDescription = (entry) => {
  return entry && entry.description ? entry.description : '';
}

export function createRowOption(entry) {
  const el = document.createElement('div');
  el.className = 'options-list-item';
  el.dataset.canUnfold = 'true';

  if (entry && entry.deprecated) {
    el.classList.add('option-deprecated');
  }

  const t = document.createElement('div');
  t.className = 'option-title';

  t.innerHTML = `
  <div class="option-title-flex">
    <div>
      <span class="icon"></span> 
      <span class="option-title-deprecated">${getDeprecated(entry)}</span>
      <span class="option-title-text">${entry.name}</span>
      <span class="option-title-type">${getType(entry)}</span>
    </div>
    <div>
      <span class="option-title-req">${getRequired(entry)}</span>
      <span class="option-title-min">${getMinVersion(entry)}</span>
    </div>
  </div>
  <div class="option-title-default">${getDefault(entry)}</div>`;
  t.addEventListener('click', (evt) => {
    evt.preventDefault();

    const parent = t.parentNode as HTMLElement;
    const s = parent.dataset.canUnfold === 'true';
    parent.dataset.canUnfold = String(!s);
  });
  el.appendChild(t);

  const dependenciesList = document.createElement('ul');
  getDependencies(entry).forEach(dep => {
    const d = document.createElement('li');
    d.innerHTML = `
      <a href="${dep.link}" target="_blank">${dep.name}</a>
    `
    dependenciesList.appendChild(d);
  });

  const d = document.createElement('div');
  d.className = 'option-description';
  d.innerHTML = `
  <div>
  ${getDescription(entry)}
  ${dependenciesList.childNodes.length ? `<p><strong>REQUIRED:</strong></p> ${dependenciesList.outerHTML}` : ''}
  ${getDeprecatedReason(entry)}
  ${getDeprecatedReplacement(entry)}
  </div>`;
  el.appendChild(d);

  return el;
};

export function sortArray(array) {
  return array
    .sort((a, b) => {
      const v = a.name.localeCompare(b.name);

      if (a.deprecated && b.deprecated) {
        return v;
      }

      if (a.deprecated && v < 0) {
        return 1;
      }

      if (b.deprecated && v > 0) {
        return -1;
      }

      return v;
    });
}