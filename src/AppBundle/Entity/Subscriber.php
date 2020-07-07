<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Subscriber
 *
 * @ORM\Table(name="subscriber")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SubscriberRepository")
 */
class Subscriber
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="Name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="Email", type="string", length=255)
     */
    private $email;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="TimeOfSubscription", type="datetime")
     */
    private $timeOfSubscription;

    /**
     * @var string
     *
     * @ORM\Column(name="Unsubscribe", type="string", length=255)
     */
    private $unsubscribe;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Subscriber
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set email
     *
     * @param string $email
     *
     * @return Subscriber
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set timeOfSubscription
     *
     * @param \DateTime $timeOfSubscription
     *
     * @return Subscriber
     */
    public function setTimeOfSubscription($timeOfSubscription)
    {
        $this->timeOfSubscription = $timeOfSubscription;

        return $this;
    }

    /**
     * Get timeOfSubscription
     *
     * @return \DateTime
     */
    public function getTimeOfSubscription()
    {
        return $this->timeOfSubscription;
    }

    /**
     * Set unsubscribe
     *
     * @param string $unsubscribe
     *
     * @return Subscriber
     */
    public function setUnsubscribe($unsubscribe)
    {
        $this->unsubscribe = $unsubscribe;

        return $this;
    }

    /**
     * Get unsubscribe
     *
     * @return string
     */
    public function getUnsubscribe()
    {
        return $this->unsubscribe;
    }
}

