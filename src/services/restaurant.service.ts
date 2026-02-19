import { Restaurant, MenuItem } from '../models/restaurant.model';

export const createRestaurant = async (restaurantData: { name: string; address: string; cuisine: string; }): Promise<Restaurant> => {
    return await Restaurant.create(restaurantData);
};

export const getRestaurants = async (): Promise<Restaurant[]> => {
    return await Restaurant.findAll({ include: [MenuItem] });
};

export const getRestaurantById = async (id: number): Promise<Restaurant | null> => {
    return await Restaurant.findByPk(id, { include: [MenuItem] });
};

export const updateRestaurant = async (id: number, restaurantData: Partial<{ name: string; address: string; cuisine: string; }>): Promise<Restaurant | null> => {
    const [affectedCount] = await Restaurant.update(restaurantData, {
        where: { id },
    });

    if (affectedCount > 0) {
        return await Restaurant.findByPk(id, { include: [MenuItem] });
    }
    return null;
};

export const deleteRestaurant = async (id: number): Promise<number> => {
    return await Restaurant.destroy({
        where: { id },
    });
};

export const addMenuItem = async (restaurantId: number, menuItem: { name: string; description: string; price: number; category: string; }): Promise<MenuItem | null> => {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (restaurant) {
        return await MenuItem.create({ ...menuItem, restaurantId });
    }
    return null;
};

export const updateMenuItem = async (restaurantId: number, menuItemId: number, menuItemData: Partial<{ name: string; description: string; price: number; category: string; }>): Promise<MenuItem | null> => {
    const [affectedCount] = await MenuItem.update(menuItemData, {
        where: { id: menuItemId, restaurantId },
    });

    if (affectedCount > 0) {
        return await MenuItem.findByPk(menuItemId);
    }
    return null;
};

export const deleteMenuItem = async (restaurantId: number, menuItemId: number): Promise<number> => {
    return await MenuItem.destroy({
        where: { id: menuItemId, restaurantId },
    });
};
