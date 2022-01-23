import { FC, useState, FormEvent } from "react";
import Select from "react-select";
import { projectStorage } from "../../firebase/config";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { delay } from "../../utilities/convertValue";
import Loading from "../../components/Loading";
import { useRandomContext } from "../../hooks/useRandomContext";
import InputText from "../../components/Input/InputText";
import InputNumber from "../../components/Input/InputNumber";
import InputTextarea from "../../components/Input/InputTextarea";
import InputFileMulti from "../../components/Input/InputFileMulti";
import axios from "axios";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

type CategoryOp = {
  value: string;
};

const CreateProject: FC = () => {
  const history = useHistory();

  // FIXME: any型を潰す
  const [name, setName] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [depth, setDepth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [stock, setStock] = useState<number>(1);
  const [category, setCategory] = useState<CategoryOp | null>(null);
  const [formError, setFromError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useAuthContext();
  const { random } = useRandomContext();
  console.log(random, "random yeah");
  //createdUserを追加する

  if (!user) {
    throw new Error("Could not complete signup");
  }
  const getImageUrl = async (file: File): Promise<string> => {
    const uploadPath = `photos/${user.uid}/${file.name}`;
    const img = await projectStorage.ref(uploadPath).put(file);
    const imgUrl = await img.ref.getDownloadURL();
    return imgUrl;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFromError(null);
    if (!category) {
      setFromError("Please select a furniture category");
      return;
    }
    const newPhotos: Array<string> = [];
    await photos.forEach(async (photo) => {
      const yeah = await getImageUrl(photo);
      console.log(yeah);
      newPhotos.push(yeah);
    });

    // FIXME:非同期がうまく効かないため一時的にdelayを使っている
    await delay(7000);

    const furniture = {
      name,
      photos: newPhotos,
      description,
      price,
      stock,
      width,
      depth,
      height,
      random: Number(random),
      category: category.value,
    };

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/stripe-post`,
        furniture
      );
      console.log(result, process.env.REACT_APP_BASE_URL);
    } catch (error) {
      console.log(error);
      alert("エラーが発生しました");
    } finally {
      setIsLoading(false);
      history.push("/");
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className="create-form">
        <h2 className="page-title">Create a new Furniture</h2>
        <form onSubmit={handleSubmit}>
          <InputFileMulti name="photos" photos={photos} setPhotos={setPhotos} />
          <InputText label="name" state={name} setState={setName} />
          <InputTextarea
            label="description"
            state={description}
            setState={setDescription}
          />
          <InputNumber label="price" state={price} setState={setPrice} />
          <InputNumber label="strock" state={stock} setState={setStock} />
          <InputNumber label="width" state={width} setState={setWidth} />
          <InputNumber label="depth" state={depth} setState={setDepth} />
          <InputNumber label="height" state={height} setState={setHeight} />
          <label>
            <span>Project category:</span>
            <Select
              onChange={(option) => setCategory(option)}
              options={categories}
            />
          </label>
          <button className="btn">Add Funiture</button>
          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
    </>
  );
};

export default CreateProject;
