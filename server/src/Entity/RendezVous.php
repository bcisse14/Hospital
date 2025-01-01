<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\RendezVousRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RendezVousRepository::class)]
class RendezVous
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'rendezVous')]
    #[ORM\JoinColumn(nullable: false, onDelete: "CASCADE")]
    private ?Patient $patient = null;

    #[ORM\ManyToOne(inversedBy: 'rendezVous')]
    #[ORM\JoinColumn(nullable: false, onDelete: "CASCADE")]
    private ?Medecin $medecin = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_rendezvous = null;

    #[ORM\Column(type: "string", length: 20)]
    #[Assert\Choice(choices: ["en_attente", "confirme", "annule"], message: "Choisissez un statut valide.")]
    private ?string $statut = null;

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

    public function getMedecin(): ?Medecin
    {
        return $this->medecin;
    }

    public function setMedecin(?Medecin $medecin): static
    {
        $this->medecin = $medecin;

        return $this;
    }

    public function getDateRendezvous(): ?\DateTimeInterface
    {
        return $this->date_rendezvous;
    }

    public function setDateRendezvous(\DateTimeInterface $date_rendezvous): static
    {
        $this->date_rendezvous = $date_rendezvous;

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
}
