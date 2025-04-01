<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\BebeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BebeRepository::class)]
#[ApiResource]
class Bebe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $prenom = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_naissance = null;

    #[ORM\Column(length: 255)]
    private ?string $sexe = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $numero_dossier = null;

    #[ORM\ManyToOne(targetEntity: Patient::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?Patient $mere = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getDateNaissance(): ?\DateTimeInterface
    {
        return $this->date_naissance;
    }

    public function setDateNaissance(\DateTimeInterface $date_naissance): static
    {
        $this->date_naissance = $date_naissance;

        return $this;
    }

    public function getSexe(): ?string
    {
        return $this->sexe;
    }

    public function setSexe(string $sexe): static
    {
        $this->sexe = $sexe;

        return $this;
    }

    public function getNumeroDossier(): ?string
    {
        return $this->numero_dossier;
    }

    public function setNumeroDossier(?string $numero_dossier): static
    {
        $this->numero_dossier = $numero_dossier;

        return $this;
    }

    public function getMere(): ?Patient
    {
        return $this->mere;
    }

    public function setMere(?Patient $mere): static
    {
        $this->mere = $mere;

        return $this;
    }
}