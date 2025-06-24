import assets from "../assets/assests"

function Contact() {
  return (
    <div>
      
      <div className="text-center text-2xl pt-10 text-gray-500 ">
        <p>CONTACT US</p>
      </div>

       <div className="flex flex-col my-10 mb-28 justify-center gap-6 md:flex-row text-sm text-gray-600">
        <img className="w-full md:max-w-[350px]" src={assets.contact_img} alt="" />

        <div className="flex flex-col justify-center gap-6 items-start text-sm text-gray-600">
          <b>Our OFFICE</b>
          <p>54709 Willms Station <br />Suite 350, Washington, USA</p>
          <p>Tel: 9561590442</p>
          <p>Email: sanketmandwal2@gmail.com</p>
          <b>Careers at CuraSlot</b>
          <p>Learn more about our teams and job openings.</p>
          <button className="text-sm border border-black px-8 py-4 hover:bg-primary hover:text-white transition-all duration-300">Explore Jobs</button>
        </div>
      </div>
      
    </div>
  )
}

export default Contact
