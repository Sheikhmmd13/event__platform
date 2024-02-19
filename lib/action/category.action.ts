"use server";

import { CreateCategoryParams } from "@/types";
import { handleError } from "../utils";
import { connectToDataBase } from "../database";
import Category from "../database/models/category.model";

export const createCategory = async ({
	categoryName,
}: CreateCategoryParams) => {
	try {
		await connectToDataBase();
		console.log('starting to make category...')

		const newCategory = await Category.create({ name: categoryName });
		console.log('category was made!')
		return JSON.parse(JSON.stringify(newCategory));
	} catch (err) {
		handleError(err);
	}
};


export const getAllCategories = async () => {
	try {
		await connectToDataBase();

		const allCategories = await Category.find();
		return JSON.parse(JSON.stringify(allCategories));
	} catch (err) {
		handleError(err);
	}
}