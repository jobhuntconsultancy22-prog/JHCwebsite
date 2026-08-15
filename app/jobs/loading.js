import SkeletonHeaderBar from "@/components/SkeletonHeaderBar";
import Skeleton from "@/components/Skeleton";

export default function JobsLoading() {
  return (
    <>
      <SkeletonHeaderBar />
      <section className="page-hero">
        <div className="wrap">
          <Skeleton width="140px" height="14px" style={{ marginBottom: 16 }} />
          <Skeleton width="60%" height="40px" style={{ marginBottom: 12 }} />
          <Skeleton width="80%" height="16px" />
        </div>
      </section>
      <section>
        <div className="wrap">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-card">
              <Skeleton width="45%" height="20px" style={{ marginBottom: 12 }} />
              <Skeleton width="65%" height="14px" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
