import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqs = [
  {
    question: 'How to book an appointment?',
    answer: 'Simply click on "Book Appointment" from the services section, select your preferred specialization, choose a doctor based on availability, and confirm your booking. You\'ll receive confirmation via SMS and push notification.'
  },
  {
    question: 'How to cancel or reschedule an appointment?',
    answer: 'Go to your Profile page, find your appointment in the Booking History section, and click on the appointment to cancel or reschedule. Please cancel at least 24 hours in advance to avoid cancellation fees.'
  },
  {
    question: 'How to use video consultation?',
    answer: 'Video consultation feature is coming soon! Once available, you\'ll be able to consult with doctors from the comfort of your home via secure video calls.'
  },
  {
    question: 'How to use the SOS button?',
    answer: 'The SOS button in the top-right corner directly calls emergency services (112). Use it only in case of medical emergencies for immediate assistance.'
  },
  {
    question: 'How to upload a prescription?',
    answer: 'Navigate to the AI Chatbot, select "Prescription Scanner" from the menu, and upload a clear photo of your prescription. Our AI will extract the text and provide relevant information about your medications.'
  },
  {
    question: 'Is my medical data secure?',
    answer: 'Yes, absolutely! We use industry-standard encryption and security measures to protect your personal and medical information. Your data is stored securely and never shared with third parties without your explicit consent.'
  },
  {
    question: 'How do I find nearby pharmacies?',
    answer: 'Click on "Pharmacy Finder" from the services section, enter your location, and we\'ll show you a list of nearby pharmacies with their open/closed status and directions via Google Maps.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept various payment methods including credit/debit cards, UPI, net banking, and digital wallets. Payment is required at the time of booking to confirm your appointment.'
  }
];

const FAQs = () => {
  return (
    <section id="faqs" className="min-h-screen py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our healthcare services
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQs;
