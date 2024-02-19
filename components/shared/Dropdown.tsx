import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { createCategory, getAllCategories } from "@/lib/action/category.action";
import { CreateCategoryParams } from "@/types";

type DropdownProps = {
	value?: string;
	onChangeHandler?: () => void;
};

function Dropdown({ onChangeHandler, value }: DropdownProps) {
	const [Categories, setCategories] = useState<ICategory[]>([]);
	const [newCategory, setNewCategory] = useState("");

	function handleAddCategory() {
		createCategory({ categoryName: newCategory.trim()}).then(
			(category) => {
				setCategories((prev) => [...prev, category]);
			},
		);
	}

	useEffect(() => {
		const getCategoryList = async () => {
			const categoryList = await getAllCategories();

			categoryList && setCategories(categoryList as ICategory[]);
		}

		getCategoryList();
	}, [])

	return (
		<Select
			onValueChange={onChangeHandler}
			defaultValue={value}>
			<SelectTrigger className="select-field">
				<SelectValue placeholder="Category" />
			</SelectTrigger>
			<SelectContent>
				{Categories.length > 0 &&
					Categories.map((category) => (
						<SelectItem
							key={category._id}
							value={category.name}
							className="select-item">
							{category.name}
						</SelectItem>
					))}

				<AlertDialog>
					<AlertDialogTrigger className="p-meduim-14 text-primary-500 hover:bg-primary-50 focus:text-primary-500 flex w-full rounded-sm py-3 pl-8">
						Add Category
					</AlertDialogTrigger>
					<AlertDialogContent className="bg-white">
						<AlertDialogHeader>
							<AlertDialogTitle>
								New Category
							</AlertDialogTitle>
							<AlertDialogDescription>
								<Input
									type="text"
									placeholder="Category Name"
									className="input-field mt-3"
									onChange={(e) => {
										setNewCategory(
											e.target
												.value,
										);
									}}
								/>
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => {
									startTransition(
										handleAddCategory,
									);
								}}>
								Add
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</SelectContent>
		</Select>
	);
}

export default Dropdown;
