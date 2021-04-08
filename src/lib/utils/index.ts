import haversine from "haversine";

export function distanceText(distance: number) {
  if (distance < 1) {
    return `${distance * 1000}m`;
  }
  return distance.toFixed(1) + "km";
}

export function distanceCalc(
  start: { lat: number; lng: number },
  end: { lat: number; lng: number }
) {
  if (!start.lat || !start.lng) return 0;
  const distance = +haversine(
    {
      latitude: start.lat,
      longitude: start.lng,
    },
    {
      latitude: end.lat,
      longitude: end.lng,
    }
  ).toFixed(3);

  return distance;
}
