import React from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';

interface Blog {
  heading: string;
  description: string;
  slug: string;
  imageUrl: string;
}

export default async function HomePage() {
  const data: Blog[] = await client.fetch(`*[_type == "blog"]{
    heading,
    description,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }`);

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4 py-8">
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Blog</h1>
        <p className="text-lg text-gray-600">Explore our latest articles and insights</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((blog) => (
          <Link key={blog.slug} href={`/blog/${blog.slug}`}>
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl h-full">
              {blog.imageUrl && (
                <div>
                  <Image
                    src={blog.imageUrl}
                    alt={blog.heading}
                    width={200}
                    height={200}
                    className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-gray-800">{blog.heading}</h2>
                <p className="text-gray-600 line-clamp-3">{blog.description}</p>
                <div className="mt-4">
                  <span className="text-blue-600 hover:text-blue-700">Read more →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
