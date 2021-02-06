import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps extends ICoords {
  $hover?: any;
}

const Driver: React.FC<IDriverProps> = () => <div className="text-lg">🚖</div>;

function Dashboard() {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 0, lng: 0 });

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDriverCoords({ lat: latitude, lng: longitude });
  };
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const onApiLoaded = ({ map, maps }: { map: google.maps.Map; maps: any }) => {
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
  };

  return (
    <div className="flex-1">
      <div className="overflow-hidden w-full h-1/2">
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={15}
          draggable={false}
          center={{
            lat: driverCoords.lat,
            lng: driverCoords.lng,
          }}
          bootstrapURLKeys={{ key: "AIzaSyDS6BuMms5Hz6FQgnoEDt_7V2Tb-mdL_K4" }}
        >
          <Driver lat={driverCoords.lat} lng={driverCoords.lng} />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default Dashboard;
