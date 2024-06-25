# Learn

## Electron

把渲染层的 `tsconfig.json` 放在 root 目录, 这样渲染层可以读取到主进程的声明的类型。这就不需要重复声明类型。

而且可以使 electron 给渲染层扩展的 api 声明到渲染层。比如 electrion 会给 DragEvent 事件的 dataTransfer?.files[0] 添加一个 path 属性。他保存了用户拖拽的文件在本地的完整路径。

## CSS

### white-space

之前经常使用 `white-space: pre-line` 来保留源格式。现在发现 `white-space: pre-wrap` 更合适

```CSS
/* 1.保留所有空白字符和换行符。2.自动换行（即当一行文本太长而超出容器宽度时，会自动换行）。 */
white-space: pre-wrap;

 /* 1.合并多余的空白字符（即连续的空白字符会被压缩为一个空格）。2.保留换行符。3.自动换行（即当一行文本太长而超出容器宽度时，会自动换行）。 */
white-space: pre-line;
```
