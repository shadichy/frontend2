import Global from "./global";
import Defaults from "../defaults";

const { fetchAPI } = Global,
  { alt_placeholder, title_holder } = Defaults;

/**
 * @param {string} lang
 * @param {string} endCursor
 * @param {Array<string>} searchTags
 */
async function getPostList(lang, endCursor = "", searchTags = []) {
  const tagQuery =
    searchTags.length != 0
      ? `, where: { tagSlugIn: [${searchTags.map((t) => `"${t}"`).join(",")}] }`
      : "";
  const data = await fetchAPI(`
{
	posts(first: 60, after: "${endCursor}" ${tagQuery}) {
		pageInfo {
			hasNextPage
			endCursor
		}
		edges {
			node {
				id
				title
				featuredImage {
					node {
						mediaItemUrl
					}
				}
				excerpt
			}
		}
	}
}
	`);
  const { pageInfo, edges } = data?.posts;
  return {
    prop: pageInfo,
    posts: edges.map(({ node: { id, title, excerpt, featuredImage } }) => ({
      id: id,
      title: title,
      excerpt: excerpt || title_holder,
      thumb: featuredImage?.node.mediaItemUrl || alt_placeholder,
    })),
  };
}

/**
 * @param {string} lang
 * @param {any} id
 * @param {any} idType
 */
async function getSinglePost(lang, id, idType = undefined) {
  const idTypeQuery = idType ? `, idType: "${idType}"` : "";
  const data = await fetchAPI(`
{
	post(id: "${id}" ${idTypeQuery}) {
		title
		date
		excerpt
		featuredImage {
			node {
				mediaItemUrl
			}
		}
		author {
			node {
				name
			}
		}
		tags {
			nodes {
				slug
			}
		}
		content
	}
}
	`);
  const { post = {} } = data;
  return {
    title: post.title,
    date: post.date,
    excerpt: post.excerpt || title_holder,
    thumb: post.featuredImage?.node.mediaItemUrl || alt_placeholder,
    author: post.author?.node.name || undefined,
    tags: post.tags?.nodes.map(({ slug }) => slug) || [],
    content: post.content || "",
  };
}

export default {
  getPostList,
  getSinglePost,
};
