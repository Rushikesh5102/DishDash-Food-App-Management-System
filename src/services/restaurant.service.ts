import { MenuItem, Restaurant } from '../models/restaurant.model';

export const createRestaurant = async (restaurantData: { name: string; address: string; cuisine: string; }) => {
  return Restaurant.create({
    name: restaurantData.name,
    location: restaurantData.address,
    cuisineType: restaurantData.cuisine,
  } as any);
};

export const getRestaurants = async () => {
  return Restaurant.findAll({
    include: [MenuItem],
    order: [['createdAt', 'DESC']],
  });
};

export const getRestaurantById = async (id: string) => {
  return Restaurant.findByPk(Number(id), { include: [MenuItem] });
};

export const updateRestaurant = async (id: string, restaurantData: Partial<{ name: string; address: string; cuisine: string; }>) => {
  const updatePayload: Record<string, unknown> = {};
  if (restaurantData.name !== undefined) updatePayload.name = restaurantData.name;
  if (restaurantData.address !== undefined) updatePayload.location = restaurantData.address;
  if (restaurantData.cuisine !== undefined) updatePayload.cuisineType = restaurantData.cuisine;

  const [affectedCount] = await Restaurant.update(updatePayload, { where: { id: Number(id) } });
  if (affectedCount > 0) {
    return Restaurant.findByPk(Number(id), { include: [MenuItem] });
  }
  return null;
};

export const deleteRestaurant = async (id: string): Promise<number> => {
  return Restaurant.destroy({ where: { id: Number(id) } });
};

export const addMenuItem = async (restaurantId: string, menuItem: { name: string; description: string; price: number; category: string; }) => {
  const restaurant = await Restaurant.findByPk(Number(restaurantId));
  if (!restaurant) {
    return null;
  }

  return MenuItem.create({
    ...menuItem,
    restaurantId: Number(restaurantId),
  });
};

export const updateMenuItem = async (
  restaurantId: string,
  menuItemId: string,
  menuItemData: Partial<{ name: string; description: string; price: number; category: string; }>
) => {
  const [affectedCount] = await MenuItem.update(menuItemData, {
    where: { id: Number(menuItemId), restaurantId: Number(restaurantId) },
  });
  if (affectedCount > 0) {
    return MenuItem.findByPk(Number(menuItemId));
  }
  return null;
};

export const deleteMenuItem = async (restaurantId: string, menuItemId: string) => {
  return MenuItem.destroy({
    where: { id: Number(menuItemId), restaurantId: Number(restaurantId) },
  });
};
