<?php


namespace App\Controller;


use App\Entity\GameInfo;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/game")
 * */
class GameController extends AbstractController
{
    /**
     * @Route("/guest", name="gameGuestBoard")
     */
    public function showGuestBoard(){
        $entityManager = $this->getDoctrine()->getManager();
        $serializer = $this->container->get('serializer');

        if(isset($_COOKIE['gameinfo'])) {
            $game = $serializer->deserialize($_COOKIE['gameinfo'], GameInfo::class, 'json');
        } else {
            $game = new GameInfo();
            $entityManager->persist($game);
            $entityManager->flush();

            setcookie('gameinfo', $serializer->serialize($game, 'json'), time() + 3600 * 24 * 30);
        }

        return $this->render(
            'Game/guest.html.twig',
            [
                'game' => $game,
            ]
        );
    }

    /**
     * @Route("/saveLog", name="gameSaveLog")
     */
    public function saveGameLog(){
        $response = new JsonResponse(['status' => 'saved']);

        return $response;
    }
}