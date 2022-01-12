import { FC, useState, FormEvent } from "react";
import Select from "react-select";
import { projectFunctions, projectStorage } from "../../firebase/config";
import { useHistory } from "react-router-dom";
import PhotosUpload from "../../components/PhotosUpload";
import { useAuthContext } from "../../hooks/useAuthContext";
import { delay } from "../../utilities/convertValue";
import Loading from "../../components/Loading";

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
  const [category, setCategory] = useState<CategoryOp | null>(null);
  const [formError, setFromError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useAuthContext();

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
      width,
      depth,
      height,
      category: category.value,
    };

    const addProduct = await projectFunctions.httpsCallable("addProduct");
    try {
      const result = await addProduct(furniture);
      console.log(result.data);
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
          <PhotosUpload name="photos" photos={photos} setPhotos={setPhotos} />
          <label>
            <span>Furniture name:</span>
            <input
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label>
            <span>Furniture description:</span>
            <textarea
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </label>
          <label>
            <span>Furniture price:</span>
            <input
              type="text"
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
            />
          </label>
          <label>
            <span>Furniture width:</span>
            <input
              type="text"
              onChange={(e) => setWidth(Number(e.target.value))}
              value={width}
            />
          </label>
          <label>
            <span>Furniture depth:</span>
            <input
              type="text"
              onChange={(e) => setDepth(Number(e.target.value))}
              value={depth}
            />
          </label>
          <label>
            <span>Furniture height:</span>
            <input
              type="text"
              onChange={(e) => setHeight(Number(e.target.value))}
              value={height}
            />
          </label>
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
