/*
  Warnings:

  - You are about to drop the column `cedulaRif` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `Cliente` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personaId]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cedula]` on the table `Persona` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personaId` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cedula` to the `Persona` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cliente_cedulaRif_key";

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "cedulaRif",
DROP COLUMN "telefono",
ADD COLUMN     "personaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Persona" ADD COLUMN     "cedula" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_personaId_key" ON "Cliente"("personaId");

-- CreateIndex
CREATE UNIQUE INDEX "Persona_cedula_key" ON "Persona"("cedula");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("idPersona") ON DELETE RESTRICT ON UPDATE CASCADE;
