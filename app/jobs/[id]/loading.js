import SkeletonHeaderBar from "@/components/SkeletonHeaderBar";
import Skeleton from "@/components/Skeleton";

export default function JobDetailLoading() {
  return (
    <>
      <SkeletonHeaderBar />
      <section className="page-hero">
        <div className="wrap">
          <Skeleton width="120px" height="14px" style={{ marginBottom: 16 }} />
          <Skeleton width="55%" height="36px" style={{ marginBottom: 12 }} />
          <Skeleton width="40%" height="14px" />
        </div>
      </section>
      <section>
        <div className="wrap grid grid-2" style={{ alignItems: "start" }}>
          <div>
            <Skeleton width="30%" height="20px" style={{ marginBottom: 16 }} />
            <Skeleton width="100%" height="14px" style={{ marginBottom: 8 }} />
            <Skeleton width="95%" height="14px" style={{ marginBottom: 8 }} />
            <Skeleton width="88%" height="14px" style={{ marginBottom: 24 }} />
            <Skeleton width="30%" height="20px" style={{ marginBottom: 16 }} />
            <Skeleton width="90%" height="14px" style={{ marginBottom: 8 }} />
            <Skeleton width="80%" height="14px" />
          </div>
          <div className="skeleton-card">
            <Skeleton width="60%" height="18px" style={{ marginBottom: 16 }} />
            <Skeleton width="100%" height="40px" />
          </div>
        </div>
      </section>
    </>
  );
}
