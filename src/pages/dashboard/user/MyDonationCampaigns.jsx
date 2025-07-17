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
import { useNavigate } from "react-router";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import AddedPetsSkeleton from "@/components/loader/Skeletons/AddedPetsSkeleton";
import TablePagination from "@/components/pagination/TablePagination";
import EmptyState from "@/components/EmptyState";
import DonatorsModal from "@/components/modal/DonatorsModal";

const MyDonationCampaigns = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [sort, setSort] = useState([]);
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const {
        data: myDonInfo = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["myDonInfo", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/dashboard/my-campaign-data/${user?.email}`);
            return data;
        },
    });

    // SweetAlert for Login warning before adoption request
    const handleUpdateClick = async (open) => {
        if (!user) {
            const Swal = (await import("sweetalert2")).default;
            Swal.fire({
                icon: "info",
                title: "Login Required",
                text: "Please log in to adopt a pet.",
                confirmButtonText: "OK",
            });
            return;
        }
        setIsOpen(open);
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
            header: "Maximum Donation Amount",
            accessorKey: "max_amount",
        },
        {
            header: "Pause/Active Status",
            accessorKey: "paused",
            cell: (info) =>
                info.getValue() ? (
                    <span className="text-red-rose font-semibold">Paused</span>
                ) : (
                    <span className="text-green-primary font-semibold">Active</span>
                ),
        },
        {
            header: "Actions",
            id: "actions",
            cell: (info) => {
                const donation = info.row.original;
                const handlePauseToggle = async (e) => {
                    e.stopPropagation();
                    try {
                        await axiosSecure.patch(`/update-donation-campaign/${donation._id}`, {
                            paused: !donation.paused,
                        });
                        // Refetch campaigns
                        refetch();
                    } catch {
                        alert("Failed to update pause status");
                    }
                };
                return (
                    <div className="flex gap-2">
                        {/* Edit Button */}
                        <Button
                            variant={"lg"}
                            className="px-4 py-1 bg-blue-regular text-base-white hover:text-base-white rounded text-sm hover:shadow-md transition-shadow duration-400 ease-in-out"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/update-donation-campaign/${donation._id}`);
                            }}>
                            Edit
                        </Button>
                        {/* Pause/Unpause Button */}
                        <Button
                            variant={"lg"}
                            className={`px-4 py-1 ${
                                donation.paused ? "bg-gray-medium text-black-base" : "bg-green-primary"
                            } px-2 py-1 text-base-white hover:text-base-white rounded text-sm hover:shadow-md transition-shadow duration-400 ease-in-out`}
                            onClick={handlePauseToggle}>
                            {donation.paused ? "Unpause" : "Pause"}
                        </Button>
                        {/* View Donators button */}
                        <div className="col-span-full flex flex-col items-stretch">
                            <DonatorsModal
                                open={isOpen}
                                onOpenChange={handleUpdateClick}
                                trigger={
                                    <Button
                                        variant="lg"
                                        className={
                                            "px-2 py-1 bg-base-orange text-base-white hover:text-base-white rounded text-sm hover:shadow-md transition-shadow duration-400 ease-in-out"
                                        }>
                                        View Donators
                                    </Button>
                                }
                                title={`Donators for the ${donation.pet_name}:`}
                            />
                        </div>
                    </div>
                );
            },
            enableSorting: false,
        },
    ];

    const table = useReactTable({
        data: myDonInfo,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting: sort,
        },
        onSortingChange: setSort,
        manualPagination: false,
        pageCount: Math.ceil(myDonInfo.length / 10),
        initialState: { pagination: { pageSize: 10 } },
    });

    if (isLoading) return <AddedPetsSkeleton />;

    if (!isLoading && myDonInfo.length === 0) {
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
                                            {/* Rows */}
                                            {myDonInfo.length === 0 ? (
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
                                {myDonInfo.length > 10 && (
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
        </>
    );
};

export default MyDonationCampaigns;
