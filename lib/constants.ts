import { generateDummyPassword } from "./db/utils";

export const isProductionEnvironment = process.env.NODE_ENV === "production";
export const isDevelopmentEnvironment = process.env.NODE_ENV === "development";
export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT
);

export const guestRegex = /^guest-\d+$/;

export const DUMMY_PASSWORD = generateDummyPassword();

/** Fallback for dev when AUTH_SECRET is not set; do not use in production. */
export const AUTH_SECRET_OR_DEV_FALLBACK =
  process.env.AUTH_SECRET ||
  (isDevelopmentEnvironment
    ? "dev-secret-minimum-32-characters-long"
    : undefined);
