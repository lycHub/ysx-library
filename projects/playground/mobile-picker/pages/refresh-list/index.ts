import './index.scss';
import './demo/demo.scss';
import 'mdui/components/button';
import 'mdui/components/card';
import 'mdui/components/tabs';
import 'mdui/components/tab';
import 'mdui/components/tab-panel';
import 'mdui/components/tooltip';
import '@mdui/icons/content-copy';

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('scss', scss);

import htmlStr from './index.html?raw';
import cssStr from './demo/demo.scss?raw';
import tsStr from './demo/demo.ts?raw';
import utilStr from '../../../util.ts?raw';
import { run } from './demo/demo';
import { renderCode } from '../../utils/tool';

// 类似页面加载后执行
customElements.whenDefined('mdui-card').then(() => {
  run();
  renderCode({
    html: htmlStr,
    css: cssStr,
    ts: tsStr,
    util: utilStr,
  });
  hljs.highlightAll();
});
