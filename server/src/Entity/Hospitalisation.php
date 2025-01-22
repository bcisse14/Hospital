<?php
namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\HospitalisationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: HospitalisationRepository::class)]
#[ApiResource]
class Hospitalisation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'hospitalisations')]
    #[ORM\JoinColumn(nullable: false, onDelete: "CASCADE")]
    private ?Patient $patient = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $date_entree = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $date_sortie = null;

    #[ORM\Column(length: 10)]
    private ?string $chambre = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $remarques = null;

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

    public function getDateEntree(): ?\DateTimeInterface
    {
        return $this->date_entree;
    }

    public function setDateEntree(?\DateTimeInterface $date_entree): static
    {
        $this->date_entree = $date_entree;

        return $this;
    }

    public function getDateSortie(): ?\DateTimeInterface
    {
        return $this->date_sortie;
    }

    public function setDateSortie(?\DateTimeInterface $date_sortie): static
    {
        $this->date_sortie = $date_sortie;

        return $this;
    }

    public function getChambre(): ?string
    {
        return $this->chambre;
    }

    public function setChambre(string $chambre): static
    {
        $this->chambre = $chambre;

        return $this;
    }

    public function getRemarques(): ?string
    {
        return $this->remarques;
    }

    public function setRemarques(?string $remarques): static
    {
        $this->remarques = $remarques;

        return $this;
    }
}
