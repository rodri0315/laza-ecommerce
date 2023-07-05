import React, { createContext, useState, useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import { api } from '../../services/api';
import { useAuth } from '../AuthContext';
import { supabaseClient } from '../../config/supabase-client';
import { Database } from '../../types/supabase';
import reviewReducer from './reviewReducer';
import { useCurrentProduct } from '../ProductContext';
import {
  ADD_REVIEW,
  GET_REVIEWS,
  REVIEW_ERROR,
} from '../actionTypes';

export type Review = Database['public']['Tables']['reviews']['Row']

export interface ReviewContextProps {
  reviews: Review[];
  error: string | null;
}

const initialState: ReviewContextProps = {
  reviews: [],
  // current: null,
  // filtered: null,
  error: null
};

const ReviewContext = createContext<{
  state: ReviewContextProps;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

export const useReviews = (): [ReviewContextProps, React.Dispatch<any>] => {
  const { state, dispatch } = useContext(ReviewContext);
  return [state, dispatch];
};

// Add Contact
export const addReview = async (dispatch, review, router) => {
  try {
    const {
      data: { session }, error
    } = await supabaseClient.auth.getSession();
    const token = `Bearer ${session?.access_token}`;
    const res = await api.post('/reviews', { ...review },
      {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
          'Authorization': token,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        }
      }
    );
    dispatch({
      type: ADD_REVIEW,
      payload: JSON.parse(res.config.data)
    });
    router.back()
  } catch (err) {
    console.error('Error creating review:', err.response);
    dispatch({
      type: REVIEW_ERROR,
      payload: err.response.msg
    });
  }
};

// Get Reviews
export const getReviews = async (dispatch, id) => {
  console.log('getReviews from COntext before try')
  try {
    const {
      data: { session }, error
    } = await supabaseClient.auth.getSession();
    const token = `Bearer ${session?.access_token}`;
    console.log('token', token)
    console.log(GET_REVIEWS, id)
    const res = await api.get(`/reviews?product_id=eq.${id}&select=*`, {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
        'Authorization': token,
      }
    });

    dispatch({
      type: GET_REVIEWS,
      payload: res.data
    });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    // dispatch({
    //   type: REVIEW_ERROR,
    //   payload: err.response.msg
    // });
  }
}

const ReviewState = ({ children }: any) => {

  const initialState: ReviewContextProps = {
    reviews: [],
    // current: null,
    // filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(reviewReducer, initialState);

  return (
    <ReviewContext.Provider value={{ state: state, dispatch }}>
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewState;