<?php

namespace App\Repository;

use App\Entity\GameInfo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method GameInfo|null find($id, $lockMode = null, $lockVersion = null)
 * @method GameInfo|null findOneBy(array $criteria, array $orderBy = null)
 * @method GameInfo[]    findAll()
 * @method GameInfo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameInfoRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, GameInfo::class);
    }

    // /**
    //  * @return GameInfo[] Returns an array of GameInfo objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?GameInfo
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
