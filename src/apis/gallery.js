import Defaults from "../defaults";
import Mongodb from "mongodb";

const { mgurl, mgdb } = Defaults,
	{ MongoClient, Int32, ObjectId } = Mongodb;

const galldb = await MongoClient.connect(mgurl).then(client=>client.db(mgdb).collection("v2/gallery"))

/**
 * @param {string} lang
 */
async function getImages(lang, limit = 9, offset = 0) {
	return await galldb
    .find({
      [lang]: { $exist: true },
    })
    .project({
      _id: 1,
      [lang]: 1,
      src: 1,
      date: 1,
    })
    .limit(limit)
    .skip(offset)
    .sort({ date: "descending" })
    .toArray()
    .then((images) =>
      images.map((image) => ({
        title: image[lang].title,
        content: image[lang].content,
        src: image["src"],
      }))
    );
}

/**
 * @param {string} lang
 * @param {string} id
 */
async function getSingleImage(lang, id) {
	return await galldb
    .find({
      [lang]: { $exist: true },
			_id: new ObjectId(id),
    })
    .project({
      _id: 0,
      [lang]: 1,
      src: 1,
      date: 1,
    })
    .toArray()
    .then((images) =>({
      title: images[0][lang].title,
			date: images[0]["date"],
      content: images[0][lang].content,
      src: images[0]["src"],
    }));
}

export default {
	getImages,
	getSingleImage
}
