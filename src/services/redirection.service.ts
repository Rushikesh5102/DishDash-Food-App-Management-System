import Redirection from '../models/redirection.model';
import Product from '../models/product.model';
import PriceComparison from '../models/priceComparison.model';

export const createRedirection = async (redirectionData: any): Promise<Redirection> => {
  return await Redirection.create(redirectionData);
};

export const getRedirections = async (): Promise<Redirection[]> => {
  return await Redirection.findAll({
    include: [Product, PriceComparison]
  });
};

export const getRedirectionById = async (id: number): Promise<Redirection | null> => {
  return await Redirection.findByPk(id, {
    include: [Product, PriceComparison]
  });
};

export const updateRedirection = async (id: number, redirectionData: Partial<Redirection>): Promise<Redirection | null> => {
  const [affectedCount] = await Redirection.update(redirectionData, {
    where: { id },
  });

  if (affectedCount > 0) {
    return await Redirection.findByPk(id, { include: [Product, PriceComparison] });
  }
  return null;
};

export const deleteRedirection = async (id: number): Promise<number> => {
  return await Redirection.destroy({
    where: { id },
  });
};
