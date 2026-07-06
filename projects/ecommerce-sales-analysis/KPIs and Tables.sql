
---------SQL KPIs

-- KPI 1: Sales Growth Over Year and Month

SELECT 
    YEAR(order_date) AS Year,
    MONTH(order_date) AS Month,
    FORMAT(order_date, 'yyyy-MMM') AS Year_Month,
    SUM(quantity * price) AS Total_Sales
--INTO Sales_Growth
	FROM orders
GROUP BY YEAR(order_date), MONTH(order_date), FORMAT(order_date, 'yyyy-MMM')
ORDER BY Year, Month;

-- KPI 2: Average Orders by Hour of the Day
WITH Hourly_Orders AS (
    SELECT 
        DATEPART(HOUR, order_date) AS order_hour,
        CAST(order_date AS DATE) AS order_day,
        COUNT(DISTINCT order_id) AS orders_per_hour
    FROM orders
    GROUP BY DATEPART(HOUR, order_date), CAST(order_date AS DATE)
)
SELECT 
    order_hour,
    AVG(orders_per_hour) AS avg_orders
--INTO Avg_Hourly_Orders
FROM Hourly_Orders
GROUP BY order_hour
ORDER BY order_hour;

-- KPI 3: Top 5 Product Categories by Total Sales
SELECT TOP 5
    product_category_name AS Category,
    SUM(quantity*price) AS Total_Sales
--INTO Top_5_Categories
FROM orders o
JOIN products p ON o.product_id = p.product_id
GROUP BY product_category_name
ORDER BY Total_Sales DESC;

-- KPI 4: Most Frequent Negative Reviews Title (Rating < 3)

SELECT top 10
    review_comment_title,
    COUNT(*) AS No_of_Complaints
--INTO Top_Complaints
FROM reviewS
WHERE review_score < 3 
AND review_comment_title <> 'NULL'
GROUP BY review_comment_title
ORDER BY No_of_Complaints DESC;

--KPI 5: Regional Performance Measurement by average_order_value,  average_freight_cost, average_quantity_ordered, average_delivery_days


SELECT
    c.region,
    AVG(o.price * o.quantity) AS average_order_value,
    AVG(o.freight_value) AS average_freight_cost,
    AVG(o.quantity) AS average_quantity_ordered,
    AVG(DATEDIFF(day, o.order_date, ds.order_delivered_customer_date)) AS average_delivery_days
--INTO Regional_Comparison
FROM
    orders o
JOIN
    customers c ON o.customer_id = c.customer_id
JOIN
    delivery_status ds ON o.order_id = ds.order_id
WHERE
    ds.order_status = 'delivered'
GROUP BY
    c.region
ORDER BY
    c.region;


--------Tables For Excel

--Table


-- Table for KPI 1: Reviews
-- Table for KPI 2: Payment_Mode
-- Table for KPI 3: delivery_status
-- Table for KPI 4: Cat_Product_review_score

SELECT
    product_category_name AS category, p.product_id, review_score
--INTO Cat_Product_review_score
FROM reviews r
JOIN orders o ON r.review_id = o.order_id
JOIN products p ON p.product_id = o.product_id

