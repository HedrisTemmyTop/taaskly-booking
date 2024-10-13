function truncateString(input: string, maxLength: number = 10): string {
  if (input.length > maxLength) {
    return input.substring(0, maxLength) + "...";
  }
  return input;
}

export default truncateString;
