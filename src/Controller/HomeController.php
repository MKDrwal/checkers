<?php


namespace App\Controller;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    /**
     * @Route("/")
     */
    public function showWelcomePage() {

        return $this->render(
          'template/board.html.twig'
        );
    }
}