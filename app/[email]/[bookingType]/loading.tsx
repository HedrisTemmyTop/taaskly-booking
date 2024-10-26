import SkeletonLoader from "@/app/_components/SkeletonLoader";
import React from "react";

export default function Loading() {
  return (
    <div className="  m-auto relative min-h-[100vh] ">
      <div className="absolute top-1/2 left-1/2 w-[800px]  h-[400px] -translate-x-1/2 -translate-y-1/2">
        <SkeletonLoader
          className="min-h-[400px] shadow-sm bg-grey-250 max-w-[800px]"
          duration={2}
        />
      </div>
    </div>
  );
}
