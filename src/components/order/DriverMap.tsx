import { useReactiveVar } from "@apollo/client";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import { globalPositionVars } from "../../apollo";
import { getDriverOrder_getDriverOrder_order } from "../../__generated__/getDriverOrder";

interface DriverMapProps {
  order: getDriverOrder_getDriverOrder_order | undefined | null;
}

const DriverMap = ({ order }: DriverMapProps) => {
  const coords = useReactiveVar(globalPositionVars);
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();
  const [isMarker, setIsMarker] = useState<boolean>(false);

  const onApiLoaded = ({ map, maps }: { map: google.maps.Map; maps: any }) => {
    setMap(map);
    setMaps(maps);
    map.panTo(new google.maps.LatLng(coords.lat, coords.lng));
  };

  useEffect(() => {
    if (!(map && order && coords.lat && coords.lng)) return;
    if (isMarker) return;
    new google.maps.Marker({
      position: { lat: coords.lat, lng: coords.lng },
      map,
      label: {
        color: "#FFF",
        text: "A",
      },
    });

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode(
      {
        address: order?.restaurant?.address || "",
      },
      (result) => {
        if (result.length < 1) return;
        const position = {
          lat: result[0].geometry.location.lat(),
          lng: result[0].geometry.location.lng(),
        };
        new google.maps.Marker({
          position,
          map,
          label: {
            color: "#FFF",
            text: "B",
          },
        });
      }
    );

    geocoder.geocode(
      {
        address: order.customer?.address || "",
      },
      (result) => {
        if (result.length < 1) return;
        const position = {
          lat: result[0].geometry.location.lat(),
          lng: result[0].geometry.location.lng(),
        };

        new google.maps.Marker({
          position,
          map,
          label: {
            color: "#FFF",
            text: "C",
          },
        });
      }
    );

    setIsMarker(true);
  }, [coords.lat, coords.lng, order?.customer?.address, map, order, isMarker]);

  useEffect(() => {
    if (!map || !maps) return;
    map.panTo(new google.maps.LatLng(coords.lat, coords.lng));
  }, [coords.lat, coords.lng, map, maps]);

  return (
    <>
      <div
        className="overflow-hidden"
        style={{
          width: window.innerWidth,
          height: "30vh",
        }}
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          draggable={true}
          defaultZoom={13}
          defaultCenter={{
            lat: 37.5675133,
            lng: 126.9234105,
          }}
          bootstrapURLKeys={{
            key: "AIzaSyDS6BuMms5Hz6FQgnoEDt_7V2Tb-mdL_K4",
          }}
        ></GoogleMapReact>
      </div>
      <div className="mt-2 text-sm font-semibold text-center">
        <span className="mr-3">A - 현재위치</span>
        <span className="mr-3">B - 가게위치</span>
        <span className="mr-3">C - 배달위치</span>
      </div>
    </>
  );
};

export default DriverMap;
