
"use client";
import { SetStateAction, useState } from 'react';
import Image from 'next/image';
import sendEmail from './actions';
import Carousel from './components/carousel';

export default function Home() {
  // State for managing modal visibility and content
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '', icon: '' });

  // State for managing confirmation pop-up
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  // Data for insurance coverages with the correct icons
  const insuranceCoverages = [
    { id: 1, title: 'Business Owners Policy', description: 'A combination of commercial general liability and property insurance to help protect your business against a variety of claims.', icon: '/business-and-business.png' },
    { id: 2, title: 'Commercial General Liability', description: 'Protects your business from common lawsuits arising from everyday business activities.', icon: '/pretzel-truck.png' },
    { id: 3, title: 'Commercial Property Insurance', description: 'Protects your owned or rented building, plus equipment used to operate your business (Fire, Burglary, Theft, Wind, Lightning).', icon: '/property-sale.png' },
    { id: 4, title: 'Commercial Umbrella Insurance', description: 'Provides an extra layer of liability protection by covering costs that go beyond your other liability coverage limits (Ex: CGL, WC, AL).', icon: '/commercial-structures.png' },
    { id: 5, title: 'Garage Keepers Insurance', description: "It protects your customers' vehicle when it's kept at a covered location to perform service. Vehicles are protected in case a vehicle is damaged by fire, theft, vandalism, and/or collision.", icon: '/garage.png' },
    { id: 6, title: 'Inland Marine Insurance', description: "Protects movable/business property that is transported on land or temporarily stored by a third party.", icon: '/unsealed-road.png' },
    { id: 7, title: 'Professional Liability/Errors & Omissions', description: "Protects business professionals from negligence or mistakes related to the professional services provided.", icon: '/suit-and-tie.png' },
    { id: 8, title: 'Workers Compensation', description: "Provides financial support for employees who get hurt or sick during work hours. It also protects employers from lawsuits related to work injuries.", icon: '/worker.png' },
    { id: 9, title: 'Commercial Auto Insurance', description: "Covers business vehicles for things like injury to someone else, driver injury, damage to someone else's property and/or damage to your vehicle/s.", icon: '/auto.png' },
  ];

  // Function to open modal with specific content
  const openModal = (coverage: SetStateAction<{ title: string; description: string; icon: string; }>) => {
    setModalContent(coverage);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);


    try {
      await sendEmail(formData);
      setConfirmationOpen(true);  // Show confirmation modal
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an issue sending your message. Please try again.");
    }
  };

  // Function to close the confirmation pop-up
  const closeConfirmation = () => {
    setConfirmationOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <header className=" top-0 bg-gradient-to-r from-[#A1373B] via-[#CD252B] to-[#A1373B] text-white py-4 z-50 shadow-xl">
        <div className='h-full w-full bg-white p-2 flex justify-between items-center text-[#6C605E]'>
          <div className="flex items-center space-x-4">
            <Image src="/g2logo.png" alt="Logo" width={80} height={80} /> {/* Placeholder for logo */}
            <h1 className="text-lg font-bold text-[#CD252B]">G2 Business & Auto Insurance</h1>
          </div>
          <nav className="flex space-x-8">
            <a href="#home" className="transition ease-in-out duration-300 hover:underline hover:text-[#CD252B]">Home</a>
            <a href="#insurance-coverages" className="transition ease-in-out duration-300 hover:underline hover:text-[#CD252B]">Insurance Coverages</a>
            <a href="#location-contact" className="transition ease-in-out duration-300 hover:underline hover:text-[#CD252B]">Location & Contact</a>
            <a href="#google-reviews" className="transition ease-in-out duration-300 hover:underline hover:text-[#CD252B]">Google Reviews</a>
          </nav>
        </div>
      </header>

      {/* Home Section */}
      <section id="home" className="relative bg-cover bg-center h-screen" >
        <Carousel />
        <div className="absolute inset-0 flex justify-center items-center">
          <a href="#location-contact" className="bg-red-600 text-white font-bold px-6 py-2 rounded hover:bg-red-700 z-50">
            Get Your Quote
          </a>
        </div>
      </section>

      {/* Insurance Coverages Section */}
      <section id="insurance-coverages" className="p-16">
        <h2 className="text-4xl font-bold text-center mb-8">Insurance Coverages</h2>
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Insurance Coverage Cards */}
          {insuranceCoverages.map((coverage) => (
            <div
              key={coverage.id}
              className="bg-[#F8EEEE] flex items-center p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => openModal(coverage)}
            >
              <Image src={coverage.icon} alt={coverage.title} width={96} height={96} className="mr-4" />
              <h3 className="text-lg text-[#CD252B] font-semibold">{coverage.title} &gt;</h3>
            </div>
          ))}
        </div>

        {/* Get Your Quote Button */}
        <div className="flex justify-center">
          <a href="#location-contact" className="bg-red-600 text-white w-full max-w-[350px] text-center py-3 rounded-lg shadow-md hover:bg-red-700 transition">
            Get Your Quote
          </a>
        </div>
      </section>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-1/3">
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

      {/* Location & Contact Section */}
      <h1 className='text-3xl text-center font-bold'>Location & Contact</h1>
      <section id="location-contact" className="p-16 flex bg-[#F8EEEE] justify-between">
        <div className='rounded-2xl p-6 bg-white shadow-lg flex flex-col gap-3'>
          {/* Google Map Embed and Contact Info */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206.56224702158576!2d-117.57852742718241!3d34.06961801767697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c335a0d776616f%3A0xc8b866bfc4088f5c!2s3350%20Shelby%20St%20%23200%2C%20Ontario%2C%20CA%2091764!5e0!3m2!1sen!2sus!4v1729128388087!5m2!1sen!2sus" width="760" height="264" className='shadow-xl' loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          <div className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} className="size-6 stroke-[#CD252B] fill-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <a href="https://maps.app.goo.gl/qdF7TKZrKGaw6dqG6" className='underline hover:text-[#CD252B] text-xl'>3350 Shelby St, Ste 200 Ontario CA 91764</a>
          </div>
          <div className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} className="size-6 stroke-[#CD252B] fill-none">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <a href="tele:909-493-3220" className='underline hover:text-[#CD252B] text-xl'>909-493-3220</a>
          </div>
          <div className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} className="size-6 stroke-[#CD252B] fill-none">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            <a href="mailto:info@getg2insurance.com" className='underline hover:text-[#CD252B] text-xl'>info@getg2insurance.com</a>
          </div>
          <div className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} className="size-6 stroke-[#CD252B] fill-none">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
            <p className='text-xl'>Monday - Friday, 9:00 AM - 5:00 PM</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='bg-white shadow-lg p-8 flex flex-col gap-6 rounded-xl w-1/2'>
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <label className="text-[#CD252B] italic text-sm">Full Name*</label>
              <input name="name" type="text" placeholder='Name' className='shadow-lg rounded-lg px-4 py-2 w-full' required />
            </div>
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <label className="text-[#CD252B] italic text-sm">Email*</label>
              <input name="email" type="email" placeholder='info@getg2insurance.com' className='shadow-lg rounded-lg px-4 py-2 w-full' required />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <label className="text-[#CD252B] italic text-sm">Phone Number*</label>
              <input name="number" type="text" placeholder='909-493-3220' className='shadow-lg rounded-lg px-4 py-2 w-full' required />
            </div>
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <label className="text-[#CD252B] italic text-sm">Insurance*</label>
              <input name="insurance" type="text" placeholder='N/A' className='shadow-lg rounded-lg px-4 py-2 w-full' required />
            </div>
          </div>

          <label className="italic text-sm">Comment (Optional)</label>
          <textarea name="comment" placeholder="Give us more information about your case, or any questions you have." className="shadow-lg rounded-lg px-4 py-2 w-full" />

          <div className="flex gap-4 self-end">
            <button className='bg-[#909090] text-white rounded-xl shadow-xl px-4 py-2' type="reset">Clear</button>
            <button className='bg-[#CD252B] text-white rounded-xl shadow-xl font-bold px-4 py-2' type="submit">Quote</button>
          </div>
        </form>
      </section>

      {/* Confirmation Modal */}
      {isConfirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-1/3">
            <h3 className="text-2xl font-bold text-[#CD252B]">Thank you!</h3>
            <p className="text-gray-600 mt-2">Your request has been sent successfully. We will get back to you soon.</p>
            <div className="flex justify-center mt-6">
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={closeConfirmation}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google Reviews Section */}
      <section id="google-reviews" className="p-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">Top Rated on Google</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex justify-center">
            <a href="https://www.google.com/search?client=firefox-b-1-d&q=g2+insurance+#" target="_blank" rel="noopener noreferrer">
              <Image
                src="/Review-01.PNG"
                alt="Review 1"
                width={500}
                height={500}
                className="rounded-lg shadow-lg transition transform duration-300 hover:scale-105 hover:shadow-2xl"
              />
            </a>
          </div>
          <div className="flex justify-center">
            <a href="https://www.google.com/search?client=firefox-b-1-d&q=g2+insurance+#" target="_blank" rel="noopener noreferrer">
              <Image
                src="/Review-02.PNG"
                alt="Review 2"
                width={500}
                height={500}
                className="rounded-lg shadow-lg transition transform duration-300 hover:scale-105 hover:shadow-2xl"
              />
            </a>
          </div>
          <div className="flex justify-center">
            <a href="https://www.google.com/search?client=firefox-b-1-d&q=g2+insurance+#" target="_blank" rel="noopener noreferrer">
              <Image
                src="/Review-03.PNG"
                alt="Review 3"
                width={500}
                height={500}
                className="rounded-lg shadow-lg transition transform duration-300 hover:scale-105 hover:shadow-2xl"
              />
            </a>
          </div>
        </div>
        {/* <button className="mt-8 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
          Get Your Quote
        </button> */}
      </section>
    </div>
  );
}

