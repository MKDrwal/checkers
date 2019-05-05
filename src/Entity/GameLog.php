<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GameLogRepository")
 */
class GameLog
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="smallint")
     */
    private $step;

    /**
     * @ORM\Column(type="string", length=6)
     */
    private $nextTurn;

    /**
     * @ORM\Column(type="smallint")
     */
    private $pointsFirst;

    /**
     * @ORM\Column(type="smallint")
     */
    private $pointsSecond;

    /**
     * @ORM\Column(type="json_array")
     */
    private $board;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStep(): ?int
    {
        return $this->step;
    }

    public function setStep(int $step): self
    {
        $this->step = $step;

        return $this;
    }

    public function getNextTurn(): ?string
    {
        return $this->nextTurn;
    }

    public function setNextTurn(string $nextTurn): self
    {
        $this->nextTurn = $nextTurn;

        return $this;
    }

    public function getPointsFirst(): ?int
    {
        return $this->pointsFirst;
    }

    public function setPointsFirst(int $pointsFirst): self
    {
        $this->pointsFirst = $pointsFirst;

        return $this;
    }

    public function getPointsSecond(): ?int
    {
        return $this->pointsSecond;
    }

    public function setPointsSecond(int $pointsSecond): self
    {
        $this->pointsSecond = $pointsSecond;

        return $this;
    }

    public function getBoard()
    {
        return $this->board;
    }

    public function setBoard($board): self
    {
        $this->board = $board;

        return $this;
    }
}
