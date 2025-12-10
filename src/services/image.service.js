const Image = require("../models/image.model");
const uuid = require("uuid").v4;

exports.uploadBuffer = async (file, opts = {}) => {
  const filename = `${uuid()}-${opts.filename || "image"}`;
  const base64 = file.buffer.toString("base64");
  const url = `data:${file.mimetype};base64,${base64}`;

  const doc = new Image({
    filename,
    url,
    provider: "inline",
    metadata: { size: file.size }
  });

  await doc.save();
  return doc;
};
