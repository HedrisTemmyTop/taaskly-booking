import React from "react";
import SkeletonLoader from "../_components/SkeletonLoader";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <SkeletonLoader
        className="min-h-[300px] shadow-sm bg-grey-250"
        duration={2}
      />
    </div>
  );
}
