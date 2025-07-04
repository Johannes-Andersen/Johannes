export const GET = () =>
  new Response(
    JSON.stringify({
      status: 'ok',
    }),
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    },
  );
