import Link from "../models/Link.js";

import { HttpError } from "../utils/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAllLinks = async (req, res) => {
  const { _id: owner } = req.user;

  const links = await Link.find({ owner });

  res.json(links);
};

const saveLinks = async (req, res) => {
  const { _id: owner } = req.user;
  const { links } = req.body;

  if (!Array.isArray(links)) {
    throw new HttpError(400, "Invalid data");
  }

  const bulkOps = links.map(({ _id, index, platform, url }) => {
    if (_id) {
      return {
        updateOne: {
          filter: { _id, owner },
          update: { index, platform, url },
        },
      };
    }

    return {
      insertOne: { document: { index, platform, url, owner } },
    };
  });

  await Link.bulkWrite(bulkOps);

  const updatedLinks = await Link.find({ owner });

  res.json({
    links: updatedLinks,
  });
};

const deleteLink = async (req, res) => {
  const { _id: owner } = req.user;
  const { linkId } = req.params;

  const result = await Link.findOneAndDelete({ _id: linkId, owner });

  if (!result) {
    throw new HttpError(404);
  }

  res.json({ message: "Link deleted" });
};

export default {
  getAllLinks: ctrlWrapper(getAllLinks),
  saveLinks: ctrlWrapper(saveLinks),
  deleteLink: ctrlWrapper(deleteLink),
};
