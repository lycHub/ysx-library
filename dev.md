## virtual tree package.json

删掉
```json
"files": ["dist"],
  "types": "./dist/typings/tree/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/vue-virtual-tree.es.js",
      "require": "./dist/vue-virtual-tree.umd.js"
    },
    "./style.css": "./dist/style.css"
  },
```

加上
```json
"main": "./src/index.ts",
"module": "./src/index.ts",
"types": "./src/index.ts",
```


## 删除 demo style/index.css 里的 @import url('@ysx-libs/vue-virtual-tree/style.css');


## pnpm build-dev:tree
