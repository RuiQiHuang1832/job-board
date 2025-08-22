export const radioFormOptions = [
  { value: 'relevance', label: 'Relevance', id: 'r1' },
  { value: 'compensation', label: 'Total Compensation', id: 'r2' },
  { value: 'date', label: 'Date', id: 'r3' },
] as const

export type SortOrder = (typeof radioFormOptions)[number]['value']
