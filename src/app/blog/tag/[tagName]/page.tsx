import { Tag, getAllPosts, getAllTags } from "@/api";
import { PostCardsContainer } from "@/app/_components/post-cards-container";

type Params = {
  params: {
    tagName: string;
  };
};

export default async function Page({ params }: Params) {
  return (
    <PostCardsContainer
      title={`"${params.tagName}" の記事`}
      tagName={params.tagName}
    />
  );
}

// パス生成
export async function generateStaticParams() {
  const posts = await getAllPosts();
  const tags = getAllTags(posts);

  const paths = tags.map((tag) => ({
    params: { tagName: tag.name },
  }));
  return paths;
}
