-- CreateTable
CREATE TABLE "Persona" (
    "idPersona" SERIAL NOT NULL,
    "nombrePersona" TEXT NOT NULL,
    "apellidoPersona" TEXT NOT NULL,
    "telefono" TEXT,
    "direccion" TEXT,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("idPersona")
);

-- CreateTable
CREATE TABLE "Rol" (
    "idRol" SERIAL NOT NULL,
    "roles" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("idRol")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "idUsuario" SERIAL NOT NULL,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "personaId" INTEGER NOT NULL,
    "rolId" INTEGER NOT NULL,
    "sucursalRegistroId" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateTable
CREATE TABLE "DatosEmpleado" (
    "idEmpleado" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "sucursalAsignadaId" INTEGER NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cargoEspecifico" TEXT NOT NULL,
    "sueldo" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "DatosEmpleado_pkey" PRIMARY KEY ("idEmpleado")
);

-- CreateTable
CREATE TABLE "Sucursal" (
    "idSucursal" SERIAL NOT NULL,
    "nombreSucursal" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT,

    CONSTRAINT "Sucursal_pkey" PRIMARY KEY ("idSucursal")
);

-- CreateTable
CREATE TABLE "InventarioSucursal" (
    "idInventory" SERIAL NOT NULL,
    "productoId" INTEGER NOT NULL,
    "sucursalId" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "pasilloUbicacion" TEXT,

    CONSTRAINT "InventarioSucursal_pkey" PRIMARY KEY ("idInventory")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "idCategoria" SERIAL NOT NULL,
    "nombreCategoria" TEXT NOT NULL,
    "categoriaPadreId" INTEGER,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("idCategoria")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "idEmpresa" SERIAL NOT NULL,
    "nombreEmpresa" TEXT NOT NULL,
    "rifEmpresa" TEXT NOT NULL,
    "tipoEmpresa" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("idEmpresa")
);

-- CreateTable
CREATE TABLE "Producto" (
    "idProducto" SERIAL NOT NULL,
    "nombreComercial" TEXT NOT NULL,
    "principioActivo" TEXT,
    "empresaId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "imagenUrl" TEXT,
    "detalleUnidad" TEXT,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("idProducto")
);

-- CreateTable
CREATE TABLE "SolucionesIA" (
    "idSolucion" SERIAL NOT NULL,
    "sintomaNombre" TEXT NOT NULL,
    "sintomaIcono" TEXT,
    "palabrasClave" TEXT[],
    "descripcionClinica" TEXT NOT NULL,
    "principioActivoTarget" TEXT NOT NULL,

    CONSTRAINT "SolucionesIA_pkey" PRIMARY KEY ("idSolucion")
);

-- CreateTable
CREATE TABLE "Promocion" (
    "idPromocion" SERIAL NOT NULL,
    "tagDescuento" TEXT NOT NULL,
    "textoDescriptivo" TEXT NOT NULL,
    "imagenBannerUrl" TEXT,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "tipoAplicacion" TEXT NOT NULL,
    "referenciaId" INTEGER NOT NULL,

    CONSTRAINT "Promocion_pkey" PRIMARY KEY ("idPromocion")
);

-- CreateTable
CREATE TABLE "Carrito" (
    "idCarrito" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "productos" JSONB NOT NULL,

    CONSTRAINT "Carrito_pkey" PRIMARY KEY ("idCarrito")
);

-- CreateTable
CREATE TABLE "Venta" (
    "idVenta" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "empleadoId" INTEGER NOT NULL,
    "sucursalId" INTEGER NOT NULL,
    "fechaHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalVenta" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("idVenta")
);

-- CreateTable
CREATE TABLE "DetalleVenta" (
    "idDetalle" SERIAL NOT NULL,
    "ventaId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "DetalleVenta_pkey" PRIMARY KEY ("idDetalle")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "DatosEmpleado_usuarioId_key" ON "DatosEmpleado"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "InventarioSucursal_productoId_sucursalId_key" ON "InventarioSucursal"("productoId", "sucursalId");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_rifEmpresa_key" ON "Empresa"("rifEmpresa");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("idPersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("idRol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_sucursalRegistroId_fkey" FOREIGN KEY ("sucursalRegistroId") REFERENCES "Sucursal"("idSucursal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatosEmpleado" ADD CONSTRAINT "DatosEmpleado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatosEmpleado" ADD CONSTRAINT "DatosEmpleado_sucursalAsignadaId_fkey" FOREIGN KEY ("sucursalAsignadaId") REFERENCES "Sucursal"("idSucursal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioSucursal" ADD CONSTRAINT "InventarioSucursal_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("idProducto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioSucursal" ADD CONSTRAINT "InventarioSucursal_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "Sucursal"("idSucursal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_categoriaPadreId_fkey" FOREIGN KEY ("categoriaPadreId") REFERENCES "Categoria"("idCategoria") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("idEmpresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("idCategoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrito" ADD CONSTRAINT "Carrito_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_empleadoId_fkey" FOREIGN KEY ("empleadoId") REFERENCES "DatosEmpleado"("idEmpleado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "Sucursal"("idSucursal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("idVenta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("idProducto") ON DELETE RESTRICT ON UPDATE CASCADE;
