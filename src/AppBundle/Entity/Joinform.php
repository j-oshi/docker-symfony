<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Joinform
 *
 * @ORM\Table(name="joinform")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\JoinformRepository")
 */
class Joinform
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
     * @ORM\Column(name="RestaurantName", type="string", length=255)
     */
    private $restaurantName;

    /**
     * @var string
     *
     * @ORM\Column(name="RestaurantAddress", type="string", length=255)
     */
    private $restaurantAddress;

    /**
     * @var string
     *
     * @ORM\Column(name="RestaurantPostcode", type="string", length=255)
     */
    private $restaurantPostcode;

    /**
     * @var string
     *
     * @ORM\Column(name="AfricanCuisine", type="string", length=255)
     */
    private $africanCuisine;

    /**
     * @var string
     *
     * @ORM\Column(name="ContactName", type="string", length=255)
     */
    private $contactName;

    /**
     * @var string
     *
     * @ORM\Column(name="ContactEmail", type="string", length=255, unique=true)
     */
    private $contactEmail;

    /**
     * @var string
     *
     * @ORM\Column(name="ContactTelephone", type="string", length=255)
     */
    private $contactTelephone;

    /**
     * @var string
     *
     * @ORM\Column(name="ContactMessage", type="string", length=255)
     */
    private $contactMessage;
    
    /**
     * @var string
     *
     * @ORM\Column(name="approval", type="string", length=50)
     */
    private $approval;


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
     * Set restaurantName
     *
     * @param string $restaurantName
     *
     * @return Joinform
     */
    public function setRestaurantName($restaurantName)
    {
        $this->restaurantName = $restaurantName;

        return $this;
    }

    /**
     * Get restaurantName
     *
     * @return string
     */
    public function getRestaurantName()
    {
        return $this->restaurantName;
    }

    /**
     * Set restaurantAddress
     *
     * @param string $restaurantAddress
     *
     * @return Joinform
     */
    public function setRestaurantAddress($restaurantAddress)
    {
        $this->restaurantAddress = $restaurantAddress;

        return $this;
    }

    /**
     * Get restaurantAddress
     *
     * @return string
     */
    public function getRestaurantAddress()
    {
        return $this->restaurantAddress;
    }

    /**
     * Set restaurantPostcode
     *
     * @param string $restaurantPostcode
     *
     * @return Joinform
     */
    public function setRestaurantPostcode($restaurantPostcode)
    {
        $this->restaurantPostcode = $restaurantPostcode;

        return $this;
    }

    /**
     * Get restaurantPostcode
     *
     * @return string
     */
    public function getRestaurantPostcode()
    {
        return $this->restaurantPostcode;
    }

    /**
     * Set africanCuisine
     *
     * @param string $africanCuisine
     *
     * @return Joinform
     */
    public function setAfricanCuisine($africanCuisine)
    {
        $this->africanCuisine = $africanCuisine;

        return $this;
    }

    /**
     * Get africanCuisine
     *
     * @return string
     */
    public function getAfricanCuisine()
    {
        return $this->africanCuisine;
    }

    /**
     * Set contactName
     *
     * @param string $contactName
     *
     * @return Joinform
     */
    public function setContactName($contactName)
    {
        $this->contactName = $contactName;

        return $this;
    }

    /**
     * Get contactName
     *
     * @return string
     */
    public function getContactName()
    {
        return $this->contactName;
    }

    /**
     * Set contactEmail
     *
     * @param string $contactEmail
     *
     * @return Joinform
     */
    public function setContactEmail($contactEmail)
    {
        $this->contactEmail = $contactEmail;

        return $this;
    }

    /**
     * Get contactEmail
     *
     * @return string
     */
    public function getContactEmail()
    {
        return $this->contactEmail;
    }

    /**
     * Set contactTelephone
     *
     * @param string $contactTelephone
     *
     * @return Joinform
     */
    public function setContactTelephone($contactTelephone)
    {
        $this->contactTelephone = $contactTelephone;

        return $this;
    }

    /**
     * Get contactTelephone
     *
     * @return string
     */
    public function getContactTelephone()
    {
        return $this->contactTelephone;
    }

    /**
     * Set contactMessage
     *
     * @param string $contactMessage
     *
     * @return Joinform
     */
    public function setContactMessage($contactMessage)
    {
        $this->contactMessage = $contactMessage;

        return $this;
    }

    /**
     * Get contactMessage
     *
     * @return string
     */
    public function getContactMessage()
    {
        return $this->contactMessage;
    }
    
    /**
     * Set approval
     *
     * @param string $approval
     *
     * @return Joinform
     */
    public function setApproval($approval)
    {
        $this->approval = $approval;

        return $this;
    }

    /**
     * Get approval
     *
     * @return string
     */
    public function getapproval()
    {
        return $this->approval;
    }
}

