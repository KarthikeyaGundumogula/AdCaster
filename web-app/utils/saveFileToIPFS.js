const axios = require("axios");

export const pinFileToIPFS = async (file) => {
  const JWT = `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`;
  const formData = new FormData();
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: "File name",
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
