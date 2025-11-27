import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const DAILY_LIMIT = 50;

export default function useDailyLimit() {
  const { user } = useUser();
  const [limitCount, setLimitCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    if (!user) return;

    const key = `contact-limit-${user.id}`;
    const saved = localStorage.getItem(key);

    if (!saved) {
      const fresh = { limitCount: 0, lastReset: new Date().toISOString() };
      localStorage.setItem(key, JSON.stringify(fresh));
      return;
    }

    const parsed = JSON.parse(saved);
    const lastReset = new Date(parsed.lastReset);
    const now = new Date();

    const hoursPassed =
      (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);

    // 🔄 Reset de la limite après 24h
    if (hoursPassed >= 24) {
      const resetData = {
        limitCount: 0,
        lastReset: now.toISOString(),
      };
      localStorage.setItem(key, JSON.stringify(resetData));
      setLimitCount(0);
      setLimitReached(false);
    } else {
      setLimitCount(parsed.limitCount);
      setLimitReached(parsed.limitCount >= DAILY_LIMIT);
    }
  }, [user]);

  // ➕ augmenter compteur
  const incrementLimit = () => {
    if (!user) return;

    const key = `contact-limit-${user.id}`;
    const newCount = limitCount + 1;

    const updated = {
      limitCount: newCount,
      lastReset: new Date().toISOString(),
    };

    localStorage.setItem(key, JSON.stringify(updated));
    setLimitCount(newCount);

    if (newCount >= DAILY_LIMIT) {
      setLimitReached(true);
    }
  };

  return {
    limitCount,
    limitReached,
    incrementLimit,
    DAILY_LIMIT,
  };
}
