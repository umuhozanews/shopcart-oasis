export function formatRWF(amount: number): string {
  return Math.round(amount).toLocaleString('en-US') + ' RWF';
}
