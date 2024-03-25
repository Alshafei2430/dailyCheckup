// This block of code defines a Post model
model Post {
    id        String   @id @default(cuid())
    title     String   @db.VarChar(255)       // will generate VARCHAR
    content   String                          // will generate TEXT
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }