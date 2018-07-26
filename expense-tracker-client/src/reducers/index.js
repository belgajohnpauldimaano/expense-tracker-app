import { combineReducers } from 'redux';

import sampleReducer from './sample_reducer';
import userReducer from './user_reducer'
import categoryReducer from './category_reducer'
import generalLoaderReducer from './general_loader_reducer'
import expenseReducer from './expenses_reducer'


const rootReducer = combineReducers({
    sample_data : sampleReducer,
    user: userReducer,
    category: categoryReducer,
    generalLoader: generalLoaderReducer,
    expenses: expenseReducer
});

export default rootReducer;