import React from "react";
import Skeleton from "react-loading-skeleton";

const TABLE_ROWS = 10;
const TABLE_COLS = [
  { key: "serial", width: 40 },
  { key: "pet_image", width: 72, height: 56 },
  { key: "pet_name", width: 100 },
  { key: "category", width: 100 },
  { key: "status", width: 80 },
  { key: "actions", width: 180 },
];

const AddedPetsSkeleton = () => {
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
                      {TABLE_COLS.map((col) => (
                        <th
                          key={col.key}
                          className={`px-8 pt-8 pb-6 bg-background-quaternary border-b border-card-border-prim text-heading-color font-bold font-pg text-md uppercase ${col.key === "actions" ? "text-left" : "text-center"}`}
                        >
                          <Skeleton width={col.width} height={20} borderRadius="4px" count={1} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: TABLE_ROWS }).map((_, idx) => (
                      <tr key={idx} className="cursor-pointer transition-colors duration-200">
                        {/* Serial */}
                        <td className="px-12 py-4 border-b border-card-border-prim text-md text-center text-pg-base">
                          <Skeleton width={32} height={20} borderRadius="4px" count={1} />
                        </td>
                        {/* Pet Image */}
                        <td className="px-5 py-5 border-b border-card-border-prim text-md text-center capitalize font-medium">
                          <Skeleton width={72} height={56} borderRadius="8px" count={1} />
                        </td>
                        {/* Pet Name */}
                        <td className="px-5 py-5 border-b border-card-border-prim text-md text-center capitalize font-medium">
                          <Skeleton width={100} height={20} borderRadius="4px" count={1} />
                        </td>
                        {/* Category */}
                        <td className="px-5 py-5 border-b border-card-border-prim text-md text-center capitalize font-medium">
                          <Skeleton width={100} height={20} borderRadius="4px" count={1} />
                        </td>
                        {/* Status */}
                        <td className="px-5 py-5 border-b border-card-border-prim text-md text-center capitalize font-medium">
                          <Skeleton width={80} height={20} borderRadius="4px" count={1} />
                        </td>
                        {/* Actions */}
                        <td className="px-5 py-5 border-b border-card-border-prim text-md text-left capitalize font-medium">
                          <div className="flex gap-2">
                            <Skeleton width={60} height={28} borderRadius="6px" count={1} style={{ display: "inline-block" }} />
                            <Skeleton width={60} height={28} borderRadius="6px" count={1} style={{ display: "inline-block" }} />
                            <Skeleton width={60} height={28} borderRadius="6px" count={1} style={{ display: "inline-block" }} />
                          </div>
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

export default AddedPetsSkeleton;
