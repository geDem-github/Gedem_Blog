import markdownStyles from "./marrkdown-styles.module.css";
import Headings from "./headings";
import { PostPreview } from "../post-preview";
import { getAllPosts } from "@/api";
import Link from "next/link";

type Props = {
  slug: string;
  content: string;
  headings: string[];
};

export async function PostBody(props: Props) {
  // 最近の投稿
  const allPosts = await getAllPosts();
  const recent3Posts = allPosts
    .filter((post) => post.slug !== props.slug)
    .slice(0, 3);

  return (
    <div className="px-8">
      {/* 見出し */}
      <Headings headings={props.headings} />
      {/* 本文 */}
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
      {/* 感謝 */}
      <p className="text-lg font-bold text-center mt-16">
        🙂‍↕️最後まで読んでいただきありがとうございます🙂‍↕️
      </p>
      {/* 最近の投稿 記事下 */}
      <div className="w-full mt-16 pb-32">
        <h3 className="text-4xl font-bold mb-5"># 最近の投稿</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 md:gap-x-2 md:gap-y-20">
          {recent3Posts.map((post) => (
            <PostPreview
              isPostPage={true}
              key={post.slug}
              title={post.title}
              tags={post.tags}
              coverImage={post.coverImage}
              date={post.date}
              slug={post.slug}
            />
          ))}
        </div>
        <div className="flex justify-center pt-10">
          <Link
            href="/"
            className="w-4/12 py-3 bg-gray-200 text-gray-950 text-center rounded-3xl border border-white hover:bg-gray-950 hover:text-gray-200 duration-100"
          >
            もっと見る
          </Link>
        </div>
      </div>
    </div>
  );
}
