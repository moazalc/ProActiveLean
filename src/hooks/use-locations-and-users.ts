import { useState, useEffect } from "react";
import { Location, User } from "@/types/audit";

export function useLocationsAndUsers() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/location-categories")
      .then((res) => res.json())
      .then((data) => setLocations(data));
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return { locations, users };
}
