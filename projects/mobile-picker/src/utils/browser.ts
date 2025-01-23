/** https://github.com/SortableJS/Sortable/blob/master/src/BrowserInfo.js */

function userAgent(pattern: RegExp) {
  if (typeof window !== 'undefined' && window.navigator) {
    return !!(/* @__PURE__ */ navigator.userAgent.match(pattern));
  }
  return false;
}

export const IE11OrLess = userAgent(
  /(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i
);
export const Edge = userAgent(/Edge/i);
export const FireFox = userAgent(/firefox/i);
export const Safari =
  userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
export const IOS = userAgent(/iP(ad|od|hone)/i);
export const ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
