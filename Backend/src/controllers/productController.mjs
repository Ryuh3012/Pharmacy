import { searchProducts, getInventoryBySucursal } from '../models/productModel.mjs';

// Para la búsqueda
export const handleSearch = async (req, res) => {
  const { q } = req.query;
  try {
    const products = await searchProducts(q);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar productos" });
  }
};

// NUEVO: Para la carga inicial (cuando no hay búsqueda)
export const handleGetAll = async (req, res) => {
  try {
    // Asumimos sucursalId = 1 por defecto para la carga inicial
    const inventory = await getInventoryBySucursal(1); 
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: "Error al cargar inventario" });
  }
};