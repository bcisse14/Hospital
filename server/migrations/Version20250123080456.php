<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250123080456 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE urgence ADD heure_arrivee TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE urgence ADD etape_actuelle VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE urgence ADD etape_suivante VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE urgence ADD statut VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE urgence ADD heure_sortie TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL');
        $this->addSql('ALTER TABLE urgence ALTER patient_id SET NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE urgence DROP heure_arrivee');
        $this->addSql('ALTER TABLE urgence DROP etape_actuelle');
        $this->addSql('ALTER TABLE urgence DROP etape_suivante');
        $this->addSql('ALTER TABLE urgence DROP statut');
        $this->addSql('ALTER TABLE urgence DROP heure_sortie');
        $this->addSql('ALTER TABLE urgence ALTER patient_id DROP NOT NULL');
    }
}
