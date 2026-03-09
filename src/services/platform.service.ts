import Platform from '../models/platform.model';

export const createPlatform = async (platformData: { name: string; logoUrl?: string; serviceArea: string; }) => {
  return Platform.create(platformData);
};

export const getPlatforms = async () => {
  return Platform.findAll({ order: [['createdAt', 'DESC']] });
};

export const getPlatformById = async (id: string) => {
  return Platform.findByPk(Number(id));
};

export const updatePlatform = async (id: string, platformData: Partial<{ name: string; logoUrl: string; serviceArea: string; }>) => {
  const [affectedCount] = await Platform.update(platformData, { where: { id: Number(id) } });
  if (affectedCount > 0) {
    return Platform.findByPk(Number(id));
  }
  return null;
};

export const deletePlatform = async (id: string): Promise<number> => {
  return Platform.destroy({ where: { id: Number(id) } });
};
