export function isMobile() {
  const isPortrait = getOrientation() === 'portrait';
  return window.matchMedia(`(max-device-${isPortrait ? 'width' : 'height'}: ${480}px)`).matches;
}

export function getOrientation() {
  if (window.matchMedia('(orientation: portrait)').matches) {
    return 'portrait';
  }

  return 'landscape';
}

export function findNestedMonthItem(monthItem: Element): number {
  const children = monthItem.parentNode.childNodes;
  for (let i = 0; i < children.length; i++) {
    const curNode = children.item(i);
    if (curNode === monthItem) {
      return i;
    }
  }
  return 0;
}
