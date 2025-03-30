-- Insert Categories
INSERT INTO category (id, category_name) VALUES
    (1, 'Fruits'),
    (2, 'Dairy'),
    (3, 'Beverages'),
ON CONFLICT (id) DO NOTHING;

-- Insert Suppliers
INSERT INTO supplier (id, supplier_name) VALUES
    (1, 'Fruit Bros'),
    (2, 'Coke Co'),
    (3, 'Yogurt Inc'),
ON CONFLICT (id) DO NOTHING;

-- Insert Products (with fixed purchased + expire dates)
INSERT INTO product (id, product_name, cost, expire, purchased, leftover, category_id) VALUES
    (1, 'Kumquats', 100.00, '2024-06-01', '2024-03-01', 10, 1),
    (2, 'Golden Berries', 50.00, '2024-06-05', '2024-03-02', 10, 1),
    (3, 'Greek Yogurt', 30.00, '2024-04-30', '2024-03-03', 5, 2),
    (4, 'Coke Soda', 90.00, '2024-07-01', '2024-03-04', 25, 3),
    (5, 'Dirty Coke', 35.00, '2024-06-10', '2024-03-05', 20, 3),
    (6, 'Coco Guan Legacy', 50.00, '2024-06-12', '2024-03-06', 15, 3),
    (7, 'Citrus Rift', 140.00, '2024-06-25', '2024-03-07', 40, 1),
    (8, 'Micho Crisp', 140.00, '2024-06-25', '2024-03-08', 45, 1),
ON CONFLICT (id) DO NOTHING;

-- Link Suppliers to Products
INSERT INTO supplier_supplies_product (supplier_id, product_id) VALUES
    (1, 1), (1, 2), (1, 7), (1, 8),   -- Fruit Bros → fruit products
    (2, 4), (2, 5), (2, 6),           -- Coke Co → beverages
    (3, 3),
ON CONFLICT (id) DO NOTHING;-- Yogurt Inc → Greek Yogurt
