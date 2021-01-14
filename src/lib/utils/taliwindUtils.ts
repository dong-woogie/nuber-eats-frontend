export const darkenColor = (color: string, step: number) => {
  //@ts-ignore
  const firstNumber: int = +color.match(/\d/)?.join("");
  if (firstNumber > 8) return color;
  return color.replace(/\d/, String(firstNumber + step));
};
