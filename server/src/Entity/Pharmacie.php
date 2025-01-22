<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PharmacieRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PharmacieRepository::class)]
#[ApiResource]
class Pharmacie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 200)]
    private ?string $medicament = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $stock = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date_peremption = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $numero_lot = null;

    #[ORM\Column(length: 150, nullable: true)]
    private ?string $emplacement = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMedicament(): ?string
    {
        return $this->medicament;
    }

    public function setMedicament(string $medicament): static
    {
        $this->medicament = $medicament;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): static
    {
        $this->stock = $stock;

        return $this;
    }

    public function getDatePeremption(): ?\DateTimeInterface
    {
        return $this->date_peremption;
    }

    public function setDatePeremption(\DateTimeInterface $date_peremption): static
    {
        $this->date_peremption = $date_peremption;

        return $this;
    }

    public function getNumeroLot(): ?string
    {
        return $this->numero_lot;
    }

    public function setNumeroLot(?string $numero_lot): static
    {
        $this->numero_lot = $numero_lot;

        return $this;
    }

    public function getEmplacement(): ?string
    {
        return $this->emplacement;
    }

    public function setEmplacement(?string $emplacement): static
    {
        $this->emplacement = $emplacement;

        return $this;
    }
}
