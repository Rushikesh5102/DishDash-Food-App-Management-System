import Product from '../models/product.model';

export const createProduct = async (productData: { product_name: string; category: string; }): Promise<Product> => {
  return await Product.create(productData);
};

export const getProducts = async (): Promise<Product[]> => {
  return await Product.findAll();
};

export const getProductById = async (id: number): Promise<Product | null> => {
  return await Product.findByPk(id);
};

export const updateProduct = async (id: number, productData: Partial<{ product_name: string; category: string; }>): Promise<Product | null> => {
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
