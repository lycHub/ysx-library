import './index.scss';
import './demo/demo.scss';
import 'mdui/components/card';
import 'mdui/components/tabs';
import 'mdui/components/tab';
import 'mdui/components/tab-panel';
import type { TabPanel } from 'mdui';

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('scss', scss);

import htmlStr from './index.html?raw';
import cssStr from './demo/demo.scss?raw';
import jsStr from './demo/demo.ts?raw';
import utilStr from '../../../util.ts?raw';
import { run } from './demo/demo';

const codeMap = {
  html: htmlStr,
  css: cssStr,
  js: jsStr,
  util: utilStr
}


function renderCode() {
  // const tsStr = hljs.highlight(codeMap.js, { language: 'ts' });
  // console.log('tsStr>>>', tsStr);
  const tabContents = document.querySelectorAll('.demo-code-content') as NodeListOf<TabPanel>;
  tabContents.forEach((tabContent) => {
    tabContent.querySelector('pre code')!.textContent = codeMap[tabContent.value as keyof typeof codeMap];
  });


}


// 类似页面加载后执行
customElements.whenDefined('mdui-card').then(() => {
  run();
  renderCode();
  hljs.highlightAll();
});