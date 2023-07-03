import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import { supabaseClient } from '../config/supabase-client';
import { Database } from '../types/supabase';

// Create a context for products
interface ProductContextProps {
  products: Product[];
  brands: Brand[];
  reviews: Review[];
}

const ProductContext = createContext<ProductContextProps>({
  products: [],
  brands: [],
  reviews: [],
});

type CurrentProductContextType = {
  currentProduct: Product | null;
  setCurrentProduct: React.Dispatch<React.SetStateAction<Product | null>>
}

const CurrentProductContext = createContext<CurrentProductContextType>({
  currentProduct: null,
  setCurrentProduct: () => { }
});

// Product interface
export interface Product {
  id: string;
  type: string;
  name: string;
  description: string;
  price: number;
  is_sold_out: boolean;
  image_url: string;
}

export interface Brand {
  id: string;
  name: string;
  logo_url: string;
}

export type Review = Database['public']['Tables']['reviews']['Row']


export function useProducts() {
  return useContext(ProductContext);
}

export function useCurrentProduct() {
  return useContext(CurrentProductContext);
}

export const ProductProvider: React.FC = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const { user, session } = useAuth();
  const token = `Bearer ${session?.access_token}`;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const {
          data: { session }, error
        } = await supabaseClient.auth.getSession();
        const token = `Bearer ${session?.access_token}`;
        const response = await api.get('/products?select=*', {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
            'Authorization': token,
          }
        });
        const brands = await api.get('/brands?select=*', {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
            'Authorization': token,
          }
        });
        if (error) throw error;
        setBrands(brands.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // fetch reviews by product id
  useEffect(() => {
    const fetchReviews = async () => {
      console.log('currentProduct', currentProduct)
      try {
        // const {
        //   data: { session }, error
        // } = await supabaseClient.auth.getSession();
        // const token = `Bearer ${session?.access_token}`;
        // const token = session?.access_token;
        // console.log('Review token', token)
        const reviews = await api.get(`/reviews?product_id=eq.${currentProduct?.id}&select=*`, {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
            'Authorization': token,
          }
        });
        // if (error) throw error;
        console.log('reviews', reviews.data)
        setReviews(reviews.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (currentProduct) fetchReviews();
    // fetchReviews();
  }, [currentProduct]);

  return (
    <ProductContext.Provider value={{ products, brands, reviews }}>
      <CurrentProductContext.Provider value={{ currentProduct, setCurrentProduct }} >
        {children}
      </CurrentProductContext.Provider>
    </ProductContext.Provider>
  );
};