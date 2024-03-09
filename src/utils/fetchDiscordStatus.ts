interface LanyardData {
  data: Data;
  success: boolean;
}

interface Data {
  kv: Record<string, unknown>;
  spotify?: unknown;
  discord_user: DiscordUser;
  activities: Array<unknown>;
  discord_status: 'online' | 'offline' | 'idle' | 'dnd' | 'streaming';
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
}

interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  bot: boolean;
  global_name: string;
  avatar_decoration_data: AvatarDecoration;
  display_name: string;
  public_flags: number;
}

interface AvatarDecoration {
  asset: string;
  sku_id: number;
}

export const fetchDiscordStatus = async (
  discordId: `${bigint}`,
): Promise<LanyardData> => {
  const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch Discord status');
  }

  const data: LanyardData = await res.json();

  if (!data.success) {
    throw new Error('Failed to fetch Discord status');
  }

  return data;
};
