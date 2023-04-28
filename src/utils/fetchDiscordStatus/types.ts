export interface LanyardResponse {
  success: boolean
  data: Data
}

interface Data {
  spotify?: Spotify
  listening_to_spotify: boolean
  kv: Kv
  discord_user: DiscordUser
  discord_status: string
  activities: Array<Activity>
  active_on_discord_web: boolean
  active_on_discord_mobile: boolean
  active_on_discord_desktop: boolean
}

interface Spotify {
  track_id: string
  timestamps: Timestamps
  song: string
  artist: string
  album_art_url: string
  album: string
}

interface Activity {
  type: number
  timestamps: Timestamps
  state: string
  session_id: string
  name: string
  id: string
  flags: number
  details: string
  created_at: number
  buttons: Array<string>
  assets: Assets
  application_id: string
}

interface Assets {
  small_text: string
  small_image: string
  large_text: string
  large_image: string
}

interface Timestamps {
  start: number
}

interface DiscordUser {
  username: string
  public_flags: number
  id: string
  global_name?: unknown
  display_name?: unknown
  discriminator: string
  bot: boolean
  avatar_decoration: string
  avatar: string
}

interface Kv {
  [key: string]: string | null | undefined
}
