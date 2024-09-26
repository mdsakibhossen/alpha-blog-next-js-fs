import Image from "next/image";
import AboutUsImage from "../../../../public/images/about.jpg"
const AboutUsPage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="container mx-auto px-3 flex flex-col gap-10 lg:flex-row items-center">
        <div className="mt-10 flex-1">
          <Image
            src={AboutUsImage}
            alt="About Us Image"
            className="rounded-lg shadow-lg w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center px-4 flex-1 pb-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
          <p className="text-lg text-gray-600 mb-4">
            We are a team of passionate developers dedicated to building
            high-quality websites and web applications. With a focus on
            creativity, innovation, and performance, we deliver solutions that
            help businesses grow and thrive in the digital world.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Our mission is to create user-friendly, visually appealing, and
            feature-rich digital products tailored to meet the unique needs of
            each of our clients.
          </p>
          <p className="text-lg text-gray-600">
            Whether you're looking to build a brand new website or improve your
            existing one, we're here to help you every step of the way.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUsPage