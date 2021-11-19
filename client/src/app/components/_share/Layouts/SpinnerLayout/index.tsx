import React from "react";
import Loading from "../../StaticLayout/Loading";
import clsx from "clsx";
import { size } from "lodash";
interface Props {
  loading: any;
  className?: string;
  size?: "normal" | "sm";
  showLabel?: boolean;
}
const SnipperLayout: React.FC<Props> = ({
  children,
  loading,
  className,
  size,
  showLabel,
}) => {
  return (
    <>
      {loading ? (
        <>{children}</>
      ) : (
        <div className={clsx(className, "d-flex")}>
          <Loading size={size} showLabel={showLabel} />
        </div>
      )}
    </>
  );
};

export default SnipperLayout;
