<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Radiologie;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;

class RadiologieDataPersister implements ContextAwareDataPersisterInterface
{
    private $entityManager;
    private $slugger;
    private $uploadsDirectory;

    public function __construct(EntityManagerInterface $entityManager, SluggerInterface $slugger, $uploadsDirectory)
    {
        $this->entityManager = $entityManager;
        $this->slugger = $slugger;
        $this->uploadsDirectory = $uploadsDirectory;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Radiologie;
    }

    public function persist($data, array $context = [])
    {
        if ($data->getImageFile() instanceof UploadedFile) {
            $originalFilename = pathinfo($data->getImageFile()->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $this->slugger->slug($originalFilename);
            $newFilename = $safeFilename.'-'.uniqid().'.'.$data->getImageFile()->guessExtension();

            $data->getImageFile()->move(
                $this->uploadsDirectory,
                $newFilename
            );

            $data->setImages($newFilename);
        }

        $this->entityManager->persist($data);
        $this->entityManager->flush();
    }

    public function remove($data, array $context = [])
    {
        $this->entityManager->remove($data);
        $this->entityManager->flush();
    }
}