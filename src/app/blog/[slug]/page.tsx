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
  let htmlContents = load(rawHtml);
  // ファイル名テキスト追加
  htmlContents = addFileNameText(htmlContents);
  // 目次作成
  const headings = getHeadings(htmlContents);
  // コードハイライト
  const highlightedHtml = highlightCode(htmlContents).html();

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
                  content={highlightedHtml}
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

// コード前にファイル名テキスト追加
const addFileNameText = (htmlContents: CheerioAPI): CheerioAPI => {
  const regex = /(?<=::)[\w.-]+\.\w+/g;
  htmlContents("pre code").each((_, elm) => {
    try {
      const classValue = elm.attributes[0]?.value;
      const match = classValue.match(regex);
      if (match) {
        htmlContents(elm).before(`<span>${match[0]}</span>`);
      }
    } catch {}
  });

  return htmlContents;
};

// コードハイライト
const highlightCode = (htmlContents: CheerioAPI): CheerioAPI => {
  // (highlightAutoだと、なぜかbuildできなかったので拡張子を抽出)
  htmlContents("pre code").each((_, elm) => {
    try {
      const classValue = elm.attributes[0]?.value;
      const regex = /language-(\w+)/;
      const match = classValue.match(regex);

      if (match) {
        const language = match[1];
        const result = hljs.highlight(htmlContents(elm).text(), {
          language: language,
        }).value;

        htmlContents(elm).html(result);
      }
    } catch {}

    htmlContents(elm).addClass("hljs");
  });
  return htmlContents;
};

// 目次作成
const getHeadings = (htmlContents: CheerioAPI): string[] => {
  const headings: string[] = [];
  htmlContents("h2").each((_, elm) => {
    const text = htmlContents(elm).text();
    headings.push(text);
    htmlContents(elm).contents().wrap(`<a id="${text}" href="#${text}"></a>`);
  });
  return headings;
};

// マークダウン→HTML
async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
