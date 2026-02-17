import Restaurant, { IRestaurant, IMenuItem } from '../models/restaurant.model';
import { Types } from 'mongoose';

export const createRestaurant = async (restaurantData: IRestaurant): Promise<IRestaurant> => {
    const restaurant = new Restaurant(restaurantData);
    return await restaurant.save();
};

export const getRestaurants = async (): Promise<IRestaurant[]> => {
    return await Restaurant.find();
};

export const getRestaurantById = async (id: string): Promise<IRestaurant | null> => {
    return await Restaurant.findById(id);
};

export const updateRestaurant = async (id: string, restaurantData: Partial<IRestaurant>): Promise<IRestaurant | null> => {
    return await Restaurant.findByIdAndUpdate(id, restaurantData, { new: true });
};

export const deleteRestaurant = async (id: string): Promise<IRestaurant | null> => {
    return await Restaurant.findByIdAndDelete(id);
};

export const addMenuItem = async (restaurantId: string, menuItem: IMenuItem): Promise<IRestaurant | null> => {
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
        restaurant.menu.push(menuItem);
        return await restaurant.save();
    }
    return null;
};

export const updateMenuItem = async (restaurantId: string, menuItemId: string, menuItemData: Partial<IMenuItem>): Promise<IRestaurant | null> => {
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
        const menuItem = (restaurant.menu as Types.DocumentArray<IMenuItem>).id(menuItemId);
        if (menuItem) {
            menuItem.set(menuItemData);
            return await restaurant.save();
        }
    }
    return null;
};

export const deleteMenuItem = async (restaurantId: string, menuItemId: string): Promise<IRestaurant | null> => {
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
        const menuItem = (restaurant.menu as Types.DocumentArray<IMenuItem>).id(menuItemId);
        if (menuItem) {
            restaurant.menu = restaurant.menu.filter(item => item._id?.toString() !== menuItemId);
            return await restaurant.save();
        }
    }
    return null;
};
