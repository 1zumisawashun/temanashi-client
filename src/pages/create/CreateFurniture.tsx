import { FC, useState, FormEvent } from "react";
import Select from "react-select";
import { firebase, timestamp, projectFunctions } from "../../firebase/config";
import { useHistory } from "react-router-dom";
import PhotosUpload from "../../components/PhotosUpload";

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFromError(null);
    if (!category) {
      setFromError("Please select a furniture category");
      return;
    }

    // NOTE:stockを入れるならインクリメントしないといけないはず
    const furniture = {
      name,
      photos,
      description,
      price,
      width,
      depth,
      height,
      category: category.value,
      createdAt: timestamp.fromDate(new Date()),
      likedCount: firebase.firestore.FieldValue.increment(0),
    };

    const addProduct = await projectFunctions.httpsCallable("addProduct");
    addProduct(furniture).then((result) => {
      console.log(result.data);
      history.push("/");
    });
  };
  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Furniture</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Furniture name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <PhotosUpload name="photos" photos={photos} setPhotos={setPhotos} />
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
            required
            type="number"
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
          />
        </label>
        <label>
          <span>Furniture width:</span>
          <input
            required
            type="number"
            onChange={(e) => setWidth(Number(e.target.value))}
            value={width}
          />
        </label>
        <label>
          <span>Furniture depth:</span>
          <input
            required
            type="number"
            onChange={(e) => setDepth(Number(e.target.value))}
            value={depth}
          />
        </label>
        <label>
          <span>Furniture height:</span>
          <input
            required
            type="number"
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
  );
};

export default CreateProject;
