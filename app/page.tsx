"use client";
import { SetStateAction, useState } from 'react';
import Image from 'next/image';
import sendEmail from './actions';
import Carousel from './components/carousel';

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '', icon: '' });
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const insuranceCoverages = [
    { id: 1, title: 'Business Owners Policy', description: 'A combination of commercial general liability and property insurance to help protect your business against a variety of claims.', icon: '/business-and-business.png' },
    { id: 2, title: 'Commercial General Liability', description: 'Protects your business from common lawsuits arising from everyday business activities.', icon: '/commercial-structures.png' },
    { id: 3, title: 'Commercial Property Insurance', description: 'Protects your owned or rented building, plus equipment used to operate your business (Fire, Burglary, Theft, Wind, Lightning).', icon: '/property-sale.png' },
    { id: 4, title: 'Commercial Umbrella Insurance', description: 'Provides an extra layer of liability protection by covering costs that go beyond your other liability coverage limits (Ex: CGL, WC, AL).', icon: '/umbrella.png' },
    { id: 5, title: 'Garage Keepers Insurance', description: "It protects your customers' vehicle when it's kept at a covered location to perform service. Vehicles are protected in case a vehicle is damaged by fire, theft, vandalism, and/or collision.", icon: '/garage.png' },
    { id: 6, title: 'Inland Marine Insurance', description: "Protects movable/business property that is transported on land or temporarily stored by a third party.", icon: '/cruise.png' },
    { id: 7, title: 'Professional Liability/Errors & Omissions', description: "Protects business professionals from negligence or mistakes related to the professional services provided.", icon: '/suit-and-tie.png' },
    { id: 8, title: 'Workers Compensation', description: "Provides financial support for employees who get hurt or sick during work hours. It also protects employers from lawsuits related to work injuries.", icon: '/worker.png' },
    { id: 9, title: 'Commercial Auto Insurance', description: "Covers business vehicles for things like injury to someone else, driver injury, damage to someone else's property and/or damage to your vehicle/s.", icon: '/pretzel-truck.png' },
  ];

  const openModal = (coverage: SetStateAction<{ title: string; description: string; icon: string; }>) => {
    setModalContent(coverage);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      await sendEmail(formData);
      setConfirmationOpen(true);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an issue sending your message. Please try again.");
    }
  };

  const closeConfirmation = () => {
    setConfirmationOpen(false);
  };

  return (
    <div className="min-h-screen">
      <header className="top-0 bg-gradient-to-r from-[#A1373B] via-[#CD252B] to-[#A1373B] text-white py-4 z-50 shadow-xl">
        <div className='h-full w-full bg-white p-2 flex flex-wrap justify-between items-center text-[#6C605E]'>
          <div className="flex items-center space-x-4">
            <Image src="/g2logo.png" alt="Logo" width={80} height={80} />
            <h1 className="text-lg font-bold text-[#CD252B]">G2 Business & Auto Insurance</h1>
          </div>
          <nav className="flex flex-wrap space-x-4 md:space-x-8">
            <a href="#home" className="transition ease-in-out duration-300 hover:underline hover:text-[#CD252B]">Home</a>
            <a href="#insurance-coverages" className="transition ease-in-out duration-300 hover:underline hover:text-[#CD252B]">Insurance Coverages</a>
            <a href="#location-contact" className="transition ease-in-out duration-300 hover:underline hover:text-[#CD252B]">Location & Contact</a>
            <a href="#google-reviews" className="transition ease-in-out duration-300 hover:underline hover:text-[#CD252B]">Google Reviews</a>
          </nav>
        </div>
      </header>

      <section
  id="home"
  className="relative bg-cover bg-center h-screen hidden md:block"
>
  <Carousel />
  <div className="absolute inset-0 flex justify-center items-center">
    <a
      href="#location-contact"
      className="bg-red-600 text-white font-bold px-6 py-2 rounded hover:bg-red-700 z-50"
    >
      Get Your Quote
    </a>
  </div>
</section>


      <section id="insurance-coverages" className="p-4 md:p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6">Insurance Coverages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {insuranceCoverages.map((coverage) => (
            <div
              key={coverage.id}
              className="bg-[#F8EEEE] flex flex-col md:flex-row items-center p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => openModal(coverage)}
            >
              <Image src={coverage.icon} alt={coverage.title} width={96} height={96} className="mb-4 md:mb-0 md:mr-4" />
              <h3 className="text-lg text-[#CD252B] font-semibold">{coverage.title} &gt;</h3>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 md:mt-6">
          <a href="#location-contact" className="bg-red-600 text-white w-full max-w-[350px] text-center py-3 rounded-lg shadow-md hover:bg-red-700 transition">
            Get Your Quote
          </a>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-[#CD252B]">{modalContent.title}</h3>
              <button className="text-xl font-bold" onClick={closeModal}>✕</button>
            </div>
            <p className="text-gray-600">{modalContent.description}</p>
            <div className="flex justify-center mt-6">
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm md:max-w-md lg:max-w-lg">
            <h3 className="text-xl md:text-2xl font-bold text-[#CD252B] text-center">Thank you!</h3>
            <p className="text-gray-600 mt-4 text-center">Your request has been sent successfully. We will get back to you soon.</p>
            <div className="flex justify-center mt-6">
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={closeConfirmation}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="location-contact" className="p-8 md:p-16 flex flex-wrap gap-8 bg-[#F8EEEE]">
        <h2 className="text-3xl md:text-4xl font-bold text-center w-full mb-6">Location & Contact</h2>
        <div className='rounded-2xl p-6 bg-white shadow-lg flex flex-col gap-6 flex-1'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206.56224702158576!2d-117.57852742718241!3d34.06961801767697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c335a0d776616f%3A0xc8b866bfc4088f5c!2s3350%20Shelby%20St%20%23200%2C%20Ontario%2C%20CA%2091764!5e0!3m2!1sen!2sus!4v1729128388087!5m2!1sen!2sus" width="100%" height="264" className='shadow-xl' loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          <div className="flex gap-2 items-center">
            <a href="https://maps.app.goo.gl/qdF7TKZrKGaw6dqG6" className='underline hover:text-[#CD252B] text-lg md:text-xl'>3350 Shelby St, Ste 200 Ontario CA 91764</a>
          </div>
          <div className="flex gap-2 items-center">
            <a href="tele:909-493-3220" className='underline hover:text-[#CD252B] text-lg md:text-xl'>909-493-3220</a>
          </div>
          <div className="flex gap-2 items-center">
            <a href="mailto:veronica@getg2insurance.com" className='underline hover:text-[#CD252B] text-lg md:text-xl'>veronica@getg2insurance.com</a>
          </div>
          <p className='text-lg md:text-xl'>Monday - Friday, 9:00 AM - 5:00 PM</p>
        </div>

        <form onSubmit={handleSubmit} className='bg-white shadow-lg p-6 flex flex-col gap-6 rounded-xl flex-1'>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-4 w-full">
              <label className="text-[#CD252B] italic text-sm">Full Name*</label>
              <input name="name" type="text" placeholder='Name' className='shadow-lg rounded-lg px-4 py-2 w-full' required />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <label className="text-[#CD252B] italic text-sm">Email*</label>
              <input name="email" type="email" placeholder='info@getg2insurance.com' className='shadow-lg rounded-lg px-4 py-2 w-full' required />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-4 w-full">
              <label className="text-[#CD252B] italic text-sm">Phone Number*</label>
              <input name="number" type="text" placeholder='909-493-3220' className='shadow-lg rounded-lg px-4 py-2 w-full' required />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <label className="text-[#CD252B] italic text-sm">Insurance*</label>
              <input name="insurance" type="text" placeholder='N/A' className='shadow-lg rounded-lg px-4 py-2 w-full' required />
            </div>
          </div>

          <textarea name="comment" placeholder="Give us more information about your case, or any questions you have." className="shadow-lg rounded-lg px-4 py-2 w-full" />

          <div className="flex gap-4 self-end">
            <button className='bg-[#909090] text-white rounded-xl shadow-xl px-4 py-2' type="reset">Clear</button>
            <button className='bg-[#CD252B] text-white rounded-xl shadow-xl font-bold px-4 py-2' type="submit">Quote</button>
          </div>
        </form>
      </section>

      <section id="google-reviews" className="p-8 md:p-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">Top Rated on Google</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <a href="https://www.google.com/search?client=firefox-b-1-d&q=g2+insurance+#" target="_blank" rel="noopener noreferrer" className="flex justify-center">
            <Image src="/Review-01.PNG" alt="Review 1" width={500} height={500} className="rounded-lg shadow-lg transition transform duration-300 hover:scale-105 hover:shadow-2xl" />
          </a>
          <a href="https://www.google.com/search?client=firefox-b-1-d&q=g2+insurance+#" target="_blank" rel="noopener noreferrer" className="flex justify-center">
            <Image src="/Review-02.PNG" alt="Review 2" width={500} height={500} className="rounded-lg shadow-lg transition transform duration-300 hover:scale-105 hover:shadow-2xl" />
          </a>
          <a href="https://www.google.com/search?client=firefox-b-1-d&q=g2+insurance+#" target="_blank" rel="noopener noreferrer" className="flex justify-center">
            <Image src="/Review-03.PNG" alt="Review 3" width={500} height={500} className="rounded-lg shadow-lg transition transform duration-300 hover:scale-105 hover:shadow-2xl" />
          </a>
        </div>
      </section>

      <footer className="p-6 bg-[#F8EEEE] text-black text-center md:flex md:justify-between md:items-center">
        <p className="text-sm md:text-lg">© 2025 G2 Business & Auto Insurance. All rights reserved.</p>
        <nav className="flex justify-center gap-4 mt-4 md:mt-0">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#insurance-coverages" className="hover:underline">Insurance Coverages</a>
          <a href="#location-contact" className="hover:underline">Location & Contact</a>
          <a href="#google-reviews" className="hover:underline">Google Reviews</a>
        </nav>
      </footer>
    </div>
  );
}
