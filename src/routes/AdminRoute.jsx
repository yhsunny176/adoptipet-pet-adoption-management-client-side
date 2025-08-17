import { Navigate } from 'react-router'
import useRole from '@/hooks/useRole'
import PageLoader from '@/components/loader/PageLoader'

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <PageLoader />
  if (role === 'admin') return children
  return <Navigate to='/dashboard' replace='true' />
}

export default AdminRoute