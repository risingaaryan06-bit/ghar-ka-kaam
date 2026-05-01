import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Users, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

interface Coords {
  lat: number;
  lon: number;
}

// Mock nearby workers for display below the map
const NEARBY_WORKERS = [
  { name: "Hira Singh", skill: "Plumber", distance: "0.8 km", available: true },
  { name: "Chintu", skill: "Plumber", distance: "1.2 km", available: true },
  { name: "Lucky", skill: "Carpenter", distance: "2.1 km", available: true },
  {
    name: "Suresh Painter",
    skill: "Painter",
    distance: "3.4 km",
    available: false,
  },
  {
    name: "Arvind Electrician",
    skill: "Electrician",
    distance: "1.9 km",
    available: true,
  },
  { name: "Raju Mistri", skill: "Mason", distance: "4.2 km", available: true },
];

function WorkerPinCard({
  name,
  skill,
  distance,
  available,
  index,
}: {
  name: string;
  skill: string;
  distance: string;
  available: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      data-ocid={`map.worker_pin.${index}`}
      className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-sm hover:border-primary/40 hover:shadow-pink transition-all duration-200 cursor-pointer"
    >
      <div className="h-9 w-9 rounded-full bg-primary/12 border border-primary/20 flex items-center justify-center flex-shrink-0">
        <Wrench className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-foreground text-sm truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{skill}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-xs font-bold text-primary">{distance}</p>
        <span
          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
            available
              ? "bg-emerald-100 text-emerald-700"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {available ? "Available" : "Busy"}
        </span>
      </div>
    </motion.div>
  );
}

export function MapSection() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [status, setStatus] = useState<
    "idle" | "requesting" | "granted" | "denied"
  >("idle");

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("denied");
      return;
    }
    setStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setStatus("granted");
      },
      () => {
        setStatus("denied");
      },
      { timeout: 10000 },
    );
  }, []);

  // Auto-request on mount
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  // Build iframe URL
  const mapSrc = coords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - 0.03},${coords.lat - 0.02},${coords.lon + 0.03},${coords.lat + 0.02}&layer=mapnik&marker=${coords.lat},${coords.lon}`
    : "https://www.openstreetmap.org/export/embed.html?bbox=77.17,28.56,77.23,28.60&layer=mapnik";

  return (
    <section
      data-ocid="map.section"
      className="bg-card py-16 border-y border-primary/10"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <Badge className="bg-primary/10 text-primary border-0 mb-3 px-3 py-1 text-xs font-semibold">
            <Navigation className="h-3.5 w-3.5 mr-1.5" />
            Location
          </Badge>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-foreground mb-2">
            Find Workers Near You
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Workers available in your area — share your location to see who's
            closest
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {/* Map frame */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-pink-lg">
              {status === "requesting" && (
                <div className="absolute inset-0 bg-card/90 backdrop-blur-sm flex flex-col items-center justify-center z-10 gap-3">
                  <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <p className="text-sm text-muted-foreground font-medium">
                    Getting your location…
                  </p>
                </div>
              )}
              {status === "denied" && (
                <div className="absolute inset-0 bg-card/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 gap-4 p-6">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                    📍
                  </div>
                  <div className="text-center">
                    <p className="font-display font-bold text-foreground mb-1">
                      Enable location access
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Allow location access to see workers available near you
                    </p>
                  </div>
                  <Button
                    data-ocid="map.enable_location.button"
                    className="btn-primary"
                    size="sm"
                    onClick={requestLocation}
                  >
                    <MapPin className="h-4 w-4 mr-1.5" />
                    Enable Location
                  </Button>
                </div>
              )}
              <iframe
                title="Workers near you"
                src={mapSrc}
                width="100%"
                height="340"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Map overlay badge */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-elevated flex items-center gap-2 border border-primary/15">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-foreground">
                  {NEARBY_WORKERS.filter((w) => w.available).length} workers
                  available nearby
                </span>
              </div>
              {coords && (
                <div className="absolute bottom-3 right-3 bg-primary/90 text-primary-foreground text-xs px-2.5 py-1.5 rounded-lg font-semibold shadow-sm">
                  📍 Your location
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Map data ©{" "}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-primary"
              >
                OpenStreetMap
              </a>{" "}
              contributors
            </p>
          </motion.div>

          {/* Worker list */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="font-display font-bold text-foreground text-sm">
                Workers in Your Area
              </h3>
            </div>
            <div className="space-y-2.5">
              {NEARBY_WORKERS.map((w, i) => (
                <WorkerPinCard
                  key={w.name}
                  name={w.name}
                  skill={w.skill}
                  distance={w.distance}
                  available={w.available}
                  index={i + 1}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
