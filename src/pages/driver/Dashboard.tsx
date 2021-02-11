import React, { useEffect, useState } from "react";
import DriverDashboradNav from "../../components/order/DriverDashboradNav";
import WatingOrdersPage from "./WatingOrdersPage";

export enum IStatus {
  wating = "wating",
  working = "working",
  done = "done",
}

interface ICoords {
  lat: number;
  lng: number;
}

function Dashboard() {
  const [status, setStatus] = useState<IStatus>(IStatus.wating);

  const onClickNav = (status: IStatus) => () => setStatus(status);

  const [coords, setCoords] = useState<ICoords>({ lat: 0, lng: 0 });

  const onSuccess = (data: GeolocationPosition) => {
    setCoords({
      lat: data.coords.latitude,
      lng: data.coords.longitude,
    });
  };

  // const geocoder = new google.maps.Geocoder();

  // geocoder.geocode(
  //   {
  //     address: "서울특별시 연희동 446-260",
  //   },
  //   (result, status) => {
  //     console.log(result);
  //     console.log(status);
  //   }
  // );

  const onError = () => {
    console.log("Error");
  };

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div>
      <DriverDashboradNav status={status} onClick={onClickNav} />
      {status === IStatus.wating && <WatingOrdersPage />}
    </div>
  );
}

export default Dashboard;
