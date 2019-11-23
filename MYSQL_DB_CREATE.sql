CREATE TABLE `bucket` (
 `bucket_id` varchar(255) NOT NULL,
 `bucket_name` varchar(255) NOT NULL,
 `bucket_created_time` bigint(13) NOT NULL,
 PRIMARY KEY (`bucket_id`));

CREATE TABLE `todo` (
 `todo_id` varchar(255) NOT NULL,
 `todo_name` varchar(255)  NOT NULL,
 `todo_done` tinyint(1) NOT NULL,
 `todo_bucket_id` varchar(255) NOT NULL,
 `todo_created_time` bigint(13) NOT NULL,
 PRIMARY KEY (`todo_id`),
 FOREIGN KEY (`todo_bucket_id`) REFERENCES bucket(bucket_id)
);