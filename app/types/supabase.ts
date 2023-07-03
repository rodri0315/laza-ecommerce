export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: {
          created_at: string | null
          id: number
          logo_url: string | null
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          logo_url?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          logo_url?: string | null
          name?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string | null
          id: number
          product_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          product_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          product_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: number
          shipping_address: string | null
          total_amount: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          shipping_address?: string | null
          total_amount?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          shipping_address?: string | null
          total_amount?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          brand_id: number | null
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          is_sold_out: boolean | null
          name: string | null
          price: number | null
          type: string | null
        }
        Insert: {
          brand_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_sold_out?: boolean | null
          name?: string | null
          price?: number | null
          type?: string | null
        }
        Update: {
          brand_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_sold_out?: boolean | null
          name?: string | null
          price?: number | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            referencedRelation: "brands"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: number
          product_id: number | null
          rating: number | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: number
          product_id?: number | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: number
          product_id?: number | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      test: {
        Row: {
          created_at: string | null
          id: number
          text: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          text?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          text?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "test_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
  }
}
