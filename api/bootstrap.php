<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";

$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);

$conn = array(
    'host' => 'ec2-52-50-171-4.eu-west-1.compute.amazonaws.com',
    'driver' => 'pdo_pgsql',
    'user' => 'msmeasrolapyyg',
    'password' => '5a942b70ac31b4cdbf52809b6f9ec0555927236286894c78eaeb8155e41b99b2',
    'dbname' => 'deue1catphis9b',
    'port' => '5432'
);

$entityManager = EntityManager::create($conn, $config);
