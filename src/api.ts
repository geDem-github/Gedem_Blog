import { initializeApp } from "firebase/app";
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import matter from "gray-matter";
import { Post } from "./model/post";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

initializeApp(firebaseConfig);

// ポスト全取得(SSG)
export async function getAllPosts() {
  const storage = getStorage();
  const listRef = ref(storage, process.env.STORAGE_PATH);
  const response = await listAll(listRef);

  const postData = await Promise.all(
    response.items.map(async (itemRef) => {
      const downloadURL = await getDownloadURL(itemRef);
      const content = await fetch(downloadURL).then((response) =>
        response.text()
      );
      return {
        name: itemRef.name,
        content,
      };
    })
  );

  const posts = postData
    .map((post) => getPostContent(post.name, post.content))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

// ポスト単体取得
export async function getSinglePost(slug: string) {
  const storage = getStorage();
  const postRef = ref(storage, `${process.env.STORAGE_PATH}/${slug}.md`);
  const url = await getDownloadURL(postRef);
  const response = await fetch(url);
  const content = await response.text();
  return getPostContent(slug, content);
}

// ポストデータの読み込み・取得
function getPostContent(fileName: string, fileContent: string) {
  const pagePath = fileName.replace(/\.md$/, "");
  const { data, content } = matter(fileContent);
  return { ...data, slug: pagePath, content } as Post;
}

// タグ全取得
export interface Tag {
  name: string;
  count: number;
}
export function getAllTags(posts: Post[]): Tag[] {
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
}
