<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ApiResource]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $email = null;

    #[ORM\Column(length: 100)]
    private ?string $nom = null;

    #[ORM\Column(length: 100)]
    private ?string $prenom = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $password = null;

    /**
     * @var Collection<int, Biologie>
     */
    #[ORM\OneToMany(targetEntity: Biologie::class, mappedBy: 'technicien')]
    private Collection $biologies;

    /**
     * @var Collection<int, Radiologie>
     */
    #[ORM\OneToMany(targetEntity: Radiologie::class, mappedBy: 'technicien')]
    private Collection $radiologies;

    public function __construct()
    {
        $this->biologies = new ArrayCollection();
        $this->radiologies = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
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

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return Collection<int, Biologie>
     */
    public function getBiologies(): Collection
    {
        return $this->biologies;
    }

    public function addBiology(Biologie $biology): static
    {
        if (!$this->biologies->contains($biology)) {
            $this->biologies->add($biology);
            $biology->setTechnicien($this);
        }

        return $this;
    }

    public function removeBiology(Biologie $biology): static
    {
        if ($this->biologies->removeElement($biology)) {
            // set the owning side to null (unless already changed)
            if ($biology->getTechnicien() === $this) {
                $biology->setTechnicien(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Radiologie>
     */
    public function getRadiologies(): Collection
    {
        return $this->radiologies;
    }

    public function addRadiology(Radiologie $radiology): static
    {
        if (!$this->radiologies->contains($radiology)) {
            $this->radiologies->add($radiology);
            $radiology->setTechnicien($this);
        }

        return $this;
    }

    public function removeRadiology(Radiologie $radiology): static
    {
        if ($this->radiologies->removeElement($radiology)) {
            // set the owning side to null (unless already changed)
            if ($radiology->getTechnicien() === $this) {
                $radiology->setTechnicien(null);
            }
        }

        return $this;
    }

}