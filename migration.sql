DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE customers (
    id serial primary key,
    f_name varchar not null,
    l_name varchar not null,
    email varchar not null,
    cart int []
);

CREATE TABLE products (
    id serial primary key,
    p_name varchar,
    p_price int
);
