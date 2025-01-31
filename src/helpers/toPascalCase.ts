export const toPascalCase = (stringToFix: string): string => {
  return stringToFix.replace(/(^\w|[-_]\w)/g, (match) =>
    match.replace(/[-_]/, '').toUpperCase()
  );
};
