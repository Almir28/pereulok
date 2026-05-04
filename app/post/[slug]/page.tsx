import { notFound } from "next/navigation";
import { PostArticle } from "@/components/PostArticle";
import { getPostImageUrl } from "@/lib/post-image";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";

export const revalidate = 60;

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedPosts(100);

  return posts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Пост не найден"
    };
  }

  const imageUrl = getPostImageUrl(post, 1200, 630);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: imageUrl ? [{ url: imageUrl }] : undefined
    }
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([
    getPostBySlug(slug),
    getPublishedPosts(100)
  ]);

  if (!post) {
    notFound();
  }

  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const nextPost = posts[currentIndex + 1] || posts[0] || null;

  return (
    <PostArticle
      post={post}
      nextPost={nextPost?.slug === post.slug ? null : nextPost}
    />
  );
}
