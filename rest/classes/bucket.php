<?php
class Bucket {
    private $db;

    function __construct() {
        $this->createDatabaseConnection();
    }

    private function createDatabaseConnection() {
        $this->db = new PDO("mysql:host=localhost;dbname=". DB_NAME. ";charset=UTF8", DB_USER, DB_PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }

    public function fetchAll() {
        $query = $this->db->prepare("SELECT `bucket_id` AS `bucketId`, `bucket_name` AS `bucketName`, `bucket_created_time` AS `bucketCreatedTime` FROM `bucket` ORDER BY `bucket_created_time` DESC");
        $query->execute();
        return $query->fetchAll();
    }
    
    public function insertBucket($bucketId, $bucketName, $bucketCreatedTime) {
        $query = $this->db->prepare("INSERT INTO `bucket` (`bucket_id`, `bucket_name`, `bucket_created_time`) VALUES (?, ?, ?)");
        $query->bindParam(1, $bucketId, PDO::PARAM_STR);
        $query->bindParam(2, $bucketName, PDO::PARAM_STR);
        $query->bindValue(3, $bucketCreatedTime, PDO::PARAM_INT);
        return $query->execute();
    }
}
