export const GET = () =>
  new Response(
    JSON.stringify({
      status: "ok",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
