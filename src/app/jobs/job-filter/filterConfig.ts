export const filterConfig = [
  {
    key: 'daysPosted',
    placeholder: 'Any Time',
    options: [
      { value: 'all', label: 'Any Time' },
      { value: '1', label: 'Today' },
      { value: '7', label: 'Last 7 days' },
      { value: '14', label: 'Last 2 weeks' },
      { value: '30', label: 'Last 30 days' },
    ],
  },
  {
    key: 'jobType',
    placeholder: 'All Job Types',
    options: [
      { value: 'all', label: 'All Job Types' },
      { value: 'full-time', label: 'Full-time' },
      { value: 'part-time', label: 'Part-time' },
      { value: 'contract', label: 'Contract' },
    ],
  },
  {
    key: 'salary',
    placeholder: 'All Salaries',
    options: [
      { value: 'all', label: 'All Salaries' },
      { value: '50', label: '$50,000+' },
      { value: '80', label: '$80,000+' },
      { value: '100', label: '$100,000+' },
      { value: '120', label: '$120,000+' },
      { value: '150', label: '$150,000+' },
    ],
  },
  {
    key: 'education',
    placeholder: 'Any Education',
    options: [
      { value: 'all', label: 'Any Education' },
      { value: 'High School', label: 'High School' },
      { value: 'Associate Degree', label: 'Associate Degree' },
      { value: 'Bachelor Degree', label: 'Bachelor Degree' },
      { value: 'No Degree', label: 'No Degree Required' },
    ],
  },
] as const // 'as const' ensures the array is treated as a tuple with literal types

// Creates a union of all `key` values from the filterConfig array
// typeof         – Turn the filterConfig variable into a type
// [number]       – Get the type of any (and all) items in the array (a union of all elements)
// ['key']        – Extract the 'key' value from each item
// Final result   – 'jobType' | 'salary' | 'distance' | ...
export type FilterKey = (typeof filterConfig)[number]['key']
