

--Data Cleaning

--Table: Orders
--Removing Duplicate rows

WITH Duplicates_Rows_Rank AS (

SELECT *,
ROW_NUMBER() OVER (PARTITION BY customer_id, freight_value, order_date, order_id, price, product_id, quantity, seller_id, ship_date ORDER BY order_id) AS Ranking
FROM orders
)
DELETE FROM Duplicates_Rows_Rank
WHERE Ranking > 1;

--Table: Products

Update products
SET product_category_name = 'NULL'
WHERE product_category_name is null;


UPDATE products
SET 
    product_description_lenght = ISNULL(product_description_lenght, 0),
    product_height_cm = ISNULL(product_height_cm, 0),
    product_length_cm = ISNULL(product_length_cm, 0),
    product_name_lenght = ISNULL(product_name_lenght, 0),
    product_photos_qty = ISNULL(product_photos_qty, 0),
    product_weight_g = ISNULL(product_weight_g, 0),
    product_width_cm = ISNULL(product_width_cm, 0)


--Table: Reviews

UPDATE reviews
SET review_comment_title = 'NULL',
	review_comment_message = 'NULL'
WHERE
	review_comment_title IS NULL
	OR review_comment_message IS NULL
