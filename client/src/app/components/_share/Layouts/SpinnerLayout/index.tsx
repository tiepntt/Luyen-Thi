import React from "react";
import Loading from "../../StaticLayout/Loading";
import clsx from "clsx";
interface Props {
  loading: any;
  className?: string;
}
const SnipperLayout: React.FC<Props> = ({ children, loading, className }) => {
  return (
    <>
      {loading ? (
        <>{children}</>
      ) : (
        <div className={clsx(className, "d-flex")}>
          <Loading />
        </div>
      )}
    </>
  );
};

export default SnipperLayout;
