<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GameInfoRepository")
 */
class GameInfo
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $first_player;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $second_player;

    /**
     * @ORM\Column(type="datetime")
     */
    private $create_date;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $change_date;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $end_date;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     */
    private $win;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstPlayer(): ?string
    {
        return $this->first_player;
    }

    public function setFirstPlayer(?string $first_player): self
    {
        $this->first_player = $first_player;

        return $this;
    }

    public function getSecondPlayer(): ?string
    {
        return $this->second_player;
    }

    public function setSecondPlayer(?string $second_player): self
    {
        $this->second_player = $second_player;

        return $this;
    }

    public function getCreateDate(): ?\DateTimeInterface
    {
        return $this->create_date;
    }

    public function setCreateDate(?\DateTimeInterface $create_date): self
    {
        $this->create_date = $create_date;

        return $this;
    }

    public function getChangeDate(): ?\DateTimeInterface
    {
        return $this->change_date;
    }

    public function setChangeDate(?\DateTimeInterface $change_date): self
    {
        $this->change_date = $change_date;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->end_date;
    }

    public function setEndDate(?\DateTimeInterface $end_date): self
    {
        $this->end_date = $end_date;

        return $this;
    }

    public function getWin(): ?int
    {
        return $this->win;
    }

    public function setWin(?int $win): self
    {
        $this->win = $win;

        return $this;
    }
}
