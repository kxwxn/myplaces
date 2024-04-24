const GOOGLE_API_KEY = "AIzaSyCD28KmLsX2DbWRpXeRmF87u7V23WZFRys";

export const getMapPreview = ({ lat, lon }) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x200&maptype=roadmap
      &markers=color:red%7Clabel:S%7C${lat},${lon}
      &key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};
