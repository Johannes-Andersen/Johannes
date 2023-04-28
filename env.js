const z = require('zod')

const envSchema = z.object({
  DISCORD_ID: z.string().min(17).max(20),
})

envSchema.parse({
  DISCORD_ID: process.env.DISCORD_ID,
})
