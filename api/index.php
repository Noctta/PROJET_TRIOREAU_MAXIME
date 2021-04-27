<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/bootstrap.php';

$app = AppFactory::create();

$app->addRoutingMiddleware();
$app->addErrorMiddleware(false, true, true);
$app->addBodyParsingMiddleware();

const JWT_SECRET = "makey1234567";


// Middleware de validation du Jwt
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/login"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];


$app->post('/api/login', function (Request $request, Response $response, $args) {
    global $entityManager;

    $body = $request->getParsedBody();

    $clientRepository = $entityManager->getRepository('Client');
    $client = $clientRepository->findOneBy(array('login' => $body['login'], 'password' => $body['password']));

    if ($client) {
        $issuedAt = time();
        $expirationTime = $issuedAt + 60000;

        $payload = array(
            'userid' => $client->getId(),
            'email' => $client->getEmail(),
            'login' => $client->getLogin(),
            'iat' => $issuedAt,
            'exp' => $expirationTime
        );

        $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");

        $client->setToken($token_jwt);
        $entityManager->persist($client);
        $entityManager->flush();

        $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
        $response->getBody()->write(json_encode($client));
    } else {
        $response = $response->withStatus(404);
    }

    $response = addCorsHeaders($response);

    return $response;
});


$app->post('/api/logout', function (Request $request, Response $response, $args) {

    $response = $response->withHeader("Authorization", "deleted");
    $response = $response->withStatus(202);
    $response = addCorsHeaders($response);

    return $response;
});


$app->get('/api/client', function (Request $request, Response $response, $args) {
    global $entityManager;

    $authHeader = $request->getHeader("Authorization");
    $token = preg_split("/[\s,]+/", $authHeader[0])[1];

    $clientRepository = $entityManager->getRepository('Client');
    $client = $clientRepository->findOneBy(array('token' => $token));

    if ($client) {
        $data = array(
            "id" => $client->getId(),
            "nom" => $client->getNom(),
            "prenom" => $client->getPrenom(),
            "email" => $client->getEmail(),
            "login" => $client->getLogin(),
        );
        $response->getBody()->write(json_encode($data));
    } else {
        $response = $response->withStatus(404);
    }


    $response = addCorsHeaders($response);

    return $response;
});


$app->put('/api/client', function (Request $request, Response $response, $args) {
    global $entityManager;

    $authHeader = $request->getHeader("Authorization");
    $token = preg_split("/[\s,]+/", $authHeader[0])[1];

    $body = $request->getParsedBody();

    $clientRepository = $entityManager->getRepository('Client');
    $client = $clientRepository->findOneBy(array('token' => $token));

    if ($client) {
        $client->setNom($body['nom']);
        $client->setPrenom($body['prenom']);
        $client->setEmail($body['email']);
        $client->setLogin($body['login']);

        $entityManager->persist($client);
        $entityManager->flush();

        $response->getBody()->write(json_encode($client));
    } else {
        $response = $response->withStatus(404);
    }

    $response = addCorsHeaders($response);
    return $response;
});


$app->get('/api/catalogue', function (Request $request, Response $response, $args) {
    global $entityManager;

    $produitRepository = $entityManager->getRepository('Produit');
    $produit = $produitRepository->findAll();

    $data = array();

    foreach ($produit as $e) {
        $elem = array(
            "id" => $e->getId(),
            "brand" => $e->getBrand(),
            "name" => $e->getName(),
            "price" => $e->getPrice(),
            "capacity" => $e->getCapacity(),
        );

        array_push($data, $elem);
    }

    $response = $response
        ->withHeader("Content-Type", "application/json;charset=utf-8");

    $response = addCorsHeaders($response);
    $response->getBody()->write(json_encode($data));
    return $response;
});


function addCorsHeaders(Response $response): Response
{

    $response =  $response
        ->withHeader("Access-Control-Allow-Origin", 'https://nfe-trioreau.herokuapp.com')
        ->withHeader("Access-Control-Allow-Headers", 'Content-Type, Authorization')
        ->withHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE,OPTIONS')
        ->withHeader("Access-Control-Expose-Headers", "Authorization");

    return $response;
}

// Chargement du Middleware
$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run();
