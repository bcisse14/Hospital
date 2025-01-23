<?php
namespace App\Entity;

use App\Repository\PatientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiProperty;

#[ORM\Entity(repositoryClass: PatientRepository::class)]
#[ApiResource]
class Patient
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $nom = null;

    #[ORM\Column(length: 100)]
    private ?string $prenom = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date_naissance = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $adresse = null;

    #[ORM\Column(length: 15)]
    private ?string $telephone = null;

    #[ORM\Column(length: 50)]
    private ?string $num_secu_social = null;

    #[ORM\Column(type: "string", length: 10)]
    #[Assert\Choice(choices: ["Femme", "Homme"], message: "Choisissez un sexe valide.")]
    private ?string $sexe = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, options: ["default" => "CURRENT_TIMESTAMP"])]
    private ?\DateTimeInterface $date_enregistrement = null;

    /**
     * @var Collection<int, Consultation>
     */
    #[ORM\OneToMany(targetEntity: Consultation::class, mappedBy: 'patient')]
    #[ApiProperty(readable: true, writable: false)]
    private Collection $consultations;

    /**
     * @var Collection<int, RendezVous>
     */
    #[ORM\OneToMany(targetEntity: RendezVous::class, mappedBy: 'patient')]
    #[ApiProperty(readable: true, writable: false)]
    private Collection $rendezVous;

    /**
     * @var Collection<int, Hospitalisation>
     */
    #[ORM\OneToMany(targetEntity: Hospitalisation::class, mappedBy: 'patient')]
    #[ApiProperty(readable: true, writable: false)]
    private Collection $hospitalisations;

    /**
     * @var Collection<int, Biologie>
     */
    #[ORM\OneToMany(targetEntity: Biologie::class, mappedBy: 'patient')]
    private Collection $biologies;

    /**
     * @var Collection<int, Chirurgie>
     */
    #[ORM\OneToMany(targetEntity: Chirurgie::class, mappedBy: 'patient')]
    private Collection $chirurgies;

    /**
     * @var Collection<int, PrescriptionMedicaments>
     */
    #[ORM\OneToMany(targetEntity: PrescriptionMedicaments::class, mappedBy: 'patient')]
    private Collection $prescriptionMedicaments;


    /**
     * @var Collection<int, Gynecologie>
     */
    #[ORM\OneToMany(targetEntity: Gynecologie::class, mappedBy: 'patient')]
    private Collection $gynecologies;

    /**
     * @var Collection<int, Radiologie>
     */
    #[ORM\OneToMany(targetEntity: Radiologie::class, mappedBy: 'patient')]
    private Collection $radiologies;

    /**
     * @var Collection<int, Maternite>
     */
    #[ORM\OneToMany(targetEntity: Maternite::class, mappedBy: 'mere')]
    private Collection $accouchements;

    /**
     * @var Collection<int, Urgence>
     */
    #[ORM\OneToMany(targetEntity: Urgence::class, mappedBy: 'patient')]
    private Collection $urgences;




    public function __construct()
    {
        $this->consultations = new ArrayCollection();
        $this->rendezVous = new ArrayCollection();
        $this->hospitalisations = new ArrayCollection();
        $this->biologies = new ArrayCollection();
        $this->chirurgies = new ArrayCollection();
        $this->prescriptionMedicaments = new ArrayCollection();
        $this->gynecologies = new ArrayCollection();
        $this->radiologies = new ArrayCollection();
        $this->accouchements = new ArrayCollection();
        $this->urgences = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getDateNaissance(): ?\DateTimeInterface
    {
        return $this->date_naissance;
    }

    public function setDateNaissance(\DateTimeInterface $date_naissance): static
    {
        // Si la date est de type DateTimeImmutable, convertissez-la en DateTime
        $this->date_naissance = $date_naissance instanceof \DateTimeImmutable
            ? \DateTime::createFromImmutable($date_naissance)
            : $date_naissance;
    
        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): static
    {
        $this->adresse = $adresse;
        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(string $telephone): static
    {
        $this->telephone = $telephone;
        return $this;
    }

    public function getNumSecuSocial(): ?string
    {
        return $this->num_secu_social;
    }

    public function setNumSecuSocial(string $num_secu_social): static
    {
        $this->num_secu_social = $num_secu_social;
        return $this;
    }

    public function getSexe(): ?string
    {
        return $this->sexe;
    }

    public function setSexe(string $sexe): static
    {
        $this->sexe = $sexe;
        return $this;
    }

    public function getDateEnregistrement(): ?\DateTimeInterface
    {
        return $this->date_enregistrement;
    }

    public function setDateEnregistrement(\DateTimeInterface $date_enregistrement): static
    {
        // Si la date est de type DateTimeImmutable, convertissez-la en DateTime
        $this->date_enregistrement = $date_enregistrement instanceof \DateTimeImmutable
            ? \DateTime::createFromImmutable($date_enregistrement)
            : $date_enregistrement;
    
        return $this;
    }

    /**
     * @return Collection<int, Consultation>
     */
    public function getConsultations(): Collection
    {
        return $this->consultations;
    }

    public function addConsultation(Consultation $consultation): static
    {
        if (!$this->consultations->contains($consultation)) {
            $this->consultations->add($consultation);
            $consultation->setPatient($this);
        }

        return $this;
    }

    public function removeConsultation(Consultation $consultation): static
    {
        if ($this->consultations->removeElement($consultation)) {
            // set the owning side to null (unless already changed)
            if ($consultation->getPatient() === $this) {
                $consultation->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, RendezVous>
     */
    public function getRendezVous(): Collection
    {
        return $this->rendezVous;
    }

    public function addRendezVou(RendezVous $rendezVou): static
    {
        if (!$this->rendezVous->contains($rendezVou)) {
            $this->rendezVous->add($rendezVou);
            $rendezVou->setPatient($this);
        }

        return $this;
    }

    public function removeRendezVou(RendezVous $rendezVou): static
    {
        if ($this->rendezVous->removeElement($rendezVou)) {
            // set the owning side to null (unless already changed)
            if ($rendezVou->getPatient() === $this) {
                $rendezVou->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Hospitalisation>
     */
    public function getHospitalisations(): Collection
    {
        return $this->hospitalisations;
    }

    public function addHospitalisation(Hospitalisation $hospitalisation): static
    {
        if (!$this->hospitalisations->contains($hospitalisation)) {
            $this->hospitalisations->add($hospitalisation);
            $hospitalisation->setPatient($this);
        }

        return $this;
    }

    public function removeHospitalisation(Hospitalisation $hospitalisation): static
    {
        if ($this->hospitalisations->removeElement($hospitalisation)) {
            // set the owning side to null (unless already changed)
            if ($hospitalisation->getPatient() === $this) {
                $hospitalisation->setPatient(null);
            }
        }

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
            $biology->setPatient($this);
        }

        return $this;
    }

    public function removeBiology(Biologie $biology): static
    {
        if ($this->biologies->removeElement($biology)) {
            // set the owning side to null (unless already changed)
            if ($biology->getPatient() === $this) {
                $biology->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Chirurgie>
     */
    public function getChirurgies(): Collection
    {
        return $this->chirurgies;
    }

    public function addChirurgy(Chirurgie $chirurgy): static
    {
        if (!$this->chirurgies->contains($chirurgy)) {
            $this->chirurgies->add($chirurgy);
            $chirurgy->setPatient($this);
        }

        return $this;
    }

    public function removeChirurgy(Chirurgie $chirurgy): static
    {
        if ($this->chirurgies->removeElement($chirurgy)) {
            // set the owning side to null (unless already changed)
            if ($chirurgy->getPatient() === $this) {
                $chirurgy->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PrescriptionMedicaments>
     */
    public function getPrescriptionMedicaments(): Collection
    {
        return $this->prescriptionMedicaments;
    }

    public function addPrescriptionMedicament(PrescriptionMedicaments $prescriptionMedicament): static
    {
        if (!$this->prescriptionMedicaments->contains($prescriptionMedicament)) {
            $this->prescriptionMedicaments->add($prescriptionMedicament);
            $prescriptionMedicament->setPatient($this);
        }

        return $this;
    }

    public function removePrescriptionMedicament(PrescriptionMedicaments $prescriptionMedicament): static
    {
        if ($this->prescriptionMedicaments->removeElement($prescriptionMedicament)) {
            // set the owning side to null (unless already changed)
            if ($prescriptionMedicament->getPatient() === $this) {
                $prescriptionMedicament->setPatient(null);
            }
        }

        return $this;
    }


    /**
     * @return Collection<int, Gynecologie>
     */
    public function getGynecologies(): Collection
    {
        return $this->gynecologies;
    }

    public function addGynecology(Gynecologie $gynecology): static
    {
        if (!$this->gynecologies->contains($gynecology)) {
            $this->gynecologies->add($gynecology);
            $gynecology->setPatient($this);
        }

        return $this;
    }

    public function removeGynecology(Gynecologie $gynecology): static
    {
        if ($this->gynecologies->removeElement($gynecology)) {
            // set the owning side to null (unless already changed)
            if ($gynecology->getPatient() === $this) {
                $gynecology->setPatient(null);
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
            $radiology->setPatient($this);
        }

        return $this;
    }

    public function removeRadiology(Radiologie $radiology): static
    {
        if ($this->radiologies->removeElement($radiology)) {
            // set the owning side to null (unless already changed)
            if ($radiology->getPatient() === $this) {
                $radiology->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Maternite>
     */
    public function getAccouchements(): Collection
    {
        return $this->accouchements;
    }

    public function addAccouchement(Maternite $accouchement): static
    {
        if (!$this->accouchements->contains($accouchement)) {
            $this->accouchements->add($accouchement);
            $accouchement->setMere($this);
        }

        return $this;
    }

    public function removeAccouchement(Maternite $accouchement): static
    {
        if ($this->accouchements->removeElement($accouchement)) {
            // set the owning side to null (unless already changed)
            if ($accouchement->getMere() === $this) {
                $accouchement->setMere(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Urgence>
     */
    public function getUrgences(): Collection
    {
        return $this->urgences;
    }

    public function addUrgence(Urgence $urgence): static
    {
        if (!$this->urgences->contains($urgence)) {
            $this->urgences->add($urgence);
            $urgence->setPatient($this);
        }

        return $this;
    }

    public function removeUrgence(Urgence $urgence): static
    {
        if ($this->urgences->removeElement($urgence)) {
            // set the owning side to null (unless already changed)
            if ($urgence->getPatient() === $this) {
                $urgence->setPatient(null);
            }
        }

        return $this;
    }

}
