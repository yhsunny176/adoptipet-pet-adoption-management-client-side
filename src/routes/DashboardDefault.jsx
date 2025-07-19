import { useEffect } from "react";
import { useNavigate } from "react-router";
import useRole from "@/hooks/useRole";

import { toast } from "react-toastify";

const DashboardDefault = () => {
    const [role, isRoleLoading] = useRole();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isRoleLoading) {
            if (!role) {
                navigate("/", { replace: true });
                toast.error("User role not found");
            } else if (role === "admin") {
                navigate("/dashboard/admin/all-users", { replace: true });
            } else {
                navigate("/dashboard/add-pet", { replace: true });
            }
        }
    }, [role, isRoleLoading, navigate]);
    return null;
};

export default DashboardDefault;
