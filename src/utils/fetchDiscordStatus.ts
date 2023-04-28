const fetchDiscordStatus = async () => {
  const res = await fetch(
    'https://api.lanyard.rest/v1/users/98172944773029888',
    {
      next: {
        revalidate: 60,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch Discord status')
  }

  return res.json()
}

export default fetchDiscordStatus
