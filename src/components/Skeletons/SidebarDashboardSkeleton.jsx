import Skeleton from "react-loading-skeleton";


const SidebarDashboardSkeleton = () => {
  return (
    <aside style={{ width: 250, padding: '1rem', background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Profile section */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
        <Skeleton circle height={48} width={48} />
        <div style={{ marginLeft: 16 }}>
          <Skeleton height={18} width={120} style={{ marginBottom: 8 }} />
          <Skeleton height={14} width={80} />
        </div>
      </div>
      {/* Navigation links */}
      <nav>
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} style={{ marginBottom: 20 }}>
            <Skeleton height={16} width={180} />
          </div>
        ))}
      </nav>
      {/* Bottom button */}
      <div style={{ position: 'absolute', bottom: 32, left: 24, right: 24 }}>
        <Skeleton height={36} width={200} />
      </div>
    </aside>
  );
};

export default SidebarDashboardSkeleton;
