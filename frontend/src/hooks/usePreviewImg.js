import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
	const [imgUrl, setImgUrl] = useState(null);
	const showToast = useShowToast();
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader(); // this  is going to read the image uploaded by user

			reader.onloadend = () => { // this  event will be triggered when the reading process has finished
				setImgUrl(reader.result); // and this  function will update our imgUrl state with the base
			};

			reader.readAsDataURL(file); // this  method will start the reading process of the image
		} else {
			showToast("Invalid file type", " Please select an image file", "error");
			setImgUrl(null);
		}
	};
	return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;
