import { useEffect } from "react";
import { useNavigate } from "react-router";
import useRole from "@/hooks/useRole";

const DashboardDefault = () => {
    const [role, isRoleLoading] = useRole();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isRoleLoading) {
            if (role === "admin") {
                navigate("/dashboard/admin/all-users", { replace: true });
            } else {
                navigate("/dashboard/add-pet", { replace: true });
            }
        }
    }, [role, isRoleLoading, navigate]);
    return null;
};

export default DashboardDefault;
