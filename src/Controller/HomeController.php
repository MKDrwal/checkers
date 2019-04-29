<?php


namespace App\Controller;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function showWelcomePage() {

        return $this->render(
          'home/welcome.html.twig'
        );
    }
}