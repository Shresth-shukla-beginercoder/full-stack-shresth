// 686. Introducing Effects
// 687. The useEffect Hook
// 688. useEffect Dependencies
// 689. Fetching Initial Data From an API
// 690. Adding a Loader
// 691. Github Profile Search

// An "effect" is code that runs AROUND rendering — talking to a
// server, timers, subscriptions — things that must NOT run on
// every re-render the way your JSX does.
//
// 687: useEffect(() => { ...code that runs "after the render"... }, [deps])
//
// 688: the DEPENDENCIES array controls WHEN the effect re-runs:
//        []            → run ONCE after the very first render
//        [profile]     → run when `profile` changes
//        (no array)    → run after EVERY render (almost never what you want)

import { useState, useEffect } from 'react';

export default function GithubProfile() {
  // starts true so the very first fetch (689) shows the loader
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState('octocat');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // 688: this effect depends on `profile` — every time the searched
  // name changes, React re-runs THIS effect (not the whole app logic).
  //
  // setState only happens inside the .then/.catch/.finally callbacks
  // (after the fetch settles) — never directly in the effect body.
  useEffect(() => {
    let cancelled = false; // ignore answers from stale fetches

    // 690: the loader state is already true from when the input changed
    fetch(`https://api.github.com/users/${profile}`)
      .then((res) => {
        if (cancelled) return;
        if (!res.ok) throw new Error(`GitHub says: ${res.status}`);
        return res.json(); // unwrap the JSON body
      })
      .then((json) => {
        if (!cancelled) setData(json); // we got the profile!
      })
      .catch((err) => {
        if (!cancelled) setError(err.message); // 635: then we can show it
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true; // cleanup: if `profile` changed mid-flight,
    }; // don't let the old answer overwrite the new one
  }, [profile]);

  return (
    <div>
      <h2>🐙 GitHub profile search</h2>

      <label>
        Username:
        {/* 691: typing a new name changes state → effect re-runs (688).
            Loader/error are flipped HERE (in a handler), not inside
            the effect body — handlers are the right place for it. */}
        <input
          value={profile}
          onChange={(e) => {
            setProfile(e.target.value);
            setLoading(true);
            setError(null);
          }}
        />
      </label>

      {/* 660/635: the page shows whatever state says right now */}
      {loading && <p>⏳ Loading…</p>}

      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      {data && !loading && (
        <div style={{ marginTop: 10 }}>
          <img
            src={data.avatar_url}
            width={80}
            alt={data.login}
            style={{ borderRadius: 8 }}
          />
          <h3>{data.name} (@{data.login})</h3>
          <p>{data.bio}</p>
          <p>
            ⭐ {data.public_repos} repos · 👥 {data.followers} followers
          </p>
          <a href={data.html_url} target="_blank" rel="noreferrer">
            View profile →
          </a>
        </div>
      )}
    </div>
  );
}
