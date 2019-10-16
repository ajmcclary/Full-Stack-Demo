# Migration `watch-20191016162624`

This migration has been generated by AJ McClary at 10/16/2019, 4:26:24 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
  "active" boolean NOT NULL DEFAULT false ,
  "apiKey" text NOT NULL DEFAULT '' ,
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "email" text NOT NULL DEFAULT '' ,
  "firstname" text   ,
  "group" text NOT NULL DEFAULT 'USER' ,
  "id" text NOT NULL  ,
  "lastname" text   ,
  "password" text NOT NULL DEFAULT '' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."Role" (
  "description" text NOT NULL DEFAULT '' ,
  "id" text NOT NULL  ,
  "name" text NOT NULL DEFAULT '' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."_Permissions" (
  "A" text   REFERENCES "public"."Role"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."User"("id") ON DELETE CASCADE
);

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "User.apiKey" ON "public"."User"("apiKey")

CREATE UNIQUE INDEX "Role.name" ON "public"."Role"("name")

CREATE UNIQUE INDEX "_Permissions_AB_unique" ON "public"."_Permissions"("A","B")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..watch-20191016162624
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,44 @@
+datasource db {
+  provider = "postgresql"
+  url      = "postgresql://prisma:prisma@localhost:5432/demo"
+}
+
+generator photon {
+  provider  = "photonjs"
+  binaryTargets = ["darwin"]
+  output    = "../../../node_modules/@generated/photonjs"
+}
+
+generator photon_layer {
+  provider  = "photonjs"
+  binaryTargets = ["darwin"]
+  output    = "../../../layers/photon/nodejs/node_modules/@generated/photonjs"
+}
+
+model User {
+  id            String    @id @default(cuid())
+
+  createdAt     DateTime  @default(now())
+  updatedAt     DateTime  @updatedAt
+
+  email         String    @unique
+  password      String
+  firstname     String?
+  lastname      String?
+  active        Boolean   @default(false)
+  group         Group     @default(USER)
+  roles         Role[]    @relation(name: "Permissions")
+  apiKey        String    @unique
+}
+
+model Role {
+  id            String    @id @default(cuid())
+  name          String    @unique
+  description   String
+  users         User[]    @relation(name: "Permissions")
+}
+
+enum Group {
+  USER
+  ADMIN
+}
```

## Photon Usage

You can use a specific Photon built for this migration (watch-20191016162624)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/watch-20191016162624'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```