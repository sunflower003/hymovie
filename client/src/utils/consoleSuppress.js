// Global console error suppression for third-party iframe content
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  const message = args[0]?.toString() || '';
  
  // Suppress known third-party errors
  if (
    message.includes('aclib') ||
    message.includes('histats') ||
    message.includes('DisableDevtool') ||
    message.includes('cast_sender') ||
    message.includes('chrome-extension') ||
    message.includes('Failed to load resource') ||
    message.includes('net::ERR_BLOCKED_BY_CLIENT') ||
    message.includes('net::ERR_ABORTED') ||
    message.includes('cloudnestra') ||
    message.includes('vidsrc.xyz') ||
    message.includes('document.domain mutation')
  ) {
    return;
  }
  
  originalConsoleError.apply(console, args);
};

console.warn = (...args) => {
  const message = args[0]?.toString() || '';
  
  // Suppress iframe warnings
  if (
    message.includes('Allow attribute will take precedence') ||
    message.includes('allowfullscreen') ||
    message.includes('Potential permissions policy violation')
  ) {
    return;
  }
  
  originalConsoleWarn.apply(console, args);
};

export { originalConsoleError, originalConsoleWarn };
