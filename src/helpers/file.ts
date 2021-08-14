export function isValidSize(file: File, size: number) {
  return file.size / (1024 * 1024) <= size;
}
