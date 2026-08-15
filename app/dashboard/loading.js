import SkeletonHeaderBar from "@/components/SkeletonHeaderBar";
import Skeleton from "@/components/Skeleton";

export default function DashboardLoading() {
  return (
    <>
      <SkeletonHeaderBar />
      <section className="page-hero">
        <div className="wrap">
          <Skeleton width="140px" height="14px" style={{ marginBottom: 16 }} />
          <Skeleton width="45%" height="32px" />
        </div>
      </section>
      <section>
        <div className="wrap">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-row" style={{ justifyContent: "space-between" }}>
                <Skeleton width="35%" height="18px" />
                <Skeleton width="80px" height="14px" />
              </div>
              <Skeleton width="100%" height="30px" style={{ marginTop: 16 }} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
