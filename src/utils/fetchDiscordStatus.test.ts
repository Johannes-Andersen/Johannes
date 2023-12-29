import { fetchDiscordStatus } from "./fetchDiscordStatus";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

describe("fetchDiscordStatus", () => {
  const discordId = "1234567890";
  let mockFetch: Mock;

  beforeEach(() => {
    mockFetch = vi.fn();
    globalThis.fetch = mockFetch;
  });

  it("should fetch Discord status successfully", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: vi
        .fn()
        .mockResolvedValue({ success: true, data: { discord_status: "dnd" } }),
    });

    const result = await fetchDiscordStatus(discordId);

    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.lanyard.rest/v1/users/${discordId}`,
    );

    expect(result).toEqual({ success: true, data: { discord_status: "dnd" } });
  });

  it("should throw an error when fetch fails", async () => {
    mockFetch.mockResolvedValue({ ok: false });

    await expect(fetchDiscordStatus(discordId)).rejects.toThrow(
      "Failed to fetch Discord status",
    );
  });

  it("should throw an error when data.success is false", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: false }),
    });

    await expect(fetchDiscordStatus(discordId)).rejects.toThrow(
      "Failed to fetch Discord status",
    );
  });
});
