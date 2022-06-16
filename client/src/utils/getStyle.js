export default function getStyle(style) {
  let result = "";
  for (const each in style) {
    result += style[each] + " ";
  }
  return result;
}