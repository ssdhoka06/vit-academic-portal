import { useEffect, useRef, useState } from "react";

/**
 * useApi — calls an async fn (typically from services/api.js) and tracks
 * loading / error / data state. Re-runs whenever `deps` change.
 *
 *   const { data, loading, error } = useApi(() => api.getBatchOverview(yearId, division, batch), [yearId, division, batch]);
 */
export function useApi(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    fetcherRef.current()
      .then((data) => { if (!cancelled) setState({ data, loading: false, error: null }); })
      .catch((error) => { if (!cancelled) setState({ data: null, loading: false, error }); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
