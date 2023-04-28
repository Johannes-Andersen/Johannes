import fetchDiscordStatus from "@/utils/fetchDiscordStatus";
import Image from "next/image";

export default async function Home() {
  const discordData = await fetchDiscordStatus();

  return (
    <main>
      <Image
        src={`https://cdn.discordapp.com/avatars/98172944773029888/${discordData.data.discord_user.avatar}.png?size=4096`}
        alt="Discord Logo"
        width={200}
        height={200}
      />
      <pre>{JSON.stringify(discordData, null, 2)}</pre>
    </main>
  );
}
