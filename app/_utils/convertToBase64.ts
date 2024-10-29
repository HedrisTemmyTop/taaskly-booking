const convertToBase64 = async function (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      return resolve(reader.result);
    };
    reader.onerror = (error) => {
      return reject(error);
    };
  });
};

export default convertToBase64;
