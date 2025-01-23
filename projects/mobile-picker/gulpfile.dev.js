import { src, dest, watch } from 'gulp';
export function cpCss(cb) {
  return src('src/style.css').pipe(dest('dist'));
}

export default () => {
  watch('src/style.css', { delay: 1000 }, cpCss);
};
