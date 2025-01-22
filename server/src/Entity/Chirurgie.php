<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ChirurgieRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ChirurgieRepository::class)]
#[ApiResource]
class Chirurgie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'chirurgies')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Patient $patient = null;

    #[ORM\Column(length: 100)]
    private ?string $type_chirurgie = null;

    #[ORM\ManyToOne(inversedBy: 'chirurgies')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Medecin $chirurgien = null;

    #[ORM\OneToOne(inversedBy: 'chirurgie', cascade: ['persist', 'remove'])]
    private ?BlocOperatoire $bloc = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $heure_debut = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $heure_fin = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $notes = null;


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

    public function getTypeChirurgie(): ?string
    {
        return $this->type_chirurgie;
    }

    public function setTypeChirurgie(string $type_chirurgie): static
    {
        $this->type_chirurgie = $type_chirurgie;

        return $this;
    }

    public function getChirurgien(): ?Medecin
    {
        return $this->chirurgien;
    }

    public function setChirurgien(?Medecin $chirurgien): static
    {
        $this->chirurgien = $chirurgien;

        return $this;
    }

    public function getBloc(): ?BlocOperatoire
    {
        return $this->bloc;
    }

    public function setBloc(?BlocOperatoire $bloc): static
    {
        $this->bloc = $bloc;

        return $this;
    }

    public function getHeureDebut(): ?\DateTimeInterface
    {
        return $this->heure_debut;
    }

    public function setHeureDebut(\DateTimeInterface $heure_debut): static
    {
        $this->heure_debut = $heure_debut;

        return $this;
    }

    public function getHeureFin(): ?\DateTimeInterface
    {
        return $this->heure_fin;
    }

    public function setHeureFin(?\DateTimeInterface $heure_fin): static
    {
        $this->heure_fin = $heure_fin;

        return $this;
    }

    public function getNotes(): ?string
    {
        return $this->notes;
    }

    public function setNotes(?string $notes): static
    {
        $this->notes = $notes;

        return $this;
    }

}
