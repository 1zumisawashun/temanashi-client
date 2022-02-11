import React, { FC, useState } from "react";
import CloseButton from "../Button/CloseButton";
import ExecuteModal from "../Modal/ExecuteModal";

interface Props {
  name: string; // NOTE:input["file"]とlabelをリンクさせるためのフラグ
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

const PhotosUpload: FC<Props> = ({
  name,
  photos,
  setPhotos,
}): React.ReactElement => {
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

    // NOTE:filterを通さずに行うとpromiseが帰ってしまう
    const pickedPhotos = files.filter(async (file) => {
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
    //無限に追加することができるがsliceで強制的に3枚にする
    setPhotos(addedPhotos.slice(0, 3));
  };

  const handleCancel = (photoIndex: number) => {
    document.body.style.overflow = "";
    resetErrors();
    const modifyPhotos = photos.filter((photo, index) => photoIndex !== index);
    setPhotos(modifyPhotos);
    setToggleModal(false);
  };
  const openModal = () => {
    setToggleModal(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <div className="photos-container">
        {[...Array(3)].map((_: number, index: number) =>
          index < photos.length ? (
            <div>
              <CloseButton styleName="close-upload" onClick={openModal} />
              <div className="wrapper" key={index}>
                {toggleModal && (
                  <ExecuteModal
                    message="本当に削除しますか？"
                    setToggleModal={setToggleModal}
                    onClick={() => handleCancel(index)}
                  />
                )}
                {/* 速度改善でfileを直接入れ込む必要あり */}
                <img
                  src={URL.createObjectURL(photos[index])}
                  alt={`あなたの写真 ${index + 1}`}
                  width="200"
                  className="image"
                />
              </div>
            </div>
          ) : (
            <div>
              <CloseButton
                styleName="close-upload -disable"
                onClick={openModal}
              />
              <label className="wrapper" htmlFor={name} key={index}>
                <img
                  src="https://placehold.jp/200x200.png"
                  alt=""
                  className="image"
                />
              </label>
            </div>
          )
        )}
      </div>
      {isSameError && <p>※既に選択された画像と同じものは表示されません</p>}
      {isNumberError && <p>※3枚を超えて選択された画像は表示されません</p>}
      {isFileTypeError && (
        <p>※jpeg, png, bmp, gif, svg以外のファイル形式は表示されません</p>
      )}

      <label className="btn -upload" htmlFor={name}>
        upload
      </label>

      <input
        type="file"
        name={name}
        id={name}
        accept="image/*"
        onChange={handleFile}
        multiple
        hidden
      />
    </>
  );
};

export default PhotosUpload;
