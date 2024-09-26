import ContactForm from "@/components/frontend/contact-form/ContactForm";

const ContactUsPage = () => {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="max-w-2xl mx-auto text-center px-4 py-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-4">
            If you have any questions or want to get in touch, feel free to send
            us a message.
          </p>
        </div>
        <ContactForm />
      </section>
      <section className="map py-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14591.013407544991!2d90.31713356182173!3d23.89836335711309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c25a71cf5873%3A0xd64e6f32619e3132!2sAshulia!5e0!3m2!1sen!2sbd!4v1727323278335!5m2!1sen!2sbd"
          width="100%"
          height="450"
          style={{border: 0}}
          loading="lazy"
        ></iframe>
      </section>
    </>
  );
};

export default ContactUsPage;
