export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          is_premium: boolean;
          subscribed_since: string | null;
          stripe_customer_id: string | null;
          diet: string | null;
          allergens: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          is_premium?: boolean | null;
          subscribed_since?: string | null;
          stripe_customer_id?: string | null;
          diet?: string | null;
          allergens?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          is_premium?: boolean | null;
          subscribed_since?: string | null;
          stripe_customer_id?: string | null;
          diet?: string | null;
          allergens?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
