import Product from '../models/product.model';

export const createProduct = async (productData: { name: string; category: string; restaurantId: number; imageUrl?: string | null; }) => {
  return await Product.create(productData);
};

export const getProducts = async () => {
  return await Product.findAll();
};

export const getProductById = async (id: number) => {
  return await Product.findByPk(id);
};

export const updateProduct = async (id: number, productData: Partial<{ name: string; category: string; imageUrl: string; restaurantId: number; }>) => {
  const [affectedCount] = await Product.update(productData, {
    where: { id },
  });

  if (affectedCount > 0) {
    return await Product.findByPk(id);
  }
  return null;
};

export const deleteProduct = async (id: number): Promise<number> => {
  return await Product.destroy({
    where: { id },
  });
};
