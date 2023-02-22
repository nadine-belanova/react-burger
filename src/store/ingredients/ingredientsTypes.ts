export type TIngredient = {
  _id: string;
};

export type TIngredientsState = {
  isLoading: boolean;
  ingredientsError: string;
  ingredients: TIngredient[];
  selectedBun: TIngredient | null;
  selectedIngredients: TIngredient[];
};
