<?php


namespace App\Controller;


use App\Entity\GameInfo;
use App\Entity\GameLog;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
    public function saveGameLog(Request $request){
        $entityManager = $this->getDoctrine()->getManager();
        $gameLog = new GameLog();

        $tmp_gameLog = $request->get('gameLog');
        if(isset($tmp_gameLog['id'])){
            unset($tmp_gameLog['id']);
        }

        foreach ($tmp_gameLog as $prop => $value){
            $method = sprintf('set%s', ucwords($prop));

            $gameLog->$method($value);
        }

        $entityManager->persist($gameLog);
        $entityManager->flush();

        $response = new JsonResponse(['status' => 'saved']);
        return $response;
    }

    /**
     * @Route("/getLastStep/{gameInfoId}", name="getLastStep")
     */
    public function getLastStep($gameInfoId){
        $serializer = $this->container->get('serializer');
        $lastStep = $this->getDoctrine()
            ->getRepository(GameLog::class)
            ->getLastStep($gameInfoId);

        return new JsonResponse($serializer->serialize($lastStep, 'json'));
    }
}