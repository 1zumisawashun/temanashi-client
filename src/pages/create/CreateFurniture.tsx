import { FC, useState, FormEvent } from "react";
import Select from "react-select";
import { projectStorage } from "../../firebase/config";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loading from "../../components/Loading";
import InputText from "../../components/Input/InputText";
import InputNumber from "../../components/Input/InputNumber";
import InputTextarea from "../../components/Input/InputTextarea";
import InputFileMulti from "../../components/Input/InputFileMulti";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useLogout } from "../../hooks/useLogout";

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
  const { logout } = useLogout();

  // FIXME: any型を潰す
  const [name, setName] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [description, setDescription] = useState<string>(
    "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );
  const [price, setPrice] = useState<number>(1000);
  const [width, setWidth] = useState<number>(111);
  const [depth, setDepth] = useState<number>(222);
  const [height, setHeight] = useState<number>(333);
  const [stock, setStock] = useState<number>(10);
  const [category, setCategory] = useState<CategoryOp | null>(null);
  const [formError, setFromError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cookies] = useCookies(["random", "jwt"]);

  const { user } = useAuthContext();

  if (!user) {
    throw new Error("Could not complete signup");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFromError(null);
    if (!category) {
      setFromError("Please select a furniture category");
      return;
    }

    const promises = photos.map(
      async (file): Promise<string> => {
        const uploadPath = `photos/${user.uid}/${file.name}`;
        const img = await projectStorage.ref(uploadPath).put(file);
        const imgUrl = await img.ref.getDownloadURL();
        return imgUrl;
      }
    );

    const newPhotos = await Promise.all(promises);

    const furniture = {
      name,
      photos: newPhotos,
      description,
      price,
      stock,
      width,
      depth,
      height,
      random: cookies.random,
      category: category.value,
    };

    try {
      const headers = {
        Authorization: `Bearer ${cookies.jwt}`,
      };
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/stripe-post`,
        furniture,
        { headers }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("エラーが発生しました");
      logout();
      history.push("/login");
    } finally {
      setIsLoading(false);
      history.push("/");
    }
  };
  return (
    <div className="common-container">
      {isLoading && <Loading />}
      <div className="create-form">
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
    </div>
  );
};

export default CreateProject;
