/*
0 - mobile
1 - tablet
2 - small desktop
3 - anything above
*/

function GetScreenSize() {
  const width = window.innerWidth;
  if (width <= 480) {
    return 0;
  }
  if (width > 481 && width <= 768) {
    return 1;
  }
  if (width > 769 && width <= 1200) {
    return 2;
  }
  return 3;
}
export default GetScreenSize;
