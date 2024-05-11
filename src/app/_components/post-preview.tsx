import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  isPostPage: Boolean;
  title: string;
  tags: string[];
  coverImage: string;
  date: string;
  slug: string;
};

export function PostPreview({
  isPostPage,
  title,
  tags,
  coverImage,
  date,
  slug,
}: Props) {
  return (
    <Link
      as={`/blog/${slug}`}
      href="/blog/[slug]"
      className={
        isPostPage
          ? "flex flex-col bg-neutral-600 border border-gray-600 shadow-xl p-2 rounded-lg hover:-translate-y-1 hover:underline duration-200"
          : "flex flex-col bg-neutral-700 p-2 rounded-lg hover:-translate-y-1 hover:underline duration-200"
      }
    >
      <div className="mb-5">
        <div className="mb-2">
          <CoverImage slug={slug} src={coverImage} />
        </div>
        {tags.map((tag, index) => (
          <button
            className="bg-blue-400 text-xs mr-1 mb-1 py-1 px-2 rounded"
            key={index}
          >
            #{tag}
          </button>
        ))}
        <h3 className="overflow-scroll text-base font-bold md:text-sm">
          {title}
        </h3>
      </div>
      <div className="mt-auto ml-auto">
        <DateFormatter dateString={date} />
      </div>
    </Link>
  );
}
