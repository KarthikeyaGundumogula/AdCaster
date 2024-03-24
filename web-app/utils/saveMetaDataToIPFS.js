const axios = require("axios");

export const saveMetaDataToIPFS = async (obj) => {
  const JWT = `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`;
  const blob = new Blob([JSON.stringify(obj)], {
    type: "application/json",
  });
  const MetaDataFile = [
    new File(["contents-of-file-1"], "plain-utf8.txt"),
    new File([blob], "MetaData.json"),
  ];
  const formData = new FormData();
  formData.append("file", MetaDataFile[1]);

  const pinataMetadata = JSON.stringify({
    name: "Ad Data",
  });
  formData.append("pinataMetadata", pinataMetadata);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT,
        },
      }
    );
    return res.data.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};
