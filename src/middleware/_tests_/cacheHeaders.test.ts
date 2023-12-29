import { describe, it, expect, vi } from "vitest";
import cacheHeaders from "../cacheHeaders";

describe("cacheHeaders middleware", () => {
  it("should set Cache-Control header to 'must-revalidate, max-age=0'", async () => {
    const next = vi.fn().mockResolvedValue({
      headers: new Map<string, string>(),
    });

    const response = await cacheHeaders({} as any, next);

    if (!response) {
      throw new Error("Response is undefined");
    }

    expect(response.headers.get("Cache-Control")).toBe(
      "must-revalidate, max-age=0",
    );
  });
});
