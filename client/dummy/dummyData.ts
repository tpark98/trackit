// Define types
export interface User {
  id: string;
password: string;
firstName: string;
lastName: string;
roles: string;
access: string[];
}

export interface Category {
id: number;
categoryName: string;
}

export interface Supplier {
id: number;
supplierName: string;
}

export interface Product {
id: number;
productName: string;
cost: number;
expire: string;
purchaseDate: string;
purchased: number;
leftover: number;
categoryId: number;
}

export interface SupplierSuppliesProduct {
supplierId: number;
productId: number;
}

export interface UserManagesProduct {
userId: string;
productId: number;
}

export interface Purchase {
id: number;
name: string;
costPerUnit: number;
sellingPrice: number;
amountLeft: number;
amountSold: number;
}

export interface WeeklyProductSales {
productId: number;
productName: string;
quantitySold: number;
quantityBought: number;
get revenue(): number;
get cost(): number;
}

export interface WeekData {
week: string;
cost: number;
revenue: number;
profit: number;
productSales: WeeklyProductSales[];
}

// Mock data
export const users: User[] = [
{ id: 'user01', password: 'test', firstName: 'Imani', lastName: 'Smith', roles: 'manager', access: ['products'] }
];

export const categories: Category[] = [
{ id: 1, categoryName: 'Fruits' },
{ id: 2, categoryName: 'Dairy' },
{ id: 3, categoryName: 'Beverages' }
];

export const suppliers: Supplier[] = [
{ id: 1, supplierName: 'Fruit Bros' },
{ id: 2, supplierName: 'Coke Co' },
{ id: 3, supplierName: 'Yogurt Inc' }
];

export const products: Product[] = [
{ id: 1, productName: 'Kumquats', cost: 100.00, expire: '2025-06-01', purchaseDate: '2024-03-01', purchased: 10, leftover: 10, categoryId: 1 },
{ id: 2, productName: 'Golden Berries', cost: 50.00, expire: '2025-06-05', purchaseDate: '2024-03-02', purchased: 10, leftover: 10, categoryId: 1 },
{ id: 3, productName: 'Greek Yogurt', cost: 30.00, expire: '2025-04-30', purchaseDate: '2024-03-03', purchased: 5, leftover: 5, categoryId: 2 },
{ id: 4, productName: 'Coke Soda', cost: 90.00, expire: '2025-07-01', purchaseDate: '2024-03-04', purchased: 25, leftover: 25, categoryId: 3 },
{ id: 5, productName: 'Dirty Coke', cost: 35.00, expire: '2025-06-10', purchaseDate: '2024-03-05', purchased: 20, leftover: 20, categoryId: 3 },
{ id: 6, productName: 'Coco Guan Legacy', cost: 50.00, expire: '2025-06-12', purchaseDate: '2024-03-06', purchased: 15, leftover: 15, categoryId: 3 },
{ id: 7, productName: 'Citrus Rift', cost: 140.00, expire: '2025-06-25', purchaseDate: '2024-03-07', purchased: 40, leftover: 40, categoryId: 1 },
{ id: 8, productName: 'Micho Crisp', cost: 140.00, expire: '2025-06-25', purchaseDate: '2024-03-08', purchased: 45, leftover: 45, categoryId: 1 }
];

export const supplierSuppliesProduct: SupplierSuppliesProduct[] = [
{ supplierId: 1, productId: 1 },
{ supplierId: 1, productId: 2 },
{ supplierId: 1, productId: 7 },
{ supplierId: 1, productId: 8 },
{ supplierId: 2, productId: 4 },
{ supplierId: 2, productId: 5 },
{ supplierId: 2, productId: 6 },
{ supplierId: 3, productId: 3 }
];

export const userManagesProduct: UserManagesProduct[] = [
{ userId: 'user01', productId: 1 },
{ userId: 'user01', productId: 3 },
{ userId: 'user01', productId: 5 }
];

export const purchases: Purchase[] = [
{ id: 1, name: 'Cup', costPerUnit: 0.5, sellingPrice: 1, amountLeft: 100, amountSold: 250 },
{ id: 2, name: 'Milk', costPerUnit: 5.0, sellingPrice: 7.0, amountLeft: 3, amountSold: 2 },
{ id: 3, name: 'Coffee Beans', costPerUnit: 12.0, sellingPrice: 18, amountLeft: 12, amountSold: 15 },
{ id: 4, name: 'Caramel Syrup', costPerUnit: 20.0, sellingPrice: 30, amountLeft: 2, amountSold: 4 },
{ id: 5, name: 'Muffins', costPerUnit: 1.0, sellingPrice: 3, amountLeft: 20, amountSold: 14 }
];

export const emergencyContacts = [
{ id: '1', name: 'Bobby', desc: 'Plumber', phone: '555-123-4567' },
{ id: '2', name: 'Anna', desc: 'Electrician', phone: '555-234-5678' },
{ id: '3', name: 'Gerald', desc: 'HVAC Technician', phone: '555-345-6789' },
];

// Weekly sales data with detailed product breakdown
export const weeklyFinances: WeekData[] = [
{
  week: "2025-03-04 to 2025-03-10",
  cost: 0,
  revenue: 0,
  profit: 0,
  productSales: [
    {
      productId: 1,
      productName: 'Cup',
      quantitySold: 60,
      quantityBought: 150,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 2,
      productName: 'Milk',
      quantitySold: 1,
      quantityBought: 5,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 3,
      productName: 'Coffee Beans',
      quantitySold: 4,
      quantityBought: 10,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 4,
      productName: 'Caramel Syrup',
      quantitySold: 1,
      quantityBought: 3,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 5,
      productName: 'Muffins',
      quantitySold: 3,
      quantityBought: 10,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    }
  ]
},
{
  week: "2025-03-11 to 2025-03-17",
  cost: 0,
  revenue: 0,
  profit: 0,
  productSales: [
    {
      productId: 1,
      productName: 'Cup',
      quantitySold: 70,
      quantityBought: 100,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 2,
      productName: 'Milk',
      quantitySold: 0,
      quantityBought: 2,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 3,
      productName: 'Coffee Beans',
      quantitySold: 5,
      quantityBought: 8,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 4,
      productName: 'Caramel Syrup',
      quantitySold: 2,
      quantityBought: 2,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 5,
      productName: 'Muffins',
      quantitySold: 5,
      quantityBought: 8,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    }
  ]
},
{
  week: "2025-03-18 to 2025-03-24",
  cost: 0,
  revenue: 0,
  profit: 0,
  productSales: [
    {
      productId: 1,
      productName: 'Cup',
      quantitySold: 65,
      quantityBought: 120,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 2,
      productName: 'Milk',
      quantitySold: 1,
      quantityBought: 4,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 3,
      productName: 'Coffee Beans',
      quantitySold: 3,
      quantityBought: 6,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 4,
      productName: 'Caramel Syrup',
      quantitySold: 1,
      quantityBought: 1,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 5,
      productName: 'Muffins',
      quantitySold: 4,
      quantityBought: 6,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    }
  ]
},
{
  week: "2025-03-25 to 2025-03-31",
  cost: 0,
  revenue: 0,
  profit: 0,
  productSales: [
    {
      productId: 1,
      productName: 'Cup',
      quantitySold: 55,
      quantityBought: 80,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 2,
      productName: 'Milk',
      quantitySold: 0,
      quantityBought: 3,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 3,
      productName: 'Coffee Beans',
      quantitySold: 3,
      quantityBought: 5,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 4,
      productName: 'Caramel Syrup',
      quantitySold: 1,
      quantityBought: 2,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    },
    {
      productId: 5,
      productName: 'Muffins',
      quantitySold: 2,
      quantityBought: 5,
      get revenue() { return purchases.find(p => p.id === this.productId)!.sellingPrice * this.quantitySold; },
      get cost() { return purchases.find(p => p.id === this.productId)!.costPerUnit * this.quantityBought; }
    }
  ]
}
];

// Calculate weekly totals based on product sales
weeklyFinances.forEach(week => {
week.cost = week.productSales.reduce((sum, product) => sum + product.cost, 0);
week.revenue = week.productSales.reduce((sum, product) => sum + product.revenue, 0);
week.profit = week.revenue - week.cost;
});