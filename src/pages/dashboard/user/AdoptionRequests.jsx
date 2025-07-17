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
import { toast } from "react-toastify";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import AddedPetsSkeleton from "@/components/loader/Skeletons/AddedPetsSkeleton";
import TablePagination from "@/components/pagination/TablePagination";
import EmptyState from "@/components/Emptystate";

const AdoptionRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [acceptLoading, setAcceptLoading] = useState(null);
    const [rejectLoading, setRejectLoading] = useState(null);
    const [dynamicStatus, setDynamicStatus] = useState({});
    const [sort, setSort] = useState([]);
    const { theme } = useTheme();

    const {
        data: adoptReqData = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["adoptReqData", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/dashboard/adoption-requests/${user?.email}`);
            return data;
        },
    });

    // Acceptance handler
    const acceptAdoptRequest = async (pet) => {
        setAcceptLoading(pet._id);
        setDynamicStatus((prev) => ({ ...prev, [pet._id]: "accepted" }));
        try {
            await axiosSecure.patch(`/adoption-request-update/${pet._id}`, { adoption_status: "accepted" });
            refetch();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to update adoption status");
        } finally {
            setAcceptLoading(null);
        }
    };

    // Rejection handler
    const rejectAdoptRequest = async (pet) => {
        setRejectLoading(pet._id);
        setDynamicStatus((prev) => ({ ...prev, [pet._id]: "rejected" }));
        try {
            await axiosSecure.patch(`/adoption-request-update/${pet._id}`, { adoption_status: "rejected" });
            refetch();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to update adoption status");
        } finally {
            setRejectLoading(null);
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
                <img src={info.getValue()} alt="pet" className="mx-auto object-cover rounded-lg h-14 w-18" />
            ),
            enableSorting: false,
        },
        {
            header: "Pet Name",
            accessorKey: "pet_name",
        },
        {
            header: "Username",
            accessorKey: "user_name",
        },
        {
          header: "Email",
          accessorKey: "user_email",  
        },
        {
          header: "Phone Number",
          accessorKey: "phone",  
        },
        {
          header: "Adopter Address",
          accessorKey: "address",  
        },
        {
            header: "Request Status",
            accessorKey: "adoption_status",
            cell: (info) => {
                const status = info.getValue();
                let label = "pending";
                let colorClass = "text-gray-medium font-pg font-semibold";
                if (status === "accepted") {
                    label = "Accepted";
                    colorClass = "text-green-primary font-pg font-semibold";
                } else if (status === "rejected") {
                    label = "Rejected";
                    colorClass = "text-base-rose font-pg font-semibold";
                }
                return <span className={colorClass}>{label}</span>;
            },
            sortingFn: (rowA, rowB, columnId) => {
                // Sort adopted first
                return (rowB.getValue(columnId) ? 1 : 0) - (rowA.getValue(columnId) ? 1 : 0);
            },
        },
        {
            header: "Adoption Request",
            id: "actions",
            cell: (info) => {
                const pet = info.row.original;
                const status = dynamicStatus[pet._id] || pet.adoption_status;
                return (
                    <div className="flex gap-2">
                        {status === "accepted" ? (
                            <Button
                                size="sm"
                                className="px-2 py-1 bg-base-white text-green-primary border border-green-primary rounded text-sm opacity-50 cursor-not-allowed"
                                disabled>
                                Accepted
                            </Button>
                        ) : status === "rejected" ? (
                            <Button
                                size="sm"
                                className="px-2 py-1 bg-base-white text-base-rose border border-base-rose rounded text-sm opacity-50 cursor-not-allowed"
                                disabled>
                                Rejected
                            </Button>
                        ) : (
                            <>
                                <Button
                                    size="sm"
                                    className={`px-2 py-1 bg-base-white text-green-primary border border-green-primary hover:bg-green-primary hover:text-base-white rounded text-sm hover:shadow-card-primary`}
                                    disabled={acceptLoading === pet._id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        acceptAdoptRequest(pet);
                                    }}>
                                    {acceptLoading === pet._id ? "Accepting.." : "Accept"}
                                </Button>
                                <Button
                                    size="sm"
                                    className={`px-2 py-1 bg-base-white text-base-rose border border-base-rose hover:bg-base-rose hover:text-base-white rounded text-sm hover:shadow-card-primary`}
                                    disabled={rejectLoading === pet._id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        rejectAdoptRequest(pet);
                                    }}>
                                    {rejectLoading === pet._id ? "Rejecting.." : "Reject"}
                                </Button>
                            </>
                        )}
                    </div>
                );
            },
            enableSorting: false,
        },
    ];

    const table = useReactTable({
        data: adoptReqData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting: sort,
        },
        onSortingChange: setSort,
        manualPagination: false,
        pageCount: Math.ceil(adoptReqData.length / 10),
        initialState: { pagination: { pageSize: 10 } },
    });

    if (isLoading) return <AddedPetsSkeleton />;

    if (!isLoading && adoptReqData.length === 0) {
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
                                                                header.id === "actions" ? "text-left" : "text-center"
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
                                            {adoptReqData.length === 0 ? (
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
                                                                    className={`px-5 py-5 border-b border-card-border-prim text-md text-pg-base font-medium ${
                                                                        cell.column.id === "actions"
                                                                            ? "text-center"
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
                                {adoptReqData.length > 10 && (
                                    <div className="flex justify-between items-center px-6 py-6  bg-background-tertiary border-t">
                                        <div className="min-w-max font-medium">
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
        </>
    );
};

export default AdoptionRequests;
