import React, { FC, useState } from "react";
import CloseButton from "../components/Button/CloseButton";
import ExecuteModal from "../components/Modal/ExecuteModal";

interface PhotosUploadProps {
  name: string;
  // NOTE:input["file"]とlabelをリンクさせるためのフラグ
  photos: File[];
  setPhotos: (files: File[]) => void;
}

const mineType = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/bmp",
  "image/svg+xml",
];

const PhotosUpload: FC<PhotosUploadProps> = ({
  name,
  photos,
  setPhotos,
}: PhotosUploadProps): React.ReactElement => {
  const [toggleModal, setToggleModal] = useState(false);
  const [isSameError, setIsSameError] = useState(false);
  const [isNumberError, setIsNumberError] = useState(false);
  const [isFileTypeError, setIsFileTypeError] = useState(false);

  const resetErrors = () => {
    setIsSameError(false);
    setIsNumberError(false);
    setIsFileTypeError(false);
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null || event.target.files.length === 0) {
      return;
    }
    const files = Object.values(event.target.files).concat();
    // 初期化することで同じファイルを連続で選択してもonChagngeが発動するように設定し、画像をキャンセルしてすぐに同じ画像を選ぶ動作に対応
    event.target.value = "";
    resetErrors();

    const pickedPhotos = files.filter((file) => {
      // first validation
      if (!mineType.includes(file.type)) {
        setIsFileTypeError(true);
        return false;
      }
      // second validation
      const existsSameSize = photos.some((photo) => photo.size === file.size);
      if (existsSameSize) {
        setIsSameError(true);
        return false;
      }
      return true;
    });

    if (pickedPhotos.length === 0) {
      return;
    }
    const addedPhotos = [...photos, ...pickedPhotos];
    if (addedPhotos.length >= 4) {
      setIsNumberError(true);
    }
    setPhotos(addedPhotos.slice(0, 3));
  };

  const handleCancel = (photoIndex: number) => {
    resetErrors();
    const modifyPhotos = photos.filter((photo, index) => photoIndex !== index);
    setPhotos(modifyPhotos);
    setToggleModal(false);
  };
  const openModal = () => {
    setToggleModal(true);
  };

  return (
    <>
      <div className="photos-container">
        {[...Array(3)].map((_: number, index: number) =>
          index < photos.length ? (
            <div className="btn" key={index}>
              <CloseButton styleName="cansel" onClick={openModal} />
              {toggleModal && (
                <ExecuteModal
                  message="本当に削除しますか？"
                  setToggleModal={setToggleModal}
                  onClick={() => handleCancel(index)}
                />
              )}
              <img
                src={URL.createObjectURL(photos[index])}
                alt={`あなたの写真 ${index + 1}`}
                width="200"
              />
            </div>
          ) : (
            <label htmlFor={name} key={index}>
              <img src="https://placehold.jp/200x200.png" alt="" />
            </label>
          )
        )}
      </div>
      {isSameError && <p>※既に選択された画像と同じものは表示されません</p>}
      {isNumberError && <p>※3枚を超えて選択された画像は表示されません</p>}
      {isFileTypeError && (
        <p>※jpeg, png, bmp, gif, svg以外のファイル形式は表示されません</p>
      )}

      <div>
        <div>
          <p>※最大3枚まで</p>
        </div>
        <label>
          <input
            type="file"
            name={name}
            id={name}
            accept="image/*"
            onChange={handleFile}
            multiple
          />
        </label>
      </div>
    </>
  );
};

export default PhotosUpload;
