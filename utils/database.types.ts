export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
      };
      albums: {
        Row: {
          id: string;
          user_id: string | null;
          title: string | null;
          artist: string | null;
          year: string | null;
          inserted_at: string | null;
          image_url: string | null;
          image_name: string | null;
        };
        Insert: {
          id: string;
          user_id?: string | null;
          title?: string | null;
          artist?: string | null;
          year?: string | null;
          inserted_at?: string | null;
          image_url?: string | null;
          image_name?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          title?: string | null;
          artist?: string | null;
          year?: string | null;
          inserted_at?: string | null;
          image_url?: string | null;
          image_name?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
