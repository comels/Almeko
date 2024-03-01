import clsx from "clsx";
import { Loader2 } from "lucide-react";

export const Loader = ({ size, className }) => {
  return <Loader2 className={clsx("animate-spin", className)} size={size} />;
};
