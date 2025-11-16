export const cleanWord = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]|_/g, "") // Remove all symbols except letters, numbers, and spaces
    .replace(/\s+/g, ""); // Remove extra spaces
};
