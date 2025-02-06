<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PrescriptionMedicamentsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date_prescription = null;

    #[ORM\ManyToOne(inversedBy: 'prescriptionMedicaments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Medecin $prescripteur = null;

    #[ORM\OneToMany(mappedBy: 'prescription', targetEntity: MedicamentPrescrit::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $medicamentsPrescrits;

    public function __construct()
    {
        $this->medicamentsPrescrits = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, MedicamentPrescrit>
     */
    public function getMedicamentsPrescrits(): Collection
    {
        return $this->medicamentsPrescrits;
    }

    public function addMedicamentPrescrit(MedicamentPrescrit $medicamentPrescrit): static
    {
        if (!$this->medicamentsPrescrits->contains($medicamentPrescrit)) {
            $this->medicamentsPrescrits->add($medicamentPrescrit);
            $medicamentPrescrit->setPrescription($this);
        }

        return $this;
    }

    public function removeMedicamentPrescrit(MedicamentPrescrit $medicamentPrescrit): static
    {
        if ($this->medicamentsPrescrits->removeElement($medicamentPrescrit)) {
            // set the owning side to null (unless already changed)
            if ($medicamentPrescrit->getPrescription() === $this) {
                $medicamentPrescrit->setPrescription(null);
            }
        }

        return $this;
    }
}