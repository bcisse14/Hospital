<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PrescriptionMedicamentsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PrescriptionMedicamentsRepository::class)]
#[ApiResource]
class PrescriptionMedicaments
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'prescriptionMedicaments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Patient $patient = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Pharmacie $medicament = null;

    #[ORM\Column(length: 100)]
    private ?string $dose = null;

    #[ORM\Column(length: 255)]
    private ?string $frequence = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date_prescription = null;

    #[ORM\ManyToOne(inversedBy: 'prescriptionMedicaments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Medecin $prescripteur = null;

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

    public function getMedicament(): ?Pharmacie
    {
        return $this->medicament;
    }

    public function setMedicament(?Pharmacie $medicament): static
    {
        $this->medicament = $medicament;

        return $this;
    }

    public function getDose(): ?string
    {
        return $this->dose;
    }

    public function setDose(string $dose): static
    {
        $this->dose = $dose;

        return $this;
    }

    public function getFrequence(): ?string
    {
        return $this->frequence;
    }

    public function setFrequence(string $frequence): static
    {
        $this->frequence = $frequence;

        return $this;
    }

    public function getDatePrescription(): ?\DateTimeInterface
    {
        return $this->date_prescription;
    }

    public function setDatePrescription(\DateTimeInterface $date_prescription): static
    {
        $this->date_prescription = $date_prescription;

        return $this;
    }

    public function getPrescripteur(): ?Medecin
    {
        return $this->prescripteur;
    }

    public function setPrescripteur(?Medecin $prescripteur): static
    {
        $this->prescripteur = $prescripteur;

        return $this;
    }
}
