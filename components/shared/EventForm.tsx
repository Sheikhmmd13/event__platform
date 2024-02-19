"use client";

//next
import { useRouter } from "next/navigation";

// datapikcer
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// form
import { z } from "zod";
import { useForm } from "react-hook-form";
import { eventFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";

// ui
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

//icons
import { Calendar2, DollarCircle, Link21, Location } from "iconsax-react";

// locall
import Dropdown from "./Dropdown";
import { eventDefaultValues } from "@/config/constans";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { useUploadThing } from "@/lib/uploadthing";
import { createEvnet } from "@/lib/action/evnet.action";

type EventFromProps = {
	userId: string;
	type: "Create" | "Update";
};

function EventForm({ userId, type }: EventFromProps) {
	const [files, setFiles] = useState<File[]>([]);
	const [startDate, setStartDate] = useState(new Date());
	const [endtDate, setEndtDate] = useState(new Date());

	const { startUpload } = useUploadThing("imageUploader");

	const initialValues = eventDefaultValues;
	const router = useRouter();

	const form = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
		defaultValues: initialValues,
	});

	async function submitHandler(value: z.infer<typeof eventFormSchema>) {
		let uploadedImage_URL = "";
		console.log(uploadedImage_URL);

		if (files.length > 0) {
			let uploadedImage = await startUpload(files);
			console.log(uploadedImage)

			if (!uploadedImage) return;

			uploadedImage_URL = uploadedImage[0].url;
		}

		if (type === "Create") {
			try {
				const newEvent = await createEvnet({
					event: { ...value, imageUrl: uploadedImage_URL },
					userId,
					path: "/profile",
				});

				if (newEvent) {
					form.reset();
					router.push(`/events/${newEvent._id}`);
				}
			} catch (err) {
				console.log(err)
			}
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(submitHandler)}
				className="flex flex-col gap-5">
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder="Title"
										className="input-field"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="categoryId"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Dropdown
										onChangeHandler={
											field.onChange
										}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>
									Description
								</FormLabel>
								<FormControl className="h-72">
									<Textarea
										className="textarea rounded-2xl"
										placeholder="description"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Image</FormLabel>
								<FormControl className="h-72">
									<FileUploader
										onFieldChange={
											field.onChange
										}
										imageUrl={
											field.value
										}
										setFiles={setFiles}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Location</FormLabel>
								<FormControl>
									<div className="flex-center px-4 bg-grey-50 rounded-full overflow-hidden">
										<Location
											variant="Bulk"
											color="#757575"
										/>
										<Input
											placeholder="Event Location or Online"
											className="input-field"
											{...field}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="startDateTime"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>
									Start Date
								</FormLabel>
								<FormControl>
									<div className="flex-start justify-start px-4 py-3  bg-grey-50 rounded-full overflow-hidden">
										<Calendar2
											size="32"
											color="#757575"
											variant="Bulk"
										/>{" "}
										<p className="ml-3 whitespace-nowrap text-gray-600">
											Start Date:{" "}
										</p>
										<DatePicker
											selected={
												field.value
											}
											onChange={(
												date: Date,
											) =>
												field.onChange(
													date,
												)
											}
											showTimeSelect
											timeInputLabel="Time:"
											dateFormat="MM/dd/yyyy h:mm aa"
											wrapperClassName="datePicker"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="endDateTime"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>End Date</FormLabel>
								<FormControl>
									<div className="flex-start justify-start px-4 py-3 bg-grey-50 rounded-full overflow-hidden">
										<Calendar2
											size="32"
											color="#757575"
											variant="Bulk"
										/>{" "}
										<p className="ml-3 whitespace-nowrap text-gray-600">
											End Date:{" "}
										</p>
										<DatePicker
											selected={
												field.value
											}
											onChange={(
												date: Date,
											) =>
												field.onChange(
													date,
												)
											}
											showTimeSelect
											timeInputLabel="Time:"
											dateFormat="MM/dd/yyyy h:mm aa"
											wrapperClassName="datePicker"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col gap-5 md:flex-row ">
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Price</FormLabel>
								<FormControl>
									<div className="flex-start px-4 py-3 bg-grey-50 rounded-full overflow-hidden">
										<DollarCircle
											size="32"
											color="#757575"
											variant="Bulk"
										/>

										<Input
											type="number"
											placeholder="Price"
											className="p-reqular-16 border-0 outline-offest-0 bg-grey-50 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 focus-visible:border-0"
										/>

										<FormField
											control={
												form.control
											}
											name="isFree"
											render={({
												field,
											}) => (
												<FormItem className="flex items-center">
													<FormLabel className="opacity-0">
														isFree
													</FormLabel>
													<FormControl>
														<div className="flex items-center">
															<Label
																className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
																htmlFor="isFree">
																Is
																Free:{" "}
															</Label>
															<Checkbox
																id="isFree"
																onCheckedChange={
																	field.onChange
																}
																checked={
																	field.value
																}
																className="mr-2 h-5 w-5 border-2 border-primary-500"
															/>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="url"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>URL</FormLabel>
								<FormControl>
									<div className="flex-center px-4 h-[64px] bg-grey-50 rounded-full overflow-hidden">
										<Link21
											variant="Bulk"
											color="#757575"
										/>
										<Input
											placeholder="URL"
											className="input-field"
											{...field}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					type="submit"
					size={"lg"}
					disabled={form.formState.isSubmitted}
					className="button col-span-2 w-full">
					{!form.formState.isSubmitting
						? `${type} Event`
						: `Submitting...`}
				</Button>
			</form>
		</Form>
	);
}

export default EventForm;
