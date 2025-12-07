export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      gift_boxes: {
        Row: {
          box_type: string
          created_at: string | null
          creator_id: string
          id: string
          image_url: string | null
          is_published: boolean | null
          name: string
          orders_count: number | null
          products: Json | null
          total_value: number | null
          updated_at: string | null
        }
        Insert: {
          box_type: string
          created_at?: string | null
          creator_id: string
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          name: string
          orders_count?: number | null
          products?: Json | null
          total_value?: number | null
          updated_at?: string | null
        }
        Update: {
          box_type?: string
          created_at?: string | null
          creator_id?: string
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          name?: string
          orders_count?: number | null
          products?: Json | null
          total_value?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      moments: {
        Row: {
          created_at: string | null
          creator_id: string
          id: string
          title: string
          video_thumbnail: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          id?: string
          title: string
          video_thumbnail?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          id?: string
          title?: string
          video_thumbnail?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          buyer_id: string | null
          commission_amount: number | null
          created_at: string | null
          creator_id: string | null
          gift_box_id: string | null
          id: string
          status: string | null
          total_amount: number
        }
        Insert: {
          buyer_id?: string | null
          commission_amount?: number | null
          created_at?: string | null
          creator_id?: string | null
          gift_box_id?: string | null
          id?: string
          status?: string | null
          total_amount: number
        }
        Update: {
          buyer_id?: string | null
          commission_amount?: number | null
          created_at?: string | null
          creator_id?: string | null
          gift_box_id?: string | null
          id?: string
          status?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_gift_box_id_fkey"
            columns: ["gift_box_id"]
            isOneToOne: false
            referencedRelation: "gift_boxes"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          in_stock: boolean | null
          name: string
          price: number
          tags: string[] | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          name: string
          price: number
          tags?: string[] | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          name?: string
          price?: number
          tags?: string[] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          boxes_sold: number | null
          created_at: string | null
          email: string | null
          followers_count: number | null
          full_name: string | null
          id: string
          is_creator: boolean | null
          plan: Database["public"]["Enums"]["user_plan"] | null
          plan_expires_at: string | null
          rating: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          boxes_sold?: number | null
          created_at?: string | null
          email?: string | null
          followers_count?: number | null
          full_name?: string | null
          id: string
          is_creator?: boolean | null
          plan?: Database["public"]["Enums"]["user_plan"] | null
          plan_expires_at?: string | null
          rating?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          boxes_sold?: number | null
          created_at?: string | null
          email?: string | null
          followers_count?: number | null
          full_name?: string | null
          id?: string
          is_creator?: boolean | null
          plan?: Database["public"]["Enums"]["user_plan"] | null
          plan_expires_at?: string | null
          rating?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      rituals: {
        Row: {
          created_at: string | null
          creator_id: string
          description: string | null
          id: string
          image_url: string | null
          steps: Json | null
          title: string
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          description?: string | null
          id?: string
          image_url?: string | null
          steps?: Json | null
          title: string
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          description?: string | null
          id?: string
          image_url?: string | null
          steps?: Json | null
          title?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "creator"
      user_plan: "basic" | "legend" | "royal"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user", "creator"],
      user_plan: ["basic", "legend", "royal"],
    },
  },
} as const
