import AuthProvider from "@/components/AuthProvider";
import DashboardNav from "@/components/DasboardNav";
import Footer from "@/components/Footer";
import React from "react";

const layout = ({ children }) => {

  return (
    <main>
      <AuthProvider>
        <DashboardNav />
        {children}
        <Footer />
      </AuthProvider>
    </main>
  );
};

export default layout;
