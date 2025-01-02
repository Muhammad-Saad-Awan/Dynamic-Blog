import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Poppins } from 'next/font/google';

const roboto = Poppins({
    subsets: ['latin'], 
    weight: ['400', '700'], 
    style: ['normal', 'italic'], 
  });
export default function Footer(){
    return(
        <footer className={`${roboto.className} bg-white border-t border-gray-100 mt-12`}>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Homepage
            </Link>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                Terms
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                Privacy
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>
    )
}