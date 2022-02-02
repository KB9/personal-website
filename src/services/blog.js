import path from "path";
import { promises as fs } from "fs";

function blogRootDir() {
  return path.join(process.cwd(), "src", "data", "blog");
}

function blogPostDir(postId) {
  const rootDir = blogRootDir();
  return path.join(rootDir, postId);
}

async function allBlogPostIds() {
  const blogDir = blogRootDir();
  const postDirs = await fs.readdir(blogDir);
  return postDirs;
}

async function getBlogPostMetadata(postId) {
  const postDir = blogPostDir(postId);
  const metadataPath = path.join(postDir, "metadata.json");
  const metadataString = await fs.readFile(metadataPath, "utf-8");
  const metadataJson = JSON.parse(metadataString);
  metadataJson["url"] = postId;
  return metadataJson;
}

async function getBlogPostImagePath(postId) {
  const imagePath = path.join("/blog_images", postId + ".jpg");
  return imagePath.toString();
}

async function getBlogPostList() {
  let blogPostList = [];

  const postIds = await allBlogPostIds();
  for (const postId of postIds) {
    const postMetadata = await getBlogPostMetadata(postId);
    blogPostList.push(postMetadata);
  }

  blogPostList.sort((postA, postB) => {
    const dateA = new Date(postA.date);
    const dateB = new Date(postB.date);
    return dateB - dateA;
  });

  return blogPostList;
}

async function getBlogPostContent(postId) {
  const postDir = blogPostDir(postId);
  const postContentPath = path.join(postDir, "content.md");
  const postContent = await fs.readFile(postContentPath, "utf-8");
  return postContent;
}

export default {
  getBlogPostList,
  getBlogPostContent,
  getBlogPostMetadata,
  getBlogPostImagePath
};
