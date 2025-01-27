import { Picker } from '@ysx-libs/mobile-picker';
import './index.scss';


import hljs from 'highlight.js/lib/core';
import dos from 'highlight.js/lib/languages/dos';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('dos', dos);
hljs.registerLanguage('html', html);
hljs.registerLanguage('ts', ts);
hljs.highlightAll();

const htmlCodeNode = document.querySelector('.language-html');
if (htmlCodeNode) {
  console.log('htmlCodeNode>>>', htmlCodeNode);
  htmlCodeNode.textContent = `<div class="mobile-picker">
  <!-- picker view 容器 -->
  <div class="mobile-picker-view-container">

    <!-- 第一列 -->
    <div class="mobile-picker-view">
      <div class="mobile-picker-view-item-container">
        <div class="mobile-picker-view-item">item0</div>
        <div class="mobile-picker-view-item">item1</div>
        <div class="mobile-picker-view-item">item2</div>
        <div class="mobile-picker-view-item">item3</div>
        <div class="mobile-picker-view-item">item4</div>
        <div class="mobile-picker-view-item">item5</div>
        <div class="mobile-picker-view-item">item6</div>
        <div class="mobile-picker-view-item">item7</div>
        <div class="mobile-picker-view-item">item8</div>
      </div>
    </div>

    <!-- 第二列 -->
    <div class="mobile-picker-view">
      <div class="mobile-picker-view-item-container">
        <div class="mobile-picker-view-item">item1-0</div>
        <div class="mobile-picker-view-item">item1-1</div>
        <div class="mobile-picker-view-item">item1-2</div>
        <div class="mobile-picker-view-item">item1-3</div>
        <div class="mobile-picker-view-item">item1-4</div>
      </div>
    </div>

    <!-- 第三列 -->
    <div class="mobile-picker-view">
      <div class="mobile-picker-view-item-container">
        <div class="mobile-picker-view-item">item1-0</div>
        <div class="mobile-picker-view-item">item1-1</div>
        <div class="mobile-picker-view-item">item1-2</div>
      </div>
    </div>

    <!-- 蒙层 -->
    <div class="mobile-picker-overlay">
      <div class="mobile-picker-overlay-mid"></div>
    </div>
  </div>
</div>`;
}

const pickerInstance = new Picker('.mobile-picker', {});