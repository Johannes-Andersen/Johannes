import { column, defineDb, defineTable } from 'astro:db';

const Session = defineTable({
  indexes: [{ on: ['did'], unique: true }],
  columns: {
    id: column.number({ primaryKey: true, unique: true }),
    refreshJwt: column.text({ optional: false }),
    accessJwt: column.text({ optional: false }),
    handle: column.text({ optional: false }),
    did: column.text({ optional: false, unique: true }),
    email: column.text({ optional: true }),
    emailConfirmed: column.boolean({ optional: true }),
    emailAuthFactor: column.boolean({ optional: true }),
    active: column.boolean({ optional: true, default: true }),
    status: column.text({ optional: true }),
  },
});

export default defineDb({
  tables: { Session },
});
