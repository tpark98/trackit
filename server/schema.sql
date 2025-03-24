CREATE TABLE IF NOT EXISTS users (
    id varchar(50) NOT NULL UNIQUE PRIMARY KEY,
    password varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    roles varchar(255) NOT NULL UNIQUE,
    access TEXT[]
);

CREATE TABLE IF NOT EXISTS supplier (
    id int PRIMARY KEY,
    supplier_name varchar(100)
);

--
CREATE TABLE IF NOT EXISTS category (
     id int PRIMARY KEY,
     category_name VARCHAR(100)
);
--
CREATE TABLE IF NOT EXISTS product (
    id int PRIMARY KEY,
     product_name VARCHAR(100),
     cost DECIMAL(10,2),
     expire DATE,
     purchased DATE,
     leftover INT,
     category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Many-to-Many: user manages Product
CREATE TABLE IF NOT EXISTS user_manages_product (
    user_id varchar(50),
    product_id INT,
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Many-to-Many: User manages Supplier
CREATE TABLE IF NOT EXISTS user_manages_supplier (
    user_id varchar(50),
    supplier_id INT,
    PRIMARY KEY (user_id, supplier_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (supplier_id) REFERENCES supplier(id)
);

-- Many-to-Many: ser manages Category
CREATE TABLE IF NOT EXISTS user_manages_category (
    user_id varchar(50),
    category_id INT,
    PRIMARY KEY (user_id, category_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Many-to-Many: supplier supplies product
CREATE TABLE IF NOT EXISTS supplier_supplies_product (
    supplier_id INT,
    product_id INT,
    PRIMARY KEY (supplier_id, product_id),
    FOREIGN KEY (supplier_id) REFERENCES supplier(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);
