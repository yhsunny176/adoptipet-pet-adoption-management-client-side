import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import AddedPetsSkeleton from "@/components/loader/Skeletons/AddedPetsSkeleton";
import TablePagination from "@/components/pagination/TablePagination";
import EmptyState from "@/components/EmptyState";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import RefundModal from "@/components/modal/RefundModal";

const MyDonations = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [sort, setSort] = useState([]);
    const { theme } = useTheme();
    const [deleteData, setDeleteData] = useState(null);

    const {
        data: myDons = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["myDons", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/dashboard/my-donations/${user?.email}`);
            return data;
        },
    });

    // Delete pet handler
    const handleRefund = async (donId) => {
        try {
            const { data } = await axiosSecure.delete(`/dashboard/donation-delete/${donId}`);
            if (data?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: data.message || "The Donation has been Refunded successfully",
                    timer: 1800,
                    showConfirmButton: false,
                });
            }
            setDeleteData(null);
            refetch();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to Refund Donation");
        }
    };

    const columns = [
        {
            header: "Serial",
            id: "serial",
            cell: () => null,
            enableSorting: false,
        },
        {
            header: "Pet Image",
            accessorKey: "pet_image",
            cell: (info) => (
                <img src={info.getValue()} alt="pet image" className="mx-auto object-cover rounded-lg h-14 w-18" />
            ),
            enableSorting: false,
        },
        {
            header: "Pet Name",
            accessorKey: "pet_name",
        },
        {
            header: "Donated Amount",
            accessorKey: "amount_donated",
        },
        {
            header: "Actions",
            id: "actions",
            cell: (info) => {
                const donation = info.row.original;
                return (
                    <div className="flex gap-2">
                        {/* Delete Button */}
                        <Button
                            size="sm"
                            className="px-2 py-1 bg-base-white text-base-orange border border-base-rose-dark hover:bg-base-rose-dark hover:text-base-white rounded text-sm hover:shadow-card-primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeleteData(donation._id);
                            }}>
                            Refund
                        </Button>
                    </div>
                );
            },
            enableSorting: false,
        },
    ];

    const table = useReactTable({
        data: myDons,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting: sort,
        },
        onSortingChange: setSort,
        manualPagination: false,
        pageCount: Math.ceil(myDons.length / 10),
        initialState: { pagination: { pageSize: 10 } },
    });

    if (isLoading) return <AddedPetsSkeleton />;

    if (!isLoading && myDons.length === 0) {
        // handle empty state in table body
    }

    return (
        <>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex justify-center">
                        <div className="w-full max-w-11/12 sm:max-w-full">
                            <div className="shadow-card-primary border border-card-border-prim bg-background-tertiary rounded-lg overflow-hidden">
                                <div className="w-full overflow-x-auto">
                                    <table className="min-w-full leading-normal">
                                        {/* Table Heading */}
                                        <thead>
                                            {table.getHeaderGroups().map((headerGroup) => (
                                                <tr key={headerGroup.id}>
                                                    {headerGroup.headers.map((header) => (
                                                        <th
                                                            key={header.id}
                                                            className={`px-8 pt-8 pb-6 bg-background-quaternary border-b border-card-border-prim text-heading-color font-bold font-pg text-md uppercase cursor-pointer select-none ${
                                                                header.id === "actions"
                                                                    ? "text-donation_left"
                                                                    : "text-center"
                                                            }`}
                                                            onClick={
                                                                header.column.getCanSort()
                                                                    ? header.column.getToggleSortingHandler()
                                                                    : undefined
                                                            }>
                                                            <span className="inline-flex items-center gap-1">
                                                                {flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )}
                                                                {header.column.getIsSorted() ? (
                                                                    header.column.getIsSorted() === "asc" ? (
                                                                        <ChevronUpIcon className="w-4 h-4" />
                                                                    ) : (
                                                                        <ChevronDownIcon className="w-4 h-4" />
                                                                    )
                                                                ) : null}
                                                            </span>
                                                        </th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead>

                                        {/* Table Body Start */}
                                        <tbody>
                                            {/* Rows */}
                                            {myDons.length === 0 ? (
                                                <tr>
                                                    <td colSpan={columns.length} className="py-12">
                                                        <EmptyState />
                                                    </td>
                                                </tr>
                                            ) : (
                                                table.getRowModel().rows.map((row, idx) => (
                                                    <tr
                                                        key={row.id}
                                                        className={`cursor-pointer transition-colors duration-200 ${
                                                            theme === "light"
                                                                ? "hover:bg-gray-extra-light"
                                                                : "hover:bg-gray-dark"
                                                        }`}>
                                                        <td className="px-12 py-4 border-b border-card-border-prim text-md text-center text-pg-base">
                                                            {idx + 1}
                                                        </td>

                                                        {/* Action Buttons */}
                                                        {row
                                                            .getVisibleCells()
                                                            .filter((cell) => cell.column.id !== "serial")
                                                            .map((cell) => (
                                                                <td
                                                                    key={cell.id}
                                                                    className={`px-5 py-5 border-b border-card-border-prim text-md text-pg-base capitalize font-medium ${
                                                                        cell.column.id === "actions"
                                                                            ? "text-left"
                                                                            : "text-center"
                                                                    }`}>
                                                                    {flexRender(
                                                                        cell.column.columnDef.cell,
                                                                        cell.getContext()
                                                                    )}
                                                                </td>
                                                            ))}
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {/* Pagination Controls */}
                                {myDons.length > 10 && (
                                    <div className="flex justify-between items-center px-6 py-6  bg-background-tertiary border-t">
                                        <div className="min-w-max font-medium text-pg-base">
                                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                                        </div>
                                        <div className="w-full flex justify-end">
                                            {/* Shadcn Pagination */}

                                            <TablePagination table={table} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Delete Modal */}
            <RefundModal
                isOpen={!!deleteData}
                closeModal={() => setDeleteData(null)}
                onConfirm={() => handleRefund(deleteData)}
            />
        </>
    );
};

export default MyDonations;
