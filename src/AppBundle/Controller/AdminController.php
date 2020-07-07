<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Subscriber;
use AppBundle\Entity\Joinform;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

// Important to use these statemenets, the json response is optional for our response.
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;


class AdminController extends Controller
{
    /**
     * @Route("/admin/", name="admin")
     */
    public function indexAction()
    {
        // replace this example code with whatever you need
        return $this->render('admin/index.html.twig');
    }

    /**
     * @Route("/admin/membershipsubmitted", name="membership_submitted")
     */
    public function membershipAction()
    {
        // replace this example code with whatever you need
        return $this->render('admin/membershipSubmitted.html.twig');
    }    
    
    /**
     * @Route("/admin/membershipwaiting", name="membership_waiting")
     */
    public function membershipWaitingAction()
    {        
        $em = $this->getDoctrine()->getManager();
        $q = $em->createQuery("SELECT j FROM AppBundle:Joinform j WHERE j.approval != 'Approved'");
        $content = $q->getResult();
//        $content = $this->getDoctrine()
//        ->getRepository(Joinform::class)
//        ->findAll();
                
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());

        $serializer = new Serializer($normalizers, $encoders);
        
        $jsonContent = $serializer->serialize($content, 'json');

        return new Response($jsonContent);
    }  
    
    /**
     * @Route("/admin/membershipapproved", name="membership_approved")
     * @Method({"GET", "POST"})
     */
    public function approveMembership(Request $request)
    {
        $params = [];
        
        if ($request->isXMLHttpRequest()) { 
            
            $content = $request->getContent();
            if (!empty($content)) {
               
                $params = json_decode($content, true);
                
                $em = $this->getDoctrine()->getManager();
                $approval = $em->getRepository(Joinform::class)->find($params['Approvalid']);
                $approval->setApproval('Approved');
                $em->flush();
            }
        }
        return new JsonResponse('Approved');
    }
}
