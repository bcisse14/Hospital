<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UrgenceRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UrgenceRepository::class)]
#[ApiResource]
class Urgence
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'urgences')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Patient $patient = null;

    #[Assert\NotNull(message: "L'heure d'arrivée est obligatoire.")]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $heure_arrivee = null;

    #[ORM\Column(length: 255)]
    private ?string $etape_actuelle = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $etape_suivante = null;

    #[ORM\Column(length: 255)]
    private ?string $statut = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $heure_sortie = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPatient(): ?Patient
    {
        return $this->patient;
    }

    public function setPatient(?Patient $patient): static
    {
        $this->patient = $patient;

        return $this;
    }

    public function getHeureArrivee(): ?\DateTimeInterface
    {
        return $this->heure_arrivee;
    }

    public function setHeureArrivee(\DateTimeInterface $heure_arrivee): static
    {
        $this->heure_arrivee = $heure_arrivee;

        return $this;
    }

    public function getEtapeActuelle(): ?string
    {
        return $this->etape_actuelle;
    }

    public function setEtapeActuelle(string $etape_actuelle): static
    {
        $this->etape_actuelle = $etape_actuelle;

        return $this;
    }

    public function getEtapeSuivante(): ?string
    {
        return $this->etape_suivante;
    }

    public function setEtapeSuivante(?string $etape_suivante): static
    {
        $this->etape_suivante = $etape_suivante;

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): static
    {
        $this->statut = $statut;

        return $this;
    }

    public function getHeureSortie(): ?\DateTimeInterface
    {
        return $this->heure_sortie;
    }

    public function setHeureSortie(?\DateTimeInterface $heure_sortie): static
    {
        $this->heure_sortie = $heure_sortie;

        return $this;
    }
}
