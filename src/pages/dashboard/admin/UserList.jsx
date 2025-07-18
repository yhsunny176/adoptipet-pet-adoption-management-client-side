import EmptyState from "@/components/EmptyState";
import AddedPetsSkeleton from "@/components/loader/Skeletons/AddedPetsSkeleton";
import UpdateRoleModal from "@/components/modal/UpdateRoleModal";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useTheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UserList = () => {
    const [roleUpdateLoading, setRoleUpdateLoading] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const axiosSecure = useAxiosSecure();
    const [sort, setSort] = useState([]);
    const { theme } = useTheme();

    const {
        data: users,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axiosSecure("/all-users");
            return data;
        },
    });

    // Remove debug log in production

    //Mutation for updating adopt status
    const updateRoleMutation = useMutation({
        mutationFn: async ({ email, role }) => {
            return axiosSecure.patch(`/user/role-update/${email}`, { role });
        },
        onSuccess: () => {
            // refetch should be called after the role update is successful
            refetch();
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Failed to make admin status");
        },
    });

    //handle user role update
    const handleUpdateRole = async (selectedUser) => {
        if (!selectedUser || selectedUser.role === "admin") {
            setSelectedUser(null);
            return;
        }
        setRoleUpdateLoading(selectedUser.email);
        try {
            await updateRoleMutation.mutateAsync({ email: selectedUser.email, role: "admin" });
            setSelectedUser(null);
        } catch (err) {
            // Error handled by mutation onError
            toast.error(err);
        } finally {
            setRoleUpdateLoading(null);
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
            header: "User Image",
            accessorKey: "profilepic",
            cell: (info) => (
                <img src={info.getValue()} alt="pet" className="mx-auto object-cover rounded-full h-14 w-14" />
            ),
            enableSorting: false,
        },
        {
            header: "User Name",
            accessorKey: "name",
        },
        {
            header: "Email",
            accessorKey: "email",
            cell: (info) => info.getValue(),
        },
        {
            header: "Role",
            accessorKey: "role",
            cell: (info) => (
                <span
                    className={
                        info.getValue() === "admin"
                            ? "text-green-primary font-pg font-semibold"
                            : "text-base-rose font-pg font-semibold"
                    }>
                    {info.getValue() === "admin" ? "Admin" : "User"}
                </span>
            ),
            sortingFn: (rowA, rowB, columnId) => {
                // Sort Admin first
                return (rowB.getValue(columnId) === "admin" ? 1 : 0) - (rowA.getValue(columnId) === "admin" ? 1 : 0);
            },
        },
        {
            header: "Actions",
            id: "actions",
            cell: (info) => {
                const user = info.row.original;
                const isAdmin = user.role === "admin";
                return (
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            className={`px-2 py-1 bg-base-white text-green-primary border border-green-primary hover:bg-green-primary hover:text-base-white rounded text-sm hover:shadow-card-primary ${
                                isAdmin ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={isAdmin || roleUpdateLoading === user.email}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUser(user);
                            }}>
                            {isAdmin ? "Admin Made" : roleUpdateLoading === user.email ? "Processing.." : "Make Admin"}
                        </Button>
                    </div>
                );
            },
            enableSorting: false,
        },
    ];

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting: sort,
        },
        onSortingChange: setSort,
        manualPagination: false,
        pageCount: Math.ceil((users?.length || 0) / 10),
        initialState: { pagination: { pageSize: 10 } },
    });

    if (isLoading) return <AddedPetsSkeleton />;

    // Error and empty state handling
    if (!isLoading && (!users || users.length === 0)) {
        return <EmptyState message="No users found." />;
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
                                            {!users || users.length === 0 ? (
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
                                {(users?.length || 0) > 10 && (
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
            {/* Update Role Modal */}
            <UpdateRoleModal
                isOpen={!!selectedUser}
                closeModal={() => setSelectedUser(null)}
                onConfirm={() => handleUpdateRole(selectedUser)}
            />
        </>
    );
};

export default UserList;
