import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import { supabaseClient } from '../config/supabase-client';

// Create a context for products
interface ProductContextProps {
  products: Product[];
  brands: Brand[];
}

const ProductContext = createContext<ProductContextProps>({
  products: [],
  brands: []
});
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

export function useProducts() {
  return useContext(ProductContext);
}

export const ProductProvider: React.FC = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
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
        const brands = await api.get('/brands?select=*', {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
            'Authorization': token,
          }
        });
        // console.log("brands", brands.data)
        setBrands(brands.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, brands }}>
    </ProductContext.Provider>
  );
};