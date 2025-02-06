<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource; 
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Pharmacie;
use App\Entity\PrescriptionMedicaments;

#[ApiResource]
#[ORM\Entity]
class MedicamentPrescrit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: PrescriptionMedicaments::class, inversedBy: 'medicamentsPrescrits')]
    #[ORM\JoinColumn(nullable: false)]
    private ?PrescriptionMedicaments $prescription = null;

    #[ORM\ManyToOne(targetEntity: Pharmacie::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?Pharmacie $medicament = null;

    #[ORM\Column(length: 100)]
    private ?string $dose = null;

    #[ORM\Column(length: 255)]
    private ?string $frequence = null;

    // Getters and setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrescription(): ?PrescriptionMedicaments
    {
        return $this->prescription;
    }

    public function setPrescription(?PrescriptionMedicaments $prescription): self
    {
        $this->prescription = $prescription;
        return $this;
    }

    public function getMedicament(): ?Pharmacie
    {
        return $this->medicament;
    }

    public function setMedicament(?Pharmacie $medicament): self
    {
        $this->medicament = $medicament;
        return $this;
    }

    public function getDose(): ?string
    {
        return $this->dose;
    }

    public function setDose(string $dose): self
    {
        $this->dose = $dose;
        return $this;
    }

    public function getFrequence(): ?string
    {
        return $this->frequence;
    }

    public function setFrequence(string $frequence): self
    {
        $this->frequence = $frequence;
        return $this;
    }
}
