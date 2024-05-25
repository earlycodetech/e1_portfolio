import AuthProvider from "@/components/AuthProvider";
import DashboardNav from "@/components/DasboardNav";
import Footer from "@/components/Footer";
import React from "react";
import { Toaster } from "@/components/ui/toaster"

const layout = ({ children }) => {

  return (
    <main>
      <AuthProvider>
        <DashboardNav />
        {children}
        <Footer />
        <Toaster />
      </AuthProvider>
    </main>
  );
};

export default layout;
