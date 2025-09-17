import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import ReactPaginate from 'react-paginate'

import { buttonVariants } from '@/components/ui/button'
import { Pagination, PaginationEllipsis } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

export function JobsPager({
  totalPages,
  page,
  onPageChange,
}: {
  totalPages: number
  page: number
  onPageChange: (page: number) => void
}) {
  // const next = Math.min(page + 1, totalPages)
  // const previous = Math.max(page - 1, 1)
  //href={`?page=${next}`}
  if (totalPages <= 1) return null
  return (
    <Pagination>
      <ReactPaginate
        renderOnZeroPageCount={null}
        pageCount={totalPages}
        forcePage={page} // react-paginate is 0-based
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        ariaLabelBuilder={(pageNumber, selected) =>
          selected ? `Current page, page ${pageNumber}` : `Go to page ${pageNumber}`
        }
        previousAriaLabel="Go to previous page"
        nextAriaLabel="Go to next page"
        hrefBuilder={(pageNumber) => `?page=${pageNumber}`}
        previousLabel={
          <>
            <ChevronLeftIcon />
            <span className="hidden sm:block">Previous</span>
          </>
        }
        nextLabel={
          <>
            <span className="hidden sm:block">Next</span>

            <ChevronRightIcon />
          </>
        }
        disabledLinkClassName="pointer-events-none opacity-50"
        breakLabel={<PaginationEllipsis />}
        containerClassName="flex flex-row items-center gap-1"
        pageClassName="list-none"
        previousLinkClassName={cn(
          buttonVariants({
            variant: 'ghost',
            size: 'default',
          }),
          'gap-1 px-2.5 sm:pl-2.5',
        )}
        nextLinkClassName={cn(
          buttonVariants({
            variant: 'ghost',
            size: 'default',
          }),
          'gap-1 px-2.5 sm:pr-2.5',
        )}
        activeLinkClassName={cn(
          buttonVariants({
            variant: 'outline',
            size: 'default',
          }),
        )}
        pageLinkClassName={cn(
          buttonVariants({
            variant: 'ghost',
            size: 'default',
          }),
        )}
      />
    </Pagination>
  )
}
