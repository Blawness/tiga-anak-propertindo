export function cn(...classes: Array<string | number | false | null | undefined>) {
  return classes
    .flat()
    .filter(Boolean)
    .map(String)
    .join(" ");
}






