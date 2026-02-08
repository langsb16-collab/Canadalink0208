
/**
 * Environment Configuration Manager
 * Ensures all required keys are present before execution
 */

export const ENV = {
  get API_KEY() {
    const key = process.env.API_KEY || (process.env as any).NEXT_PUBLIC_API_KEY;
    if (!key) {
      console.warn("API_KEY is missing. AI features may fail.");
    }
    return key;
  },
  
  get IS_PROD() {
    return process.env.NODE_ENV === 'production';
  },

  get BASE_URL() {
    return (process.env as any).NEXT_PUBLIC_API_URL || window.location.origin;
  }
};
