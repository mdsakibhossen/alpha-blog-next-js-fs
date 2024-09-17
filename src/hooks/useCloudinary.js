import { useState } from "react";
import Resizer from "react-image-file-resizer";

export const useCloudinary = () => {
    const [image, setImage] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)

    const uploadImage = (e) => {
        const file = e.target.files[0];
        // console.log(file, "file");

        if (file) {
            setIsUploading(true);
            new Promise((resolve) => {
                Resizer.imageFileResizer(
                    file,
                    1280,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        fetch(
                            `/api/admin/upload/image`,
                            {
                                method: "POST",
                                body: JSON.stringify({ image: uri }),
                            },
                        )
                            .then((res) => res.json())
                            .then((data) => {
                                // console.log(data, "DATA");
                                setImage(data);
                                setIsUploading(false);
                                resolve();
                            });
                    },
                    "base64",
                );
            });
        }
    };
    const removeImage = (public_id) => {
        setIsRemoving(true);
        fetch(`/api/admin/upload/image`, {
            method: "DELETE",
            body: JSON.stringify({ public_id }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                setImage(null);
                setIsUploading(false);
            }
            setIsRemoving(false);
        });
    };

    return { image, setImage, uploadImage, removeImage, isUploading, isRemoving }
}