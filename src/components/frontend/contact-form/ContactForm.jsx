"use client";
import AlertMessage from "@/components/alert-message/AlertMessage";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

const ContactForm = () => {
  const form = useRef();
  const [message, setMessage] = useState({ text: "", isSucceed: false });

  const sendEmail = (e) => {
    e.preventDefault();
    // console.log(form.current);
    const user_name = e.target[0].value;
    const user_email = e.target[1].value;
    const message = e.target[2].value;
    console.log(user_name, user_email, message);

    if (!user_name || !user_email || !message) {
      setMessage({ text: "Please Fill All The Fields.", isSucceed: false });
      return;
    }

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLETE_ID,
        form.current,
        {
          publicKey: process.env.NEXT_PUBLIC_API_KEY,
        }
      )
      .then(
        () => {
          // console.log("SUCCESS!");
          setMessage({ text: "Send Successfully!!", isSucceed: true });
          form.current.reset();
        },
        (error) => {
          setMessage({
            text: error.text || "Failed to Send",
            isSucceed: false,
          });
          // console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="w-full max-w-[600px] bg-gray-100 p-8 rounded-lg shadow-md">
      <div className="mb-3">
        <AlertMessage message={message} />
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="user_name"
          >
            Name
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="user_email"
          >
            Email
          </label>
          <input
            type="user_email"
            id="email"
            name="user_email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Your message"
            rows="5"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
