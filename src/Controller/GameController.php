<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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

        return $this->render(
            'Game/guest.html.twig'
        );
    }
}