import { useEffect, useState } from "react";
import { createSession } from "../api/client";

export function useSession() {
  const [sessionId, setSessionId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      setLoading(true);
      setError(null);
      try {
        const data = await createSession({ anonymousId: "anon_" + Date.now() });
        // backend jo bhi key bheje use kar lo
        setSessionId(data._id || data.id || data.sessionId || "");
      } catch (e: any) {
        console.error(e);
        setError("Session create nahi ho paaya");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  return { sessionId, loading, error };
}
