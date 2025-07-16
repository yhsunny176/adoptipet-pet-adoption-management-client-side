import React from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

const TablePagination = ({table}) => {
    return (
        <div>
            <div className="w-full flex justify-end">
                {/* Shadcn Pagination */}
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={(e) => {
                                    e.preventDefault();
                                    table.previousPage();
                                }}
                                className="text-sm rounded bg-background-quaternary text-heading-color border border-gray-light hover:bg-base-rose hover:text-base-white min-w-6 h-8 transition-colors duration-300 ease-in-out"
                                disabled={!table.getCanPreviousPage()}
                            />
                        </PaginationItem>
                        {Array.from({ length: table.getPageCount() }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={table.getState().pagination.pageIndex === i}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        table.setPageIndex(i);
                                    }}
                                    className={`text-sm text-pg-base border border-gray-light hover:border-none rounded hover:bg-base-rose hover:text-base-white min-w-4 h-8 ${
                                        table.getState().pagination.pageIndex === i
                                            ? "bg-base-rose text-base-white border-none transition-colors duration-500 cursor-pointer"
                                            : ""
                                    }`}>
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {table.getPageCount() > 5 &&
                            table.getState().pagination.pageIndex < table.getPageCount() - 2 && (
                                <PaginationItem>
                                    <PaginationEllipsis className="min-w-6 h-6" />
                                </PaginationItem>
                            )}
                        <PaginationItem>
                            <PaginationNext
                                onClick={(e) => {
                                    e.preventDefault();
                                    table.nextPage();
                                }}
                                className="text-sm rounded bg-background-quaternary text-heading-color border border-gray-light hover:bg-base-rose hover:text-base-white min-w-6 h-8 transition-colors duration-300 ease-in-out"
                                disabled={!table.getCanNextPage()}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default TablePagination;
