import * as authAPI from './endpoints/auth';
import * as ingredientsAPI from './endpoints/ingredients';
import * as orderAPI from './endpoints/order';
import * as resetPasswordAPI from './endpoints/reset-password';

const burgerAPI = { ...authAPI, ...ingredientsAPI, ...orderAPI, ...resetPasswordAPI };

export default burgerAPI;
