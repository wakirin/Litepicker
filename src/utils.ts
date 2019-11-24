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
