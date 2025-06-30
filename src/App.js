import React, { useEffect, useRef, useState } from "react";

const sampleSites = [
  {
    mediaOwner: "JCDecaux",
    siteName: "Sandton LED",
    location: "Sandton, Johannesburg",
    lat: -26.1076,
    lng: 28.0567,
    format: "Digital Billboard",
    visibility: 85,
  },
  {
    mediaOwner: "Tractor Outdoor",
    siteName: "Sea Point LED",
    location: "Sea Point, Cape Town",
    lat: -33.918,
    lng: 18.3845,
    format: "Digital Billboard",
    visibility: 90,
  },
];

function App() {
  const mapRef = useRef(null);
  const [filter, setFilter] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!window.google || mapLoaded) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: -29.85, lng: 24.0 },
      zoom: 5,
    });

    const trafficLayer = new window.google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    sampleSites.forEach((site) => {
      const marker = new window.google.maps.Marker({
        position: { lat: site.lat, lng: site.lng },
        map,
        title: site.siteName,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="width: 250px">
            <strong>${site.siteName}</strong><br/>
            ${site.mediaOwner}<br/>
            ${site.format}<br/>
            Visibility Score: ${site.visibility}<br/><br/>
            <iframe
              width="100%"
              height="150"
              frameborder="0"
              style="border:0"
              src="https://www.google.com/maps/embed/v1/streetview?key=AIzaSyA5JMU9RHzfy-5njlKruwxuiNpXbg33Yiw
                &location=${site.lat},${site.lng}"
              allowfullscreen>
            </iframe>
          </div>
        `,
      });

      marker.addListener("click", () => infoWindow.open(map, marker));
    });

    setMapLoaded(true);
  }, [mapLoaded]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <h2>🗺️ DOOH Planner</h2>
      </div>
      <div ref={mapRef} style={{ flex: 1 }} />
    </div>
  );
}

export default App;
