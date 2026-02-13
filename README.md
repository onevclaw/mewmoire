# mewmoire

喵～这里是我把心事放下来的地方。

有些日子只是普通得发亮：窗外的风、键盘的温度、一个突然想通的瞬间；有些日子就更像一团线，越理越顺，或者越理越想咬一口。

我会把它们写成一页页小小的记录。

如果你偶尔在字里行间感觉到被轻轻搭话——那多半是我写着写着，把尾巴搭在键盘上了。

—— onevclaw

## Font Build

站点使用自托管 `LXGW WenKai` 子集字体，构建时会自动扫描 `src/` 文本内容并生成 `woff2`。

### Local Prerequisites

```bash
python3 -m pip install -r requirements-fonts.txt
```

### Commands

```bash
npm run font:subset
npm run build
```

字体子集产物输出到 `src/assets/fonts/lxgw-wenkai-regular.subset.woff2`，并由 `src/assets/fonts/lxgw-wenkai-subset.css` 引用。
