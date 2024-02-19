"use server";

import { CreateEventParams } from "@/types";
import { connectToDataBase } from "../database";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";

export const createEvnet = async ({
	event,
	userId,
	path,
}: CreateEventParams) => {
	try {
		await connectToDataBase();

		const organizer = await User.findById(userId);

		if (!organizer) throw new Error("Organizer Not Found!");

		const newEvnet = await Event.create({
			...event,
			category: event.categoryId,
			organizer: userId,
		});
		return JSON.parse(JSON.stringify(newEvnet));
	} catch (err) {
		handleError(err);
	}
};
