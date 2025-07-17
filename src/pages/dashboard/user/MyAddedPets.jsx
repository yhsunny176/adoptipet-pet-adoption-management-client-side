import { useQuery, useMutation } from "@tanstack/react-query";
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
import DeleteModal from "@/components/modal/DeleteModal";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import AddedPetsSkeleton from "@/components/loader/Skeletons/AddedPetsSkeleton";
import TablePagination from "@/components/pagination/TablePagination";
import Swal from "sweetalert2";
import EmptyState from "@/components/EmptyState";

const MyAddedPets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [deleteData, setDeleteData] = useState(null);
    const [adoptLoading, setAdoptLoading] = useState(null);
    const [sort, setSort] = useState([]);
    const { theme } = useTheme();

    const {
        data: myPetsData = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["myPetsData", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/dashboard/my-added-pets/${user?.email}`);
            return data;
        },
    });

    // Mutation for updating adopt status
    const updateAdoptStatusMutation = useMutation({
        mutationFn: async (petId) => {
            return axiosSecure.patch(`/adopt-status-update/${petId}`);
        },
        onSuccess: () => {
            refetch();
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Failed to update adoption status");
        },
    });

    // Adopt pet handler
    const handleAdopt = async (pet) => {
        setAdoptLoading(pet._id);
        try {
            await updateAdoptStatusMutation.mutateAsync(pet._id);
        } finally {
            setAdoptLoading(null);
        }
    };

    // Delete pet handler
    const handleDelete = async (petId) => {
        try {
            const { data } = await axiosSecure.delete(`/dashboard/my-added-pets/${petId}`);
            if (data?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: data.message || "Pet deleted successfully",
                    timer: 1800,
                    showConfirmButton: false,
                });
            }
            setDeleteData(null);
            refetch();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to delete pet");
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
            header: "Category",
            accessorKey: "category",
        },
        {
            header: "Status",
            accessorKey: "adopted",
            cell: (info) => (
                <span
                    className={
                        info.getValue()
                            ? "text-green-primary font-pg font-semibold"
                            : "text-base-rose font-pg font-semibold"
                    }>
                    {info.getValue() ? "Adopted" : "Not Adopted"}
                </span>
            ),
            sortingFn: (rowA, rowB, columnId) => {
                // Sort adopted first
                return (rowB.getValue(columnId) ? 1 : 0) - (rowA.getValue(columnId) ? 1 : 0);
            },
        },
        {
            header: "Actions",
            id: "actions",
            cell: (info) => {
                const pet = info.row.original;
                return (
                    <div className="flex gap-2">
                        {/* Update Button */}
                        <Button
                            size="sm"
                            className="px-2 py-1 bg-base-white text-blue-regular border border-blue-regular hover:bg-blue-regular hover:text-base-white rounded text-sm hover:shadow-card-primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/pet-update/${pet._id}`);
                            }}>
                            Update
                        </Button>

                        {/* Delete Button */}
                        <Button
                            size="sm"
                            className="px-2 py-1 bg-base-white text-base-orange border border-base-rose-dark hover:bg-base-rose-dark hover:text-base-white rounded text-sm hover:shadow-card-primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeleteData(pet._id);
                            }}>
                            Delete
                        </Button>

                        {/* Adopted Button */}
                        <Button
                            size="sm"
                            className={`px-2 py-1 bg-base-white text-green-primary border border-green-primary hover:bg-green-primary hover:text-base-white rounded text-sm hover:shadow-card-primary ${
                                pet.adopted ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={pet.adopted || adoptLoading === pet._id}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAdopt(pet);
                            }}>
                            {pet.adopted ? "Adoption Done" : adoptLoading === pet._id ? "Processing.." : "Adopted"}
                        </Button>
                    </div>
                );
            },
            enableSorting: false,
        },
    ];

    const table = useReactTable({
        data: myPetsData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting: sort,
        },
        onSortingChange: setSort,
        manualPagination: false,
        pageCount: Math.ceil(myPetsData.length / 10),
        initialState: { pagination: { pageSize: 10 } },
    });

    if (isLoading) return <AddedPetsSkeleton />;

    if (!isLoading && myPetsData.length === 0) {
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
                                            {myPetsData.length === 0 ? (
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
                                {myPetsData.length > 10 && (
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
                onConfirm={() => handleDelete(deleteData)}
            />
        </>
    );
};

export default MyAddedPets;
