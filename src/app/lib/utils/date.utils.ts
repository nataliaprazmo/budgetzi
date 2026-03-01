export function formatToMonthLabel(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}

export function formatToShortDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US');
}

export function formatToFullDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
