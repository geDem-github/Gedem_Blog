import { Tag, getAllPosts, getAllTags } from "@/api";
import { Post } from "@/model/post";
import { Header } from "./header";
import { GridContainer } from "./grid-container";
import { PostPreview } from "./post-preview";
import { Footer } from "./footer";
import { notFound } from "next/navigation";

type Props = {
  title: string;
  tagName?: string;
};

export async function PostCardsContainer(props: Props) {
  let posts: Post[] = await getAllPosts();
  const tags = getAllTags(posts);

  // もしタグ検索されているなら、マッチする記事をpostsに代入
  let tag: Tag | undefined;
  if (props.tagName) {
    tag = tags.find((tag) => tag.name.replace(/\s/g, "") == props.tagName);

    if (!tag) {
      return notFound();
    }

    posts = posts.filter((post) => {
      return post.tags.find(
        (postTagName) => postTagName.replace(/\s/g, "") == props.tagName
      );
    });
  }

  return (
    <div>
      <Header />
      <main className="min-h-screen mt-5 md:mt-14 mb-32 px-4">
        <GridContainer tags={tags}>
          <div className="md:px-2">
            <h2 className="text-3xl font-bold mb-4">{props.title}</h2>
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
        </GridContainer>
      </main>
      <Footer />
    </div>
  );
}
