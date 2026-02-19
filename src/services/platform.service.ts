import Platform from '../models/platform.model';

export const createPlatform = async (platformData: { platform_name: string; service_area: string; }): Promise<Platform> => {
  return await Platform.create(platformData);
};

export const getPlatforms = async (): Promise<Platform[]> => {
  return await Platform.findAll();
};

export const getPlatformById = async (id: number): Promise<Platform | null> => {
  return await Platform.findByPk(id);
};

export const updatePlatform = async (id: number, platformData: Partial<{ platform_name: string; service_area: string; }>): Promise<Platform | null> => {
  const [affectedCount] = await Platform.update(platformData, {
    where: { id },
  });

  if (affectedCount > 0) {
    return await Platform.findByPk(id);
  }
  return null;
};

export const deletePlatform = async (id: number): Promise<number> => {
  return await Platform.destroy({
    where: { id },
  });
};
