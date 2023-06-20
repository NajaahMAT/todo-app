import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";

const EditTask = () => {
  const [singleTask, setSingleTask] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [imageData, setImageData] = useState();
  const [imageUpload, setImageUpload] = useState();
  const [loadingData, setLoadingData] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const options = {
    position: "bottom-right",
    style: {
      backgroundColor: "gray",
      border: "2px solid lightgreen",
      color: "white",
      fontFamily: "Menlo, monospace",
      fontSize: "20px",
      textAlign: "center",
    },
    closeStyle: {
      color: "lightcoral",
      fontSize: "16px",
    },
  };

  const [openSnackbar] = useSnackbar(options);
  const baseUrl = process.env.REACT_APP_BACKEND_URL

  const getUrl = baseUrl + `/task/${id}`
  const updateUrl = baseUrl + `/task`

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Credentials': 'true',
  };

  const getSingleTask= () => {
    axios
      .get(
        getUrl,
        {
          headers
        }
      )
      .then(function (response) {
        setSingleTask(response?.data);
        console.log(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    const User = localStorage.getItem("user");

    if (!User) {
      navigate("/login");
    }
    getSingleTask();
  }, []);

  const onSubmit = (data) => {
    setLoading(true);
    const body = {
      ...data,
      file: singleTask?.file,
      id: singleTask?.id,
    };
    axios
      .put(
        updateUrl,
        { ...body },
        {
          headers,
        }
      )
      .then(function (response) {
        openSnackbar("Task Updated Successfully");
        setLoading(false);
        navigate("/view");
      })
      .catch(function (error) {
        openSnackbar("Oops!, Task is not updated");
        setLoading(false);
      });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const size = file.size / 1024;

    setImageUpload(e.target.files[0]);
    console.log("Image Upload: ",  imageUpload)

    // data.append("image", file);
    const reader = new FileReader();
    reader.onloadend = function () {
      setImage({ [e.target.name]: reader.result });
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      e.target.value = null;
    }
  };
  const uploadImage = () => {
    let formData = new FormData(); //formdata object

    formData.append("image", imageUpload); //append the values with key, value pair
    formData.append("name", imageUpload.name);

    console.log("formData : "+ formData)

    const imageUrl =  baseUrl + `/image/upload`;

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Credentials': 'true',
    };

    axios
      .post(imageUrl, {...formData}, {headers})
      .then((response) => {
        setLoadingData(false);
        console.log(response?.data)
        setImageData(response?.data?.url)
        console.log(response?.data?.url)
        openSnackbar("Image uploaded successfully");
      })
      .catch((error) => {
        setLoadingData(false);
        console.log(error);
      });
  };


  return (
    <div className="max-w-screen-md mx-auto p-5">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="title"
              type="text"
              placeholder="title"
              name="title"
              autoComplete="off"
              defaultValue={singleTask?.title}
              {...register("title", {
                required: true,
              })}
            />
            {errors.title && errors.title.type === "required" && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 items-center lg:items-start mb-6">
          <div className="w-full px-3">
            <label title="click to select a picture">
              <input
                accept="image/*"
                className="hidden"
                id="file"
                type="file"
                name="image"
                onChange={handleImage}
                visibility="hidden"
              />
              <div className="flex flex-col">
                <div className="pb-2">Upload Image</div>

                {image || singleTask?.file? (
                  <div className="pt-4">
                    <div>
                      <img
                        className="-object-contain -mt-8 p-5 w-1/2"
                        src={image ? image.image : singleTask?.file}
                        alt=""
                      />
                    </div>
                  </div>
                ) : (
                  <div className="pb-5">
                    <img
                      src="/upload-image.svg"
                      style={{ background: "#EFEFEF" }}
                      className="h-full w-48"
                    />
                  </div>
                )}
              </div>
            </label>
          </div>
          <div className="flex items-center justify-cente px-5">
            <button
              className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
              onClick={uploadImage}
              disabled={loading ? true : false}
             >
               {loading ? "Loading..." : " upload image"}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="status"
              >
                Status
                </label>

                <div className="flex flex-col">
                  <div className="pb-2">
                    <select
                      name="status"
                      className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                      id="status"
                      defaultValue={singleTask?.status}
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                      {...register("status", { required: true })}
                    >
                      <option value="todo">Todo</option>
                      <option value="incomplete">Incomplete</option>
                      <option value="complete">Completed</option>
                    </select>
                    {errors.status && errors.status.type === "required" && (
                      <p className="text-red-500 text-xs italic">
                        Please select a status.
                      </p>
                    )}
                  </div>
                </div>
            </div>
          </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              rows="10"
              name="description"
              defaultValue={singleTask?.description}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              {...register("description", {
                required: true,
              })}
            ></textarea>
            {errors.description && errors.description.type === "required" && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
          <div className="flex justify-between w-full px-3">
            <button
              className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
              type="submit"
            >
              {loading ? "Loading" : " Update Task"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditTask;
