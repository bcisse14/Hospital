<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MaterniteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MaterniteRepository::class)]
#[ApiResource]
class Maternite
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'accouchements')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Patient $mere = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_accouchement = null;

    #[ORM\Column(length: 255)]
    private ?string $type_accouchement = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $notes = null;

    #[ORM\ManyToMany(targetEntity: Bebe::class, inversedBy: 'maternites')]
    private Collection $bebes;

    public function __construct()
    {
        $this->bebes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getDateAccouchement(): ?\DateTimeInterface
    {
        return $this->date_accouchement;
    }

    public function setDateAccouchement(\DateTimeInterface $date_accouchement): static
    {
        $this->date_accouchement = $date_accouchement;

        return $this;
    }

    public function getTypeAccouchement(): ?string
    {
        return $this->type_accouchement;
    }

    public function setTypeAccouchement(string $type_accouchement): static
    {
        $this->type_accouchement = $type_accouchement;

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

    /**
     * @return Collection<int, Bebe>
     */
    public function getBebes(): Collection
    {
        return $this->bebes;
    }

    public function addBebe(Bebe $bebe): static
    {
        if (!$this->bebes->contains($bebe)) {
            $this->bebes->add($bebe);
        }

        return $this;
    }

    public function removeBebe(Bebe $bebe): static
    {
        $this->bebes->removeElement($bebe);

        return $this;
    }
}