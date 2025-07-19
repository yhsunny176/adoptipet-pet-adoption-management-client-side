import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AdminAllPetsSkeleton = () => {
    // 10 rows, matching table columns: Serial, Pet Image, Pet Name, Category, Status, Actions
    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex justify-center">
                    <div className="w-full max-w-11/12 sm:max-w-full">
                        <div className="shadow-card-primary border border-card-border-prim bg-background-tertiary rounded-lg overflow-hidden">
                            <div className="w-full overflow-x-auto">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-8 pt-8 pb-6 bg-background-quaternary border-b border-card-border-prim text-heading-color font-bold font-pg text-md uppercase text-center"><Skeleton width={40} /></th>
                                            <th className="px-8 pt-8 pb-6 bg-background-quaternary border-b border-card-border-prim text-heading-color font-bold font-pg text-md uppercase text-center"><Skeleton width={80} /></th>
                                            <th className="px-8 pt-8 pb-6 bg-background-quaternary border-b border-card-border-prim text-heading-color font-bold font-pg text-md uppercase text-center"><Skeleton width={100} /></th>
                                            <th className="px-8 pt-8 pb-6 bg-background-quaternary border-b border-card-border-prim text-heading-color font-bold font-pg text-md uppercase text-center"><Skeleton width={80} /></th>
                                            <th className="px-8 pt-8 pb-6 bg-background-quaternary border-b border-card-border-prim text-heading-color font-bold font-pg text-md uppercase text-center"><Skeleton width={80} /></th>
                                            <th className="px-8 pt-8 pb-6 bg-background-quaternary border-b border-card-border-prim text-heading-color font-bold font-pg text-md uppercase text-left"><Skeleton width={120} /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...Array(10)].map((_, idx) => (
                                            <tr key={idx}>
                                                <td className="px-12 py-4 border-b border-card-border-prim text-md text-center"><Skeleton width={30} /></td>
                                                <td className="px-5 py-5 border-b border-card-border-prim text-md text-center"><Skeleton circle height={56} width={72} /></td>
                                                <td className="px-5 py-5 border-b border-card-border-prim text-md text-center"><Skeleton width={80} /></td>
                                                <td className="px-5 py-5 border-b border-card-border-prim text-md text-center"><Skeleton width={60} /></td>
                                                <td className="px-5 py-5 border-b border-card-border-prim text-md text-center"><Skeleton width={60} /></td>
                                                <td className="px-5 py-5 border-b border-card-border-prim text-md text-left flex gap-2">
                                                    <Skeleton width={60} height={32} style={{ borderRadius: 8 }} />
                                                    <Skeleton width={60} height={32} style={{ borderRadius: 8 }} />
                                                    <Skeleton width={60} height={32} style={{ borderRadius: 8 }} />
                                                    <Skeleton width={60} height={32} style={{ borderRadius: 8 }} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAllPetsSkeleton;
