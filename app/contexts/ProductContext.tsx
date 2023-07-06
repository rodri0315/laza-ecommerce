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
  selectedBrand: Brand | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<Brand | null>>
  brandProducts: Product[];
}

const ProductContext = createContext<ProductContextProps>({
  products: [],
  brands: [],
  selectedBrand: null,
  setSelectedBrand: () => { },
  brandProducts: [],
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
  image_urls: string[];
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
  const { session } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [brandProducts, setBrandProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

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
  }, [session]);

  useEffect(() => {
    const fetchBranProducts = async () => {
      console.log('Brand Products befor call --->', selectedBrand)
      try {
        const {
          data: { session }, error
        } = await supabaseClient.auth.getSession();
        const token = `Bearer ${session?.access_token}`;
        const response = await api.get(`/products?brand_id=eq.${selectedBrand?.id}&select=*`, {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
            'Authorization': token,
          }
        });
        if (error) throw error;
        console.log('Brand Products--->', response.data)
        setBrandProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        console.error('Error fetching products:', error.response);
      }
    };

    if (selectedBrand) fetchBranProducts();
  }, [selectedBrand]);

  return (
    <ProductContext.Provider value={{
      products,
      brands,
      brandProducts,
      selectedBrand,
      setSelectedBrand,
    }}>
      <CurrentProductContext.Provider value={{ currentProduct, setCurrentProduct }} >
        {children}
      </CurrentProductContext.Provider>
    </ProductContext.Provider>
  );
};