import SkeletonHeaderBar from "@/components/SkeletonHeaderBar";
import Skeleton from "@/components/Skeleton";

export default function ManageJobLoading() {
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
          <div className="skeleton-row" style={{ justifyContent: "space-between", marginBottom: 20 }}>
            <Skeleton width="160px" height="18px" />
            <Skeleton width="140px" height="40px" />
          </div>
          <div className="skeleton-card">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton-row">
                <Skeleton width="25%" height="16px" />
                <Skeleton width="20%" height="16px" />
                <Skeleton width="15%" height="16px" />
                <Skeleton width="15%" height="16px" />
                <Skeleton width="15%" height="16px" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
