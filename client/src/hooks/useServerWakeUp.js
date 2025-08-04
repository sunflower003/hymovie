import { useState, useEffect } from 'react';

export const useServerWakeUp = () => {
  // Simplified - no server wake-up detection, just normal loading
  const [isWakingUp, setIsWakingUp] = useState(false);

  return {
    isWakingUp: false, // Always false - no wake-up detection
    hasError: false,
    retryWakeUp: () => {},
    checkServerStatus: () => {}
  };
};
