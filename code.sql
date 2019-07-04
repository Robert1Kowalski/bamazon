-- create bamazon database
DROP DATABASE IF EXISTS bamazon; -- drop database if it exists (ONLY FOR USE IN HW)
CREATE DATABASE bamazon;

-- select bamazon database
USE bamazon;

-- create products table
CREATE TABLE products (
item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(250) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price FLOAT(10, 2) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
product_sales FLOAT(10, 2) NOT NULL,
PRIMARY KEY (item_id)
);

-- add ten products to products table
INSERT INTO 
	products (product_name, department_name, price, stock_quantity, product_sales)
VALUES 
	("HP Omen 17.3' Gaming Laptop", "Electronics", 849.99, 100, 0),
	("Amazon Key In-Home Kit", "Electronics", 249.99, 100, 0),
	("Tablet Stand Multi-Angle", "Accessories", 10.96, 100, 0),
	("Taotronics Bluetooth 4.1 Transmitter / Receiver", "Electronics", 28.49, 100, 0),
	("Wireless Bluetooth Speaker", "Electronics", 18.98, 100, 0),
	("1080P WiFi Mini Camera", "Electronics", 33.99, 100, 0),
	("Portable Chargers 16750 RAVPower", "Accessories", 25.49, 100, 0),
	("Laptop Backpack with USB Port and Multiple Zipper Pockets", "Accessories", 19.99, 100, 0),
	("Laptop Sleeve Case  11.6 - 12.3in", "Accessories", 10.26, 100, 0),
	("Samsung Electronics UN65MU6300 65in 4K Ultra HD Smart LED TV", "Electronics", 879.00, 100, 0),
    ("Corel PaintShop Pro 2018", "Software", 49.99, 100, 0);
    
-- displays all product information   
SELECT * FROM products;
   
-- create departments table
CREATE TABLE departments (
department_id INTEGER(10) AUTO_INCREMENT NOT NULL,
department_name VARCHAR(100) NOT NULL,
overhead_costs FLOAT(10, 2) NOT NULL,
PRIMARY KEY (department_id)
);

INSERT INTO 
	departments (department_name, overhead_costs)
VALUES
	("Accessories", 5000),
    	("Electronics", 10000),
    	("Software", 200);

-- displays all department information
SELECT * FROM departments;