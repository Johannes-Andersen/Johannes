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
  state: string
  name: string
  id: string
  flags?: number
  emoji?: Emoji
  created_at: number
  application_id?: string
  timestamps?: Timestamps
  sync_id?: string
  session_id?: string
  party?: Party
  details?: string
  buttons?: Array<string>
  assets?: Assets
}

interface Party {
  id: string
  size?: PartySize
}

interface PartySize {
  current_size: number
  max_size: number
}

interface Emoji {
  name: string
  id?: string
  animated?: boolean
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
  global_name?: string
  display_name?: string
  discriminator: string
  bot: boolean
  avatar: string
}

interface Kv {
  [key: string]: string | null | undefined
}
