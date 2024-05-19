import { getAllPosts, getSinglePost } from "@/api";
import { notFound } from "next/navigation";
import { CheerioAPI, load } from "cheerio";
import { remark } from "remark";
import html from "remark-html";
import { PostHeader } from "@/app/_components/post/post-header";
import { PostBody } from "@/app/_components/post/post-body";
import { Header } from "@/app/_components/header";
import { GridContainer } from "@/app/_components/grid-container";
import { Footer } from "@/app/_components/footer";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.min.css";
import { Metadata } from "next";

type Params = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Params) {
  let post;
  try {
    post = await getSinglePost(params.slug);
  } catch {
    return notFound();
  }

  // HTML整形
  const rawHtml = await markdownToHtml(post.content || "");
  const htmlContents = load(rawHtml);
  // 目次作成
  const headings = getHeadings(htmlContents);
  // コードハイライト
  const highlightedPostContent = highlightCode(htmlContents);
  const modifiedHtml = highlightedPostContent.html();

  return (
    <div>
      <Header />
      <main className="mt-14 mb-32 px-4">
        <article>
          <GridContainer headings={headings}>
            <div className="md:px-2">
              <div className="bg-neutral-700 rounded-xl">
                <PostHeader
                  title={post.title}
                  tags={post.tags}
                  date={post.date}
                  coverImage={post.coverImage}
                />
                <PostBody
                  slug={post.slug}
                  content={modifiedHtml}
                  headings={headings}
                />
              </div>
            </div>
          </GridContainer>
        </article>
      </main>
      <Footer />
    </div>
  );
}

// パス生成
export async function generateStaticParams() {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    slug: post.slug,
  }));
  return paths;
}

// メタ情報生成
export async function generateMetadata({ params }: Params) {
  let post;
  try {
    post = await getSinglePost(params.slug);
  } catch {
    return notFound();
  }

  const title = `${post.title}`;

  return {
    title: post.title,
    openGraph: {
      title,
      images: [post.coverImage],
    },
  } as Metadata;
}

// コードハイライト
const highlightCode = (htmlContent: CheerioAPI): CheerioAPI => {
  // (highlightAutoだと、なぜかbuildできなかったので拡張子を抽出)
  htmlContent("pre code").each((_, elm) => {
    try {
      const classValue = elm.attributes[0]?.value;
      const regex = /language-(\w+)/;
      const match = classValue.match(regex);
      if (match) {
        const language = match[1];
        const result = hljs.highlight(htmlContent(elm).text(), {
          language: language,
        }).value;

        htmlContent(elm).html(result);
      }
    } catch {}
    htmlContent(elm).addClass("hljs");
  });
  return htmlContent;
};

// 目次作成
const getHeadings = (htmlContent: CheerioAPI): string[] => {
  const headings: string[] = [];
  htmlContent("h2").each((_, elm) => {
    const text = htmlContent(elm).text();
    headings.push(text);
    htmlContent(elm).contents().wrap(`<a id="${text}" href="#${text}"></a>`);
  });
  return headings;
};

// マークダウン→HTML
async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
