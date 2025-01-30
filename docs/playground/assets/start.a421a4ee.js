import"./modulepreload-polyfill.b7f2da20.js";import{P as c}from"./mobile-picker.es.432436b2.js";import{H as e,x as l,t as m}from"./xml.7ceb4a85.js";function o(i){const t=i.COMMENT(/^\s*@?rem\b/,/$/,{relevance:10});return{name:"Batch file (DOS)",aliases:["bat","cmd"],case_insensitive:!0,illegal:/\/\*/,keywords:{keyword:["if","else","goto","for","in","do","call","exit","not","exist","errorlevel","defined","equ","neq","lss","leq","gtr","geq"],built_in:["prn","nul","lpt3","lpt2","lpt1","con","com4","com3","com2","com1","aux","shift","cd","dir","echo","setlocal","endlocal","set","pause","copy","append","assoc","at","attrib","break","cacls","cd","chcp","chdir","chkdsk","chkntfs","cls","cmd","color","comp","compact","convert","date","dir","diskcomp","diskcopy","doskey","erase","fs","find","findstr","format","ftype","graftabl","help","keyb","label","md","mkdir","mode","more","move","path","pause","print","popd","pushd","promt","rd","recover","rem","rename","replace","restore","rmdir","shift","sort","start","subst","time","title","tree","type","ver","verify","vol","ping","net","ipconfig","taskkill","xcopy","ren","del"]},contains:[{className:"variable",begin:/%%[^ ]|%[^ ]+?%|![^ ]+?!/},{className:"function",begin:{className:"symbol",begin:"^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)",relevance:0}.begin,end:"goto:eof",contains:[i.inherit(i.TITLE_MODE,{begin:"([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"}),t]},{className:"number",begin:"\\b\\d+",relevance:0},t]}}e.registerLanguage("dos",o);e.registerLanguage("html",l);e.registerLanguage("ts",m);e.highlightAll();const s=document.querySelector(".language-html");s&&(console.log("htmlCodeNode>>>",s),s.textContent=`<div class="mobile-picker">
  <!-- picker view \u5BB9\u5668 -->
  <div class="mobile-picker-view-container">

    <!-- \u7B2C\u4E00\u5217 -->
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

    <!-- \u7B2C\u4E8C\u5217 -->
    <div class="mobile-picker-view">
      <div class="mobile-picker-view-item-container">
        <div class="mobile-picker-view-item">item1-0</div>
        <div class="mobile-picker-view-item">item1-1</div>
        <div class="mobile-picker-view-item">item1-2</div>
        <div class="mobile-picker-view-item">item1-3</div>
        <div class="mobile-picker-view-item">item1-4</div>
      </div>
    </div>

    <!-- \u7B2C\u4E09\u5217 -->
    <div class="mobile-picker-view">
      <div class="mobile-picker-view-item-container">
        <div class="mobile-picker-view-item">item1-0</div>
        <div class="mobile-picker-view-item">item1-1</div>
        <div class="mobile-picker-view-item">item1-2</div>
      </div>
    </div>

    <!-- \u8499\u5C42 -->
    <div class="mobile-picker-overlay">
      <div class="mobile-picker-overlay-mid"></div>
    </div>
  </div>
</div>`);new c(".mobile-picker",{});
