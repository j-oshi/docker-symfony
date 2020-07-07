<?php

// src/AppBundle/Controller/RegistrationController.php
namespace AppBundle\Controller;

use AppBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

// Important to use these statemenets, the json response is optional for our response.
use Symfony\Component\HttpFoundation\JsonResponse;

class RegistrationController extends Controller
{
    /**
     * @Route("/admin/register", name="user_registration")
     */
    public function registerAction(Request $request, UserPasswordEncoderInterface $passwordEncoder, \Swift_Mailer $mailer)
    {
        $params = [];
        
        if ($request->isXMLHttpRequest()) { 
            
            $content = $request->getContent();
            if (!empty($content)) {
               
                $params = json_decode($content, true);
                $user = new User();
                $randomPassword = random_bytes(10);
                $randomPass = bin2hex($randomPassword);
                // Encode the password (you could also do this via Doctrine listener)
                $password = $passwordEncoder->encodePassword($user, $randomPass);
                $user->setEmail($params['email']);
                $user->setUsername($params['email']);
                $user->setPassword($password);                
                
                $em = $this->getDoctrine()->getManager();
                $em->persist($user);
                $em->flush();
                
                $message = (new \Swift_Message('Hello Email'))
                ->setFrom('tade62@hotmail.co.uk')
                ->setTo($params['email'])
                ->setBody(
                    $this->renderView(
                        // app/Resources/views/Emails/registration.html.twig
                        'emails/registration.html.twig', array('email' => $params['email'], 'password' => $randomPass)
                    ),
                    'text/html'
                );

                $mailer->send($message);
            }
        }
        return new JsonResponse('Approved');           

    }
}

