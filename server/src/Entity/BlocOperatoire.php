<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\BlocOperatoireRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BlocOperatoireRepository::class)]
#[ApiResource]
class BlocOperatoire
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 20)]
    private ?string $numero_bloc = null;

    #[ORM\Column(length: 100)]
    private ?string $statut = null;

    #[ORM\OneToOne(mappedBy: 'bloc', cascade: ['persist', 'remove'])]
    private ?Chirurgie $chirurgie = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumeroBloc(): ?string
    {
        return $this->numero_bloc;
    }

    public function setNumeroBloc(string $numero_bloc): static
    {
        $this->numero_bloc = $numero_bloc;

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

    public function getChirurgie(): ?Chirurgie
    {
        return $this->chirurgie;
    }

    public function setChirurgie(?Chirurgie $chirurgie): static
    {
        // unset the owning side of the relation if necessary
        if ($chirurgie === null && $this->chirurgie !== null) {
            $this->chirurgie->setBloc(null);
        }

        // set the owning side of the relation if necessary
        if ($chirurgie !== null && $chirurgie->getBloc() !== $this) {
            $chirurgie->setBloc($this);
        }

        $this->chirurgie = $chirurgie;

        return $this;
    }
}
