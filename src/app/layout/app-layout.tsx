import { Toaster } from "@/shared/ui/sonner";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="bg-white min-h-screen">
      <Outlet />
      <Toaster position="top-center" duration={5000} />
    </div>
  );
};
