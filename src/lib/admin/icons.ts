import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Archive,
  BarChart3,
  Box,
  CreditCard,
  Disc3,
  Flower2,
  LayoutDashboard,
  Music2,
  Package,
  Settings,
  Shield,
  ShoppingCart,
  Truck,
  Undo2,
  Users,
  Warehouse,
} from "lucide-react";
import type { AdminNavItem } from "@/lib/admin/navigation";

export const ADMIN_SECTION_ICONS: Record<string, LucideIcon> = {
  Dashboard: LayoutDashboard,
  Orders: ShoppingCart,
  Products: Package,
  Inventory: Box,
  Purchasing: CreditCard,
  Warehouse: Warehouse,
  Customers: Users,
  Payments: CreditCard,
  Shipping: Truck,
  "Returns & Refunds": Undo2,
  Music: Music2,
  Flowers: Flower2,
  "CDs / Albums": Disc3,
  "Premium Members": Shield,
  Promotions: BarChart3,
  Reports: BarChart3,
  "Users & Roles": Users,
  "Audit Logs": Activity,
  Settings: Settings,
};

export function iconForNavItem(item: AdminNavItem): LucideIcon {
  return ADMIN_SECTION_ICONS[item.label] ?? Archive;
}
