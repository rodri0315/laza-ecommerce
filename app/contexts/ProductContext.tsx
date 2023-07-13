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
  setUserFavoritesProducts: React.Dispatch<React.SetStateAction<Product[]>>
  userFavorites: Product[];
  toggleFavorite: (product: Product) => void;
}

const ProductContext = createContext<ProductContextProps>({
  products: [],
  brands: [],
  selectedBrand: null,
  setSelectedBrand: () => { },
  brandProducts: [],
  setUserFavoritesProducts: () => { },
  userFavorites: [],
  toggleFavorite: () => { }
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
  quantity: number;
  brand_id: string;
  isFavorite?: boolean;
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
  const [userFavorites, setUserFavoritesProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const {
          data: { session }, error
        } = await supabaseClient.auth.getSession();
        const token = `Bearer ${session?.access_token}`;
        const [products, brands, favorites] = await axios.all([
          api.get('/products?select=*', {
            headers: {
              'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
              'Authorization': token,
            }
          }),
          api.get('/brands?select=*', {
            headers: {
              'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
              'Authorization': token,
            }
          }),
          api.get(`/userFavorites?user_id=eq.${session?.user.id}&select=*`, {
            headers: {
              'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
              'Authorization': token,
              'Prefer': 'return=representation'
            }
          })
        ])
        if (error) throw error;
        // console.log('Brands--->', brands.data)
        console.log('Products--->', products.data)
        console.log('Favorites--->', favorites.data, favorites.status)

        let updatedProducts: Product[] = [];
        if (favorites.data.length > 0) {
          const userFavoritesProducts = favorites.data.map((favorite: any) => {
            return products.data.find((product: Product) => product.id === favorite.product_id)
          })
          setUserFavoritesProducts(userFavoritesProducts); if (userFavoritesProducts.length > 0) {
            updatedProducts = products.data.map((product: Product) => {
              if (userFavoritesProducts.find((userFavorite: Product) => userFavorite.id === product.id)) {
                return {
                  ...product,
                  isFavorite: true
                }
              }
              return product
            });
          }
        }
        setBrands(brands.data);
        setProducts([...updatedProducts]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (session?.user) fetchProducts();
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
        console.log('Brand Products--->', response.data[0].brand_id)
        const updatedBrandProducts = response.data.map((product) => {
          if (product.id === currentProduct?.id) {
            return {
              ...product,
              isFavorite: true
            }
          }
          return product
        });
        setBrandProducts(updatedBrandProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        console.error('Error fetching products:', error.response);
      }
    };

    if (selectedBrand) fetchBranProducts();
  }, [selectedBrand]);

  const toggleFavorite = async (product: Product) => {
    try {
      const {
        data: { session }, error
      } = await supabaseClient.auth.getSession();
      const token = `Bearer ${session?.access_token}`;
      if (userFavorites.find((favorite: Product) => favorite.id === product.id)) {
        console.log('DELETE Favorite')
        const removedFavorite = await api.delete(`/userFavorites?product_id=eq.${product.id}`,
          {
            headers: {
              'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
              'Authorization': token,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            }
          }
        );
        debugger
        console.log('Removed Favorite--->', removedFavorite.request.status)
        if (error) throw error;
        setProducts(products.filter((product: Product) => product.id !== removedFavorite.data[0].product_id))
        return setUserFavoritesProducts(userFavorites.filter((favorite: Product) => favorite.id !== product.id))

      }
      console.log('New Favorite')
      const newFavorite = await api.post('/userFavorites', { user_id: session?.user.id, product_id: product.id },
        {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
            'Authorization': token,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          }
        }
      );
      if (error) throw error;
      console.log('New Favorite--->', newFavorite.data)
      // setUserFavoritesProducts([...userFavorites, ...newFavorite.data])
      const updatedProducts = products.map((product) => {
        if (product.id === newFavorite.data[0].product_id) {
          return {
            ...product,
            isFavorite: true
          }
        }
        return product
      });

      // debugger
      const updatedUserFavorites = updatedProducts.filter((product) => product && product.isFavorite)
      setUserFavoritesProducts([...updatedUserFavorites])
      setProducts(updatedProducts)
    }
    catch (err) {
      console.log(err.response)
    }
  }

  return (
    <ProductContext.Provider value={{
      products,
      brands,
      brandProducts,
      selectedBrand,
      setSelectedBrand,
      userFavorites,
      setUserFavoritesProducts,
      toggleFavorite
    }}>
      <CurrentProductContext.Provider value={{ currentProduct, setCurrentProduct }} >
        {children}
      </CurrentProductContext.Provider>
    </ProductContext.Provider>
  );
};