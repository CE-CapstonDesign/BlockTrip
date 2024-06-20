export const selectedItem = (selectedIndex, idx) =>
  `truncate w-52 text-lg leading-10 hover:font-bold active:font-bold ${
    selectedIndex === idx ? "font-bold text-green" : "font-light"
  }`;
