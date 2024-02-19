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

		const newCategory = await Category.create({ name: categoryName });
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