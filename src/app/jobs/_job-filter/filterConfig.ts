export const filterConfig = [
  {
    key: 'datePosted',
    placeholder: 'Any Time',
    options: [
      { value: 'all', label: 'Any Time' },
      { value: 'today', label: 'Today' },
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
      { value: '50k+', label: '$50,000+' },
      { value: '80k+', label: '$80,000+' },
      { value: '100k+', label: '$100,000+' },
      { value: '120k+', label: '$120,000+' },
      { value: '150k+', label: '$150,000+' },
    ],
  },
  {
    key: 'distance',
    placeholder: 'All Distances',
    options: [
      { value: 'all', label: 'Any Distance' },
      { value: '5', label: 'Within 5 miles' },
      { value: '10', label: 'Within 10 miles' },
      { value: '25', label: 'Within 25 miles' },
      { value: '50', label: 'Within 50 miles' },
      { value: 'remote', label: 'Remote' },
    ],
  },
  {
    key: 'education',
    placeholder: 'Any Education',
    options: [
      { value: 'all', label: 'Any Education' },
      { value: 'high-school', label: 'High School' },
      { value: 'associate', label: 'Associate Degree' },
      { value: 'bachelor', label: "Bachelor's Degree" },
      { value: 'no-degree', label: 'No Degree Required' },
    ],
  },
] as const // 'as const' ensures the array is treated as a tuple with literal types

// Creates a union of all `key` values from the filterConfig array
// typeof         – Turn the filterConfig variable into a type
// [number]       – Get the type of any (and all) items in the array (a union of all elements)
// ['key']        – Extract the 'key' value from each item
// Final result   – 'jobType' | 'salary' | 'distance' | ...
export type FilterKey = (typeof filterConfig)[number]['key']
