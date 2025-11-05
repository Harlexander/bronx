import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    cart: {
        items: any[];
        total: string;
        item_count: number;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type OrderType = {
    id: number;
    user_id: number;
    order_number: string;
    subtotal: string;
    tax: string;
    shipping: string;
    total: string;
    status: string;
    payment_status: string;
    delivery_address: string;
    billing_address: string | null;
    shipped_at: string | null;
    delivered_at: string | null;
    cancelled_at: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    items: OrderItemType[];
};

export interface OrderItemType {
    id: number;
    product: ProductType;
    quantity: number;
    price: number;
    total: number;
}
export 
type ProductType = {
    id: number
    name: string
    subtitle?: string
    description?: string
    price: number
    sale_price?: number
    image: string
    images: string[]
    tags: string[]
    category: string
    is_featured: boolean
    is_active: boolean
    status: string
  }
  