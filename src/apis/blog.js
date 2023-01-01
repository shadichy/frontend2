import Global from "./global";

const { fetchAPI } = Global

/**
 * @param {string} lang
 * @param {string} endCursor
 * @param {Array<string>} searchTags
 */
async function getPostList(lang, endCursor = "", searchTags = []) {
	const tagQuery = searchTags.length != 0
		? `, where: { tagSlugIn: [${searchTags.map(t => `"${t}"`).join(",")}] }`
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
	const { pageInfo, edges } = data?.posts
	return { 
		prop: pageInfo, 
		posts: edges.map(node=>{
			node.thumb = node.featuredImage?.node.mediaItemUrl;
			node.featuredImage && delete node.featuredImage
		}) 
	}
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
	post.tags = post.tags?.nodes.map((tag) => tag.slug) || [];
	post.author = post.author?.node.name || undefined;
	post.thumb = post.featuredImage?.node.mediaItemUrl || undefined;
	post.featuredImage && delete post.featuredImage;
	return post;
}

export default {
	getPostList,
	getSinglePost
}
