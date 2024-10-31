import { Request, Response } from "express";
import { ctrlWrapper } from "../decorators";
import { Link as LinkData, Req } from "../types/link";
import { HttpError } from "../utils";
import Link from "../models/Links";

const getAllLinks = async (req: Request, res: Response) => {
  const customReq = req as Req;

  const { _id: owner } = customReq.user;

  const result = await Link.find({ owner }).select("-owner");

  res.json(result);
};

const updateOrCreateLinks = async (req: Request, res: Response) => {
  const customReq = req as Req;

  const { _id: owner } = customReq.user;
  const { links }: { links: LinkData[] } = req.body;

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
      insertOne: {
        document: { index, platform, url, owner },
      },
    };
  });

  await Link.bulkWrite(bulkOps);

  const updatedLinks = await Link.find({ owner });

  res.json({
    links: updatedLinks,
  });
};

const deleteLink = async (req: Request, res: Response) => {
  const customReq = req as Req;

  const { _id: owner } = customReq.user;
  const { linkId } = req.params;

  const result = await Link.findOneAndDelete({ _id: linkId, owner });

  if (!result) {
    throw HttpError(404);
  }

  res.json({ message: "link deleted" });
};

export default {
  getAllLinks: ctrlWrapper(getAllLinks),
  deleteLink: ctrlWrapper(deleteLink),
  updateOrCreateLinks: ctrlWrapper(updateOrCreateLinks),
};
