<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UrgenceRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UrgenceRepository::class)]
#[ApiResource]
class Urgence
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'urgence', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Patient $patient = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPatient(): ?Patient
    {
        return $this->patient;
    }

    public function setPatient(Patient $patient): static
    {
        $this->patient = $patient;

        return $this;
    }
}
