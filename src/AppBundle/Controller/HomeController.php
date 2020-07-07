<?php

namespace AppBundle\Controller;
use AppBundle\Entity\Subscriber;
use AppBundle\Entity\Joinform;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


// Important to use these statemenets, the json response is optional for our response.
use Symfony\Component\HttpFoundation\JsonResponse;

class HomeController extends Controller
{
    
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction()
    {
        // replace this example code with whatever you need
        return $this->render('home/index.html.twig');
    }
    
    /**
     * @Route("/subscribe", name="subscribepage")
     * @Method({"GET", "POST"})
     */
    public function subscribeAction(Request $request)
    {
        $params = [];
        
        if ($request->isXMLHttpRequest()) { 
            
            $content = $request->getContent();
            if (!empty($content)) {
               
                $params = json_decode($content, true);
                
                $new = new Subscriber();
                $new->setName($params['Name']);
                $new->setEmail($params['Email']);
                $new->setTimeOfSubscription(new \DateTime('now'));
                $new->setUnsubscribe('false');

                $em = $this->getDoctrine()->getManager();

                $em->persist($new);
                $em->flush();
            }
        }
        return new JsonResponse('Subscribe');
    }
    
    
    
    /**
     * @Route("/join", name="joinpage")
     */
    public function joinAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('home/join.html.twig');
    }
    
    /**
     * @Route("/joinform", name="joinformpage")
     * @Method({"GET", "POST"})
     */
    public function joinformAction(Request $request)
    {
        $params = [];
        
        if ($request->isXMLHttpRequest()) { 
            
            $content = $request->getContent();
            if (!empty($content)) {
               
                $params = json_decode($content, true);
                
                $new = new Joinform();
                $new->setRestaurantName($params['RestaurantName']);
                $new->setRestaurantAddress($params['RestaurantAddress']);
                $new->setRestaurantPostcode($params['RestaurantPostcode']);
                $new->setAfricanCuisine($params['AfricanCuisine']);
                $new->setContactName($params['ContactName']);
                $new->setContactEmail($params['ContactEmail']);
                $new->setContactTelephone($params['ContactTelephone']);
                $new->setContactMessage($params['ContactMessage']);
                
                $em = $this->getDoctrine()->getManager();

                $em->persist($new);
                $em->flush();
            }
        }
        return new JsonResponse('Emailed');
    }
    
    /**
     * @Route("/contact", name="contactpage")
     */
    public function contactAction(Request $request)
    {
        return $this->render('home/contact.html.twig');
    }
    
    /**
     * @Route("/contactform", name="contactformpage")
     * @Method({"GET", "POST"})
     */
    public function contactformAction(Request $request, \Swift_Mailer $mailer)
    {
        $params = [];
        
        if ($request->isXMLHttpRequest()) { 
            
            $content = $request->getContent();
            if (!empty($content)) {
                $params = json_decode($content, true);
            }
        }
        
        $message = (new \Swift_Message('Hello Email'))
            ->setFrom('tade62@hotmail.co.uk')
            ->setTo('jtoshin@msn.com')
            ->setBody(
                $this->renderView(
                    // app/Resources/views/Emails/registration.html.twig
                    'emails/contact.html.twig', array('name' => $params['Name'], 'email' => $params['Email'], 'message' => $params['Message'])
                ),
                'text/html'
            )
            /*
             * If you also want to include a plaintext version of the message
            ->addPart(
                $this->renderView(
                    'Emails/registration.txt.twig',
                    array('name' => $name)
                ),
                'text/plain'
            )
            */
        ;

        $mailer->send($message);

        // or, you can also fetch the mailer service this way
        // $this->get('mailer')->send($message);
        return new JsonResponse('Emailed');
    }
    
}
