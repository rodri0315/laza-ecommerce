import {
  ADD_REVIEW,
  GET_REVIEWS,
  REVIEW_ERROR,
} from '../actionTypes';
import { ReviewContextProps } from './ReviewContext';



const reviewReducer = (state: ReviewContextProps, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews]
      };
    case REVIEW_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default reviewReducer;