export type AdminNavItem = {
  label: string;
  href?: string;
  description?: string;
  children?: AdminNavItem[];
};

function slug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^\w\s-/]/g, "")
    .replace(/\s+/g, "-")
    .replace(/\//g, "-");
}

function leaf(base: string, label: string, description?: string): AdminNavItem {
  return { label, href: `${base}/${slug(label)}`, description };
}

function group(base: string, label: string, children: AdminNavItem[]): AdminNavItem {
  return { label, children: children.map((child) => ({ ...child, href: child.href ?? `${base}/${slug(child.label)}` })) };
}

const dashboardChildren: AdminNavItem[] = [
  leaf("/admin/dashboard", "Sales Overview", "Revenue, orders, and conversion at a glance."),
  leaf("/admin/dashboard", "Order Summary", "Today's and weekly order totals."),
  leaf("/admin/dashboard", "Inventory Summary", "Stock levels across all locations."),
  leaf("/admin/dashboard", "Low Stock Alerts", "Products below reorder threshold."),
  leaf("/admin/dashboard", "Incoming Deliveries", "Expected purchase order receipts."),
  leaf("/admin/dashboard", "Recent Orders", "Latest customer orders."),
  leaf("/admin/dashboard", "Best-Selling Products", "Top performers by units and revenue."),
  leaf("/admin/dashboard", "Activity Feed", "Recent store and team activity."),
];

export const ADMIN_NAV: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", children: dashboardChildren },
  group("/admin/orders", "Orders", [
    { label: "All Orders" },
    { label: "New Orders" },
    { label: "Confirmed" },
    { label: "Processing" },
    { label: "Ready to Ship" },
    { label: "Shipped" },
    { label: "Delivered" },
    { label: "Cancelled" },
    { label: "Returns" },
    { label: "Refunds" },
    { label: "Order History" },
  ]),
  group("/admin/products", "Products", [
    { label: "All Products" },
    { label: "Add Product" },
    { label: "Categories" },
    { label: "Subcategories" },
    { label: "Variants" },
    { label: "SKUs / Barcodes" },
    { label: "Pricing" },
    { label: "Sale Pricing" },
    { label: "Product Images" },
    { label: "Product Status" },
    { label: "Archived Products" },
  ]),
  group("/admin/inventory", "Inventory", [
    { label: "Inventory Dashboard" },
    { label: "Current Stock" },
    { label: "Available Stock" },
    { label: "Reserved Stock" },
    { label: "Stock Receiving" },
    { label: "Stock Adjustments" },
    { label: "Stock Transfers" },
    { label: "Damaged Stock" },
    { label: "Returned Stock" },
    { label: "Low Stock" },
    { label: "Out of Stock" },
    { label: "Batch / Lot Tracking" },
    { label: "Expiry Tracking" },
    { label: "Inventory History" },
  ]),
  {
    label: "Purchasing",
    children: [
      group("/admin/purchasing/suppliers", "Suppliers", [
        { label: "All Suppliers" },
        { label: "Add Supplier" },
        { label: "Supplier Products" },
        { label: "Supplier History" },
      ]),
      group("/admin/purchasing/purchase-orders", "Purchase Orders", [
        { label: "Draft" },
        { label: "Ordered" },
        { label: "Partially Received" },
        { label: "Fully Received" },
        { label: "Closed" },
        { label: "Cancelled" },
      ]),
      leaf("/admin/purchasing", "Create Purchase Order"),
      leaf("/admin/purchasing", "Receive Purchase Order"),
      leaf("/admin/purchasing", "Goods Receipts"),
      leaf("/admin/purchasing", "Supplier Invoices"),
      leaf("/admin/purchasing", "Purchase History"),
    ],
  },
  group("/admin/warehouse", "Warehouse", [
    { label: "Warehouses / Locations" },
    { label: "Receiving" },
    { label: "Put Away" },
    { label: "Picking" },
    { label: "Packing" },
    { label: "Stock Transfers" },
    { label: "Warehouse Activity" },
  ]),
  group("/admin/customers", "Customers", [
    { label: "All Customers" },
    { label: "Customer Details" },
    { label: "Order History" },
    { label: "Shipping Addresses" },
    { label: "Payment History" },
    { label: "Returns / Refunds" },
    { label: "Premium Status" },
    { label: "Customer Notes" },
  ]),
  group("/admin/payments", "Payments", [
    { label: "All Transactions" },
    { label: "Successful" },
    { label: "Pending" },
    { label: "Failed" },
    { label: "Refunds" },
    { label: "Payment Methods" },
    { label: "Transaction History" },
  ]),
  group("/admin/shipping", "Shipping", [
    { label: "Ready to Ship" },
    { label: "Shipments" },
    { label: "Shipping Labels" },
    { label: "Tracking Numbers" },
    { label: "Carriers" },
    { label: "Shipping Rates" },
    { label: "Delivered" },
    { label: "Failed Delivery" },
    { label: "Shipping History" },
  ]),
  group("/admin/returns-refunds", "Returns & Refunds", [
    { label: "Return Requests" },
    { label: "Approved Returns" },
    { label: "Received Returns" },
    { label: "Product Inspection" },
    { label: "Refund Requests" },
    { label: "Completed Refunds" },
    { label: "Return History" },
  ]),
  group("/admin/music", "Music", [
    { label: "Songs", description: "Manage the music catalog." },
    { label: "Albums" },
    { label: "Artists" },
    { label: "Playlists" },
    { label: "Genres" },
    { label: "Upload Music" },
    { label: "Music Analytics" },
  ]),
  group("/admin/flowers", "Flowers", [
    { label: "All Flowers" },
    { label: "Add Flower Product" },
    { label: "Flower Categories" },
    { label: "Arrangements" },
    { label: "Stock" },
    { label: "Expiry / Freshness" },
    { label: "Pricing" },
  ]),
  group("/admin/cds-albums", "CDs / Albums", [
    { label: "All CDs" },
    { label: "Add CD" },
    { label: "Artists" },
    { label: "Albums" },
    { label: "Inventory" },
    { label: "Pricing" },
  ]),
  group("/admin/premium-members", "Premium Members", [
    { label: "All Members" },
    { label: "Active" },
    { label: "Expired" },
    { label: "Cancelled" },
    { label: "Subscriptions" },
    { label: "Membership History" },
  ]),
  group("/admin/promotions", "Promotions", [
    { label: "Discount Codes" },
    { label: "Coupons" },
    { label: "Product Sales" },
    { label: "Flash Sales" },
    { label: "Bundles" },
    { label: "Promotion History" },
  ]),
  group("/admin/reports", "Reports", [
    { label: "Sales Report" },
    { label: "Order Report" },
    { label: "Product Report" },
    { label: "Inventory Report" },
    { label: "Stock Movement" },
    { label: "Inventory Valuation" },
    { label: "Purchase Report" },
    { label: "Supplier Report" },
    { label: "Profit / Margin Report" },
    { label: "Returns Report" },
    { label: "Damaged Stock Report" },
    { label: "Customer Report" },
    { label: "Payment Report" },
    { label: "Shipping Report" },
  ]),
  group("/admin/users-roles", "Users & Roles", [
    { label: "Admin Users", description: "Manage staff accounts and roles." },
    { label: "Add User" },
    { label: "Roles" },
    { label: "Permissions" },
    { label: "Login Activity" },
  ]),
  group("/admin/audit-logs", "Audit Logs", [
    { label: "Product Changes" },
    { label: "Price Changes" },
    { label: "Inventory Changes" },
    { label: "Order Changes" },
    { label: "Refund Activity" },
    { label: "User Activity" },
    { label: "Security Activity" },
  ]),
  group("/admin/settings", "Settings", [
    { label: "Store Settings", description: "Store name, contact, and public URLs." },
    { label: "Company Information" },
    { label: "Currency" },
    { label: "Tax" },
    { label: "Payment Settings" },
    { label: "Shipping Settings" },
    { label: "Inventory Settings" },
    { label: "Notification Settings" },
    { label: "Email Templates" },
    { label: "Security" },
    { label: "Integrations" },
  ]),
];

export type AdminNavMatch = {
  section: AdminNavItem;
  page: AdminNavItem;
  breadcrumbs: AdminNavItem[];
};

function walkNav(
  items: AdminNavItem[],
  path: string,
  trail: AdminNavItem[] = [],
): AdminNavMatch | null {
  for (const item of items) {
    if (item.href === path) {
      return {
        section: trail[0] ?? item,
        page: item,
        breadcrumbs: [...trail, item],
      };
    }
    if (item.children?.length) {
      const found = walkNav(item.children, path, [...trail, item]);
      if (found) return found;
    }
  }
  return null;
}

/** Resolve a pathname like `/admin/orders/all-orders` to nav metadata. */
export function matchAdminPath(pathname: string): AdminNavMatch | null {
  const normalized = pathname.replace(/\/+$/, "") || "/admin";
  if (normalized === "/admin") {
    return {
      section: ADMIN_NAV[0]!,
      page: { label: "Overview", href: "/admin", description: "Store dashboard and key metrics." },
      breadcrumbs: [ADMIN_NAV[0]!, { label: "Overview", href: "/admin" }],
    };
  }
  return walkNav(ADMIN_NAV, normalized);
}

/** Flat list of every navigable admin href (for sitemap / search). */
export function flattenAdminNav(items: AdminNavItem[] = ADMIN_NAV): AdminNavItem[] {
  const out: AdminNavItem[] = [];
  for (const item of items) {
    if (item.href) out.push(item);
    if (item.children?.length) out.push(...flattenAdminNav(item.children));
  }
  return out;
}

export function adminSectionCount(): number {
  return flattenAdminNav().length;
}
