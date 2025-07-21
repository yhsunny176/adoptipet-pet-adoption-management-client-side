import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
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
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import DeleteModal from "@/components/modal/DeleteModal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AllDonationCampaigns = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [sort, setSort] = useState([]);
    const { theme } = useTheme();
    const [deleteData, setDeleteData] = useState(null);
    const [pausingId, setPausingId] = useState(null);

    const {
        data: donationInfo = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["donationInfo"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/admin/dashboard/all-donations`);
            return data;
        },
    });

    // Delete Donation handler
    const handleDeleteCampaign = async (donId) => {
        try {
            const { data } = await axiosSecure.delete(`/admin/delete-donation-campaign/${donId}`);
            if (data?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: data.message || "The Donation Campaign has been Deleted successfully",
                    timer: 1800,
                    showConfirmButton: false,
                });
            }
            setDeleteData(null);
            refetch();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to Delete Donation Campaign");
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
            header: "Maximum Donation Amount",
            accessorKey: "max_amount",
        },
        {
            header: "Donation Progress",
            id: "progress",
            cell: (info) => {
                const donation = info.row.original;
                const max = Number(donation.max_amount) || 0;
                const current = Number(donation.total_donations) || 0;
                const percent = max > 0 ? Math.min(100, Math.round((current / max) * 100)) : 0;
                return (
                    <div className="w-full min-w-[120px] flex items-center justify-center gap-4">
                        <div className="w-15 h-15 flex items-center justify-center">
                            <CircularProgressbar
                                value={percent}
                                text={`${percent}%`}
                                styles={buildStyles({
                                    pathColor: "#22c55e",
                                    textColor: "#22c55e",
                                    trailColor: "#e5e7eb",
                                    textSize: "2rem",
                                })}
                            />
                        </div>
                        <div className="flex flex-col items-end justify-center text-right min-w-16">
                            <span className="text-base text-green-primary font-bold">
                                {current} / {max}
                            </span>
                        </div>
                    </div>
                );
            },
            enableSorting: false,
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
                    setPausingId(donation._id);
                    try {
                        await axiosSecure.patch(`/admin/update-donation-campaign/${donation._id}`, {
                            paused: !donation.paused,
                        });
                        refetch();
                    } catch {
                        alert("Failed to update pause status");
                    } finally {
                        setPausingId(null);
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
                                navigate(`/admin/update-donation-campaign/${donation._id}`);
                            }}>
                            Edit
                        </Button>
                        {/* Pause/Unpause Button */}
                        <Button
                            variant={"lg"}
                            className={`px-4 py-1 ${
                                donation.paused ? "bg-gray-medium text-black-base" : "bg-green-primary"
                            } px-2 py-1 text-base-white hover:text-base-white rounded text-sm hover:shadow-md transition-shadow duration-400 ease-in-out`}
                            onClick={handlePauseToggle}
                            disabled={pausingId === donation._id}>
                            {pausingId === donation._id
                                ? donation.paused
                                    ? "Unpausing..."
                                    : "Pausing..."
                                : donation.paused
                                ? "Unpause"
                                : "Pause"}
                        </Button>

                        {/* Delete Button */}
                        <Button
                            variant={"lg"}
                            className="px-4 py-1 bg-base-rose text-base-white hover:text-base-white rounded text-sm hover:shadow-md transition-shadow duration-400 ease-in-out"
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeleteData(donation._id);
                            }}>
                            Delete
                        </Button>
                    </div>
                );
            },
            enableSorting: false,
        },
    ];

    const table = useReactTable({
        data: donationInfo,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting: sort,
        },
        onSortingChange: setSort,
        manualPagination: false,
        pageCount: Math.ceil(donationInfo.length / 10),
        initialState: { pagination: { pageSize: 10 } },
    });

    if (isLoading) return <AddedPetsSkeleton />;

    if (!isLoading && donationInfo.length === 0) {
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
                                            {donationInfo.length === 0 ? (
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
                                                                            ? "text-donation_left"
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
                                {donationInfo.length > 10 && (
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
            <DeleteModal
                isOpen={!!deleteData}
                closeModal={() => setDeleteData(null)}
                onConfirm={() => handleDeleteCampaign(deleteData)}
            />
        </>
    );
};

export default AllDonationCampaigns;
