## `prisma db push`:

Pros:

- Quick and direct way to sync schema changes
- Great for development and prototyping
- Doesn't require migration history
- Works well with databases that don't support migrations (like MongoDB)

Cons:

- No version control for changes
- Can be risky for production as it might cause data loss
- No rollback capability
- No change history tracking

## `prisma migrate dev`:

Pros:

- Creates SQL migration files you can version control
- Automatically resets your database in development
- Generates TypeScript types
- Better for team collaboration since changes are tracked

Cons:

- Only meant for development
  -Will reset your database by default
- Can be overkill for simple projects

## `prisma migrate deploy`:

Pros:

- Safe for production deployments
- Applies pending migrations in order
- Won't reset your database
- Provides reliable version control

Cons:

- Requires migration files to be generated first
- Less flexible than db push
- Need to handle conflicts manually

## `prisma migrate reset`:

Pros:

- Completely resets database to a clean state
- Applies all migrations from scratch
- Useful for testing and development

Cons:

- Deletes all data
- Should never be used in production
- Can be time-consuming for large migration histories

## Best Practices:

Use db push for rapid prototyping and development
Switch to migrate dev/deploy when your schema stabilizes
Always use migrate deploy for production deployments
Keep your migration history clean and meaningful
Back up your database before applying migrations

## reset vs dev:

### prisma migrate reset:

- Drops the entire database (or all tables in your schema)
- Recreates the database from scratch
- Applies ALL migrations in order from the beginning
- Runs seed scripts if configured
- Does not create new migrations
- Typically used when you want a completely fresh start

### prisma migrate dev:

- Creates a new migration for your schema changes
- Can reset the database (but has a --create-only flag to prevent this)
- Applies only pending migrations
- Updates your Prisma Client
- Detects schema drift (when database doesn't match schema)
- More commonly used during active development

```bash
# You have 3 migrations:
- 01_init.sql
- 02_add_users.sql
- 03_add_posts.sql

# With prisma migrate reset:
1. Drops everything
2. Applies 01_init.sql
3. Applies 02_add_users.sql
4. Applies 03_add_posts.sql
5. Runs seed script

# With prisma migrate dev:
1. Detects your schema changes
2. Creates 04_new_changes.sql
3. Only applies 04_new_changes.sql (if database is up to date)
```
