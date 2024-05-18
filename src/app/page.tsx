import { Post } from "@/model/post";
import { PostPreview } from "./_components/post-preview";
import { getAllPosts } from "@/api";
import { Container } from "./_components/container";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { Metadata } from "next";

export default async function Home() {
  const posts: Post[] = await getAllPosts();
  const tags = getAllTags(posts);
  return (
    <div>
      <Header />
      <main className="min-h-screen mt-5 md:mt-14 mb-32 px-4">
        <Container tags={tags}>
          <div className="md:px-2">
            <h2 className="text-3xl font-bold mb-4"># 最近の記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-3 gap-y-3 md:gap-y-5">
              {posts.map((post) => (
                <PostPreview
                  isPostPage={false}
                  key={post.slug}
                  title={post.title}
                  tags={post.tags}
                  coverImage={post.coverImage}
                  date={post.date}
                  slug={post.slug}
                />
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export interface Tag {
  name: string;
  count: number;
}

const getAllTags = (posts: Post[]): Tag[] => {
  const tagMap = new Map<string, Tag>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (tagMap.has(tag)) {
        const existingTag = tagMap.get(tag)!;
        existingTag.count++;
      } else {
        tagMap.set(tag, { name: tag, count: 1 });
      }
    });
  });

  const tags: Tag[] = Array.from(tagMap.values());
  return tags;
};

// メタ情報生成
export async function generateMetadata() {
  const title = "Home - geDemBlog";

  return {
    title: title,
    openGraph: {
      title,
    },
  } as Metadata;
}
