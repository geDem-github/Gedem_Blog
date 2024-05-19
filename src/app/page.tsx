import { Post } from "@/model/post";
import { getAllPosts, getAllTags } from "@/api";
import { PostCardsContainer } from "./_components/post-cards-container";

export default async function Home() {
  const posts: Post[] = await getAllPosts();
  const tags = getAllTags(posts);
  return <PostCardsContainer title="# 最近の投稿" />;
}
