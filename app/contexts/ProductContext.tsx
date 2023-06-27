import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import { supabaseClient } from '../config/supabase-client';

// Create a context for products
interface ProductContextProps {
  products: Product[];
}

const ProductContext = createContext<ProductContextProps>({
  products: [],
});

// Product interface
interface Product {
  id: string;
  type: string;
  name: string;
  description: string;
  price: number;
  is_sold_out: boolean;
}
export function useProducts() {
  return useContext(ProductContext);
}

export const ProductProvider: React.FC = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user, session } = useAuth();
  // console.log('user', user)
  console.log('session', session)
  const token = `Bearer ${session?.access_token}`;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const {
          data: { session }, error
        } = await supabaseClient.auth.getSession();
        console.log('session in Products', session)
        const token = `Bearer ${session?.access_token}`;
        const response = await api.get('/products?select=*', {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
            'Authorization': token,
          }
        }); // Replace with your API endpoint
        console.log("response", response.data)
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};