"use client";

import axios, { type AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { UserAuthResponse } from "@/src/types/auth";

export default function Auth(): JSX.Element {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [userData, setUserData] = useState<UserAuthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .post("/api/auth", {
          token,
        })
        .then((res) => {
          const data = res.data as UserAuthResponse;
          setUserData(data);
        })
        .catch((err: Error | AxiosError) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  return (
    <div>
      <p>Status: {loading ? "fetching user data..." : "redirecting..."}</p>
      <p>User Data: {JSON.stringify(userData)}</p>
      <p>Error: {error}</p>
    </div>
  );
}
