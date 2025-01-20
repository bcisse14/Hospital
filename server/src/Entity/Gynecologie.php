<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\GynecologieRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GynecologieRepository::class)]
#[ApiResource]
class Gynecologie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'gynecologies')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Patient $patient = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_consultation = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $diagnostic = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $plan_traitement = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $date_suivi = null;

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

    public function getDateConsultation(): ?\DateTimeInterface
    {
        return $this->date_consultation;
    }

    public function setDateConsultation(\DateTimeInterface $date_consultation): static
    {
        $this->date_consultation = $date_consultation;

        return $this;
    }

    public function getDiagnostic(): ?string
    {
        return $this->diagnostic;
    }

    public function setDiagnostic(string $diagnostic): static
    {
        $this->diagnostic = $diagnostic;

        return $this;
    }

    public function getPlanTraitement(): ?string
    {
        return $this->plan_traitement;
    }

    public function setPlanTraitement(?string $plan_traitement): static
    {
        $this->plan_traitement = $plan_traitement;

        return $this;
    }

    public function getDateSuivi(): ?\DateTimeInterface
    {
        return $this->date_suivi;
    }

    public function setDateSuivi(?\DateTimeInterface $date_suivi): static
    {
        $this->date_suivi = $date_suivi;

        return $this;
    }
}
