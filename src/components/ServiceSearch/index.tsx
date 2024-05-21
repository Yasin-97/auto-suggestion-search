import { useEffect, useState } from "react";
import FeaturefulSearch from "../FeaturefulSearch";

export type ServiceType = { id: string; name: string };

function ServiceSearch() {
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    fetch("/api/services?zoneId=1").then((res) =>
      res.json().then((s) => setServices(s))
    );
  }, []);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-white z-[99999] cursor-default">
      <div className="px-3 py-7 max-w-96 m-auto">
        <FeaturefulSearch services={services} />
      </div>
    </div>
  );
}

export default ServiceSearch;
