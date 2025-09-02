/* eslint-disable react/no-unescaped-entities */
export default function EmptyState({ keyword }: { keyword: string | undefined }) {
  return (
    <div className="">
      <div className="font-medium mb-2">The search "{keyword}" did not return any results</div>
      <p className="text-sm text-gray-600 mb-4">
        Try broadening your search or clearing filters to see more results.
      </p>
      <h5 className="mb-2">Search suggestions:</h5>
      <ul className="text-sm text-gray-500 space-y-1 mb-4">
        <li>• Remove location or try "Remote"</li>
        <li>
          • Use fewer keywords or synonyms (e.g. "sustainability", "green", "renewable", "ESG")
        </li>
        <li>• Clear filters or sort to widen results</li>
      </ul>
    </div>
  )
}
