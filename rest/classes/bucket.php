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
        $query = $this->db->prepare("SELECT `bucket_id` AS `bucketId`, `bucket_name` AS `bucketName` FROM `bucket` ORDER BY `bucket_id` DESC");
        $query->execute();
        return $query->fetchAll();
    }
    
    public function insertBucket($bucketId, $bucketName) {
        $query = $this->db->prepare("INSERT INTO `bucket` (`bucket_id`, `bucket_name`) VALUES (?, ?)");
        $query->bindParam(1, $bucketId, PDO::PARAM_STR);
        $query->bindParam(2, $bucketName, PDO::PARAM_STR);
        return $query->execute();
    }
}
