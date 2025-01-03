 // page.tsx

import { Blog } from "@/components/Home";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, Bookmark, Heart } from "lucide-react";
import { Poppins } from "next/font/google";
import CommentSection from "../../../components/Comments";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const roboto = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

interface BlogData extends Blog {
  _id: string;
}

const BlogPost = async ({ params }: PageProps) => {
  const { slug } = await params; 

  // Fetch current blog post and related articles
  const data = await client.fetch(`{
    "post": *[_type == "blog" && slug.current == $slug][0]{
      _id,
      heading,
      description,
      "slug": slug.current,
      "imageUrl": image.asset->url
    },
    "relatedPosts": *[_type == "blog" && slug.current != $slug][0...3]{
      _id,
      heading,
      "slug": slug.current,
      "imageUrl": image.asset->url
    }
  }`,
    { slug }
  );

  if (!data.post) {
    return (
      <div className={`${roboto.className} min-h-screen flex items-center justify-center bg-gray-50`}>
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
          <Link href="/" className="text-blue-600 hover:underline inline-flex items-center gap-2">
            <ArrowLeft size={20} />
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${roboto.className} min-h-screen bg-gray-50`}>
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} />
            Back to Articles
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bookmark size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="relative h-[500px] w-full">
            <Image
              src={data.post.imageUrl}
              alt={data.post.heading}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-5xl max-md:text-xl  font-bold mb-4 leading-tight">{data.post.heading}</h1>
              <div className="flex items-center gap-4 text-gray-200">
                <div className="flex items-center gap-2">
                  <Clock size={18} />          
                  <span>5 min read</span>
                </div>
                <span>•</span>
                <span>Published on Jan 2, 2025</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Social Engagement */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
              <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart size={20} />
                <span>238 likes</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                <Share2 size={20} />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-yellow-500 transition-colors">
                <Bookmark size={20} />
                <span>Save</span>
              </button>
            </div>

            <div className=" w-full lg:max-w-6xl  ">
              <div className="">
                <h1 className="text-center font-bold text-4xl max-md:text-2xl mb-6">Description</h1>
                <p className="text-base lg:text-xl lg:text-justify text-center leading-relaxed mb-8">{data.post.description}</p>
              </div>
            </div>
          </div>
        </article>
           <CommentSection/>
        {data.relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl text-center font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.relatedPosts.map((post: BlogData) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post._id}
                  className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.imageUrl}
                      alt={post.heading}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.heading}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>5 min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPost;