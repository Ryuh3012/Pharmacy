/*
  Warnings:

  - You are about to drop the column `precioUnitario` on the `DetalleVenta` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Venta` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[numeroFactura]` on the table `Venta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `precioHistorico` to the `DetalleVenta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iva` to the `Venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroFactura` to the `Venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('Pago Móvil', 'Efectivo', 'Punto', 'Zelle');

-- DropForeignKey
ALTER TABLE "Venta" DROP CONSTRAINT "Venta_usuarioId_fkey";

-- AlterTable
ALTER TABLE "DetalleVenta" DROP COLUMN "precioUnitario",
ADD COLUMN     "precioHistorico" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "Venta" DROP COLUMN "usuarioId",
ADD COLUMN     "clienteId" INTEGER,
ADD COLUMN     "iva" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "numeroFactura" TEXT NOT NULL,
ADD COLUMN     "subtotal" DECIMAL(10,2) NOT NULL;

-- CreateTable
CREATE TABLE "Cliente" (
    "idCliente" SERIAL NOT NULL,
    "cedulaRif" TEXT NOT NULL,
    "nombreRazonSocial" TEXT NOT NULL DEFAULT 'Consumidor Final',
    "telefono" TEXT,
    "usuarioId" INTEGER,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("idCliente")
);

-- CreateTable
CREATE TABLE "PagoVenta" (
    "idPago" SERIAL NOT NULL,
    "ventaId" INTEGER NOT NULL,
    "metodoPago" "MetodoPago" NOT NULL,
    "montoPagado" DECIMAL(10,2) NOT NULL,
    "bancoReceptor" TEXT,
    "referencia" TEXT,
    "montoRecibido" DECIMAL(10,2),

    CONSTRAINT "PagoVenta_pkey" PRIMARY KEY ("idPago")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cedulaRif_key" ON "Cliente"("cedulaRif");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_usuarioId_key" ON "Cliente"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Venta_numeroFactura_key" ON "Venta"("numeroFactura");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("idUsuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("idCliente") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagoVenta" ADD CONSTRAINT "PagoVenta_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("idVenta") ON DELETE RESTRICT ON UPDATE CASCADE;
