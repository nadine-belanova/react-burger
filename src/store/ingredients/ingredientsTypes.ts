export type TIngredient = {
  _id: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
};

export type TIngredientsState = {
  isLoading: boolean;
  ingredientsError: string;
  ingredients: TIngredient[];
  selectedBun: TIngredient | null;
  selectedIngredients: TIngredient[];
};
