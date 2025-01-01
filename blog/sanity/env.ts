export const apiVersion = 
process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';

export const dataset = assertValue(
process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
'Missing NEXT_PUBLIC_SANITY_DATASET environment variable.'
);

export const projectId = assertValue(
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mpg9qjpr',
'Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.'
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
if (!v) {
  throw new Error(errorMessage);
}
return v;
}
