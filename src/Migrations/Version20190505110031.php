<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190505110031 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE game_info CHANGE first_player first_player VARCHAR(255) DEFAULT NULL, CHANGE second_player second_player VARCHAR(255) DEFAULT NULL, CHANGE change_date change_date DATETIME DEFAULT NULL, CHANGE end_date end_date DATETIME DEFAULT NULL, CHANGE win win SMALLINT DEFAULT NULL');
        $this->addSql('ALTER TABLE game_log ADD game_info_id INT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE game_info CHANGE first_player first_player VARCHAR(255) DEFAULT \'NULL\' COLLATE utf8mb4_unicode_ci, CHANGE second_player second_player VARCHAR(255) DEFAULT \'NULL\' COLLATE utf8mb4_unicode_ci, CHANGE change_date change_date DATETIME DEFAULT \'NULL\', CHANGE end_date end_date DATETIME DEFAULT \'NULL\', CHANGE win win SMALLINT DEFAULT NULL');
        $this->addSql('ALTER TABLE game_log DROP game_info_id');
    }
}
