import Navbar from '@/components/navbar'

const Advertise = () => (
    <>
    <Navbar/>
<section className="container mx-auto my-12 p-4">
    <img className="mx-auto h-48" src="/img/eagle-logo-blue.png" alt="Eagle Logo" />
    <h1 className="text-5xl md:text-6xl font-black text-center -mt-20">Advertise with us</h1>
    <p className="text-center text-xl max-w-3xl mx-auto">
        Eagle is commited to providing your business <strong className="italic text-white bg-blue-900 px-2 py-1 rounded">real value</strong>.
        Contact us today to learn how we can help you achieve your goals & for a free estimate.
    </p>
</section>

<section>
    <form name="contact" method="POST" data-netlify-recaptcha="true" data-netlify="true">
        <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-0">
                <div className="col-span-4 md:col-span-2">
                    <input value="" name="name" placeholder="Your Name" className="px-4 py-2 w-full border focus:border-blue-500 rounded focus:outline-none"/>
                </div>
                <div className="col-span-4 md:col-span-2">
                    <input value="" name="business_name" placeholder="Business Name" className="px-4 py-2 w-full border focus:border-blue-500 rounded focus:outline-none" />
                </div>
                <div className="col-span-4 md:col-span-2">
                    <input value="" name="phone_number" placeholder="Phone Number"
                        className="px-4 py-2 w-full border focus:border-blue-500 rounded focus:outline-none" />
                </div>
                <div className="col-span-4 md:col-span-2">
                    <input value="" name="email_address" placeholder="Email Address"
                        className="px-4 py-2 w-full border focus:border-blue-500 rounded focus:outline-none" />
                </div>
                <div className="col-span-4">
                    <textarea name="message" placeholder="How can we help grow your business?" rows="5" className="px-4 py-2 w-full border focus:border-blue-500 rounded focus:outline-none"></textarea>
                </div>
                <div data-netlify-recaptcha="true" className="col-span-4">
                </div>
                <div className="col-span-4">
                    <button type="submit" className="bg-blue-500 text-white uppercase text-sm text-center px-8 py-3 rounded hover:bg-blue-400 font-bold">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </form>
</section>
    </>
)

export default Advertise