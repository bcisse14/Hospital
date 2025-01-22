<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\BiologieRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BiologieRepository::class)]
#[ApiResource]
class Biologie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'biologies')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Patient $patient = null;

    #[ORM\Column(length: 100)]
    private ?string $type_examen = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $resultat = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_examen = null;

    #[ORM\ManyToOne(inversedBy: 'biologies')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $technicien = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $commentaires = null;

    #[ORM\Column(length: 100)]
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

    public function getTypeExamen(): ?string
    {
        return $this->type_examen;
    }

    public function setTypeExamen(string $type_examen): static
    {
        $this->type_examen = $type_examen;

        return $this;
    }

    public function getResultat(): ?string
    {
        return $this->resultat;
    }

    public function setResultat(?string $resultat): static
    {
        $this->resultat = $resultat;

        return $this;
    }

    public function getDateExamen(): ?\DateTimeInterface
    {
        return $this->date_examen;
    }

    public function setDateExamen(\DateTimeInterface $date_examen): static
    {
        $this->date_examen = $date_examen;

        return $this;
    }

    public function getTechnicien(): ?User
    {
        return $this->technicien;
    }

    public function setTechnicien(?User $technicien): static
    {
        $this->technicien = $technicien;

        return $this;
    }

    public function getCommentaires(): ?string
    {
        return $this->commentaires;
    }

    public function setCommentaires(?string $commentaires): static
    {
        $this->commentaires = $commentaires;

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
