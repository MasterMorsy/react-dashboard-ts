import React from "react";
import BusinessStore from "./context";

interface BusinessStoreProviderProps {
  children: React.ReactNode;
}

const BusinessStoreProvider = ({ children }: BusinessStoreProviderProps) => {
  const [notify, setNotify] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <BusinessStore.Provider value={{ notify, setNotify, loading, setLoading }}>
      {children}
    </BusinessStore.Provider>
  );
};

export default BusinessStoreProvider;
