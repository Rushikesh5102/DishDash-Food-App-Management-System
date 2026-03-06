import PriceComparison from '../models/priceComparison.model';
import User from '../models/user.model';
import Platform from '../models/platform.model';

export const createPriceComparison = async (priceComparisonData: any) => {
  return await PriceComparison.create(priceComparisonData);
};

export const getPriceComparisons = async () => {
  return await PriceComparison.findAll({
    include: [User, Platform]
  });
};

export const getPriceComparisonById = async (id: number) => {
  return await PriceComparison.findByPk(id, {
    include: [User, Platform]
  });
};

export const updatePriceComparison = async (id: number, priceComparisonData: any) => {
  const [affectedCount] = await PriceComparison.update(priceComparisonData, {
    where: { id },
  });
  if (affectedCount > 0) {
    return await PriceComparison.findByPk(id, { include: [User, Platform] });
  }
  return null;
};

export const deletePriceComparison = async (id: number) => {
  return await PriceComparison.destroy({
    where: { id },
  });
};
