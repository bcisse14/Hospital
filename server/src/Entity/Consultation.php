<?php

namespace App\Entity;

use App\Repository\ConsultationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ConsultationRepository::class)]
class Consultation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'consultations')]
    #[ORM\JoinColumn(nullable: false, onDelete: "CASCADE")]    
    private ?Patient $patient = null;

    #[ORM\ManyToOne(inversedBy: 'consultations')]
    #[ORM\JoinColumn(nullable: false, onDelete: "CASCADE")]    
    private ?Medecin $medecin = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_consultation = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $diagnostique = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $traitement = null;

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

    public function getDateConsultation(): ?\DateTimeInterface
    {
        return $this->date_consultation;
    }

    public function setDateConsultation(\DateTimeInterface $date_consultation): static
    {
        $this->date_consultation = $date_consultation;

        return $this;
    }

    public function getDiagnostique(): ?string
    {
        return $this->diagnostique;
    }

    public function setDiagnostique(?string $diagnostique): static
    {
        $this->diagnostique = $diagnostique;

        return $this;
    }

    public function getTraitement(): ?string
    {
        return $this->traitement;
    }

    public function setTraitement(?string $traitement): static
    {
        $this->traitement = $traitement;

        return $this;
    }
}
