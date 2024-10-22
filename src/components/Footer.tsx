import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-500 text-white text-center py-5 text-sm mt-8">
      <div className="mb-2 flex flex-col md:flex-row justify-center items-center">
        <div className="mr-4">
          <Link href="#" className="mr-4 text-white hover:text-gray-400" prefetch={false}>
            Home
          </Link>
          <Link href="#" className="mr-4 text-white hover:text-gray-400" prefetch={false}>
            About
          </Link>
          <Link href="#" className="mr-4 text-white hover:text-gray-400" prefetch={false}>
            Services
          </Link>
          <Link href="#" className="text-white hover:text-gray-400" prefetch={false}>
            Contact
          </Link>
        </div>
        
      </div>
      <div className="mb-4 flex flex-col md:flex-row justify-center items-center">
        <input
          type="email"
          placeholder="Enter your email for newsletter"
          className="mb-4 md:mb-0 md:mr-4 p-2 rounded-md text-black"
        />
        <button className="text-white border-white">
          Subscribe
        </button>
      </div>
      <div className="text-gray-400">
        <a href="#" className="text-white hover:text-gray-400">
          hello@example.com
        </a>
      </div>
      <div className="text-gray-400">© 2023 John Doe. All rights reserved.</div>
    </footer>
  );
}
