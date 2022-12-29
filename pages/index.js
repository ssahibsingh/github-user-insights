import Head from "next/head";
import { GoGist, GoRepo } from "react-icons/go";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import UserCard from "../components/UserCard";
import PublicRepos from "../components/PublicRepos";

export default function Home() {
  const [username, setUsername] = useState("ssahibsingh");
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get("/api/getData", { params: { username } })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  const initialValues = {
    ghusername: "",
  };

  const handleSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true);
    axios
      .post("/api/getData", { username: values.ghusername })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.user);
          setError(null);
          setUsername(values.ghusername);
        } else {
          setError(res.data.error.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    onSubmitProps.resetForm();
    onSubmitProps.setSubmitting(false);
  };

  const detailsData = [
    {
      id: 1,
      icon: <GoRepo />,
      title: "Public Repos",
      value: data.repositories ? data.repositories.totalCount : 0,
      color: "pink",
    },
    {
      id: 2,
      icon: <FiUsers />,
      title: "Followers",
      value: data.followers ? data.followers.totalCount : 0,
      color: "green",
    },
    {
      id: 3,
      icon: <FiUserPlus />,
      title: "Following",
      value: data.following ? data.following.totalCount : 0,
      color: "purple",
    },
    {
      id: 4,
      icon: <GoGist />,
      title: "Gists",
      value: data.gists ? data.gists.totalCount : 0,
      color: "yellow",
    },
  ];

  return (
    <>
      <Head>
        <title>Github Insights</title>
      </Head>
      <Navbar />
      <main className="bg-light py-5 page">
        <div className="container">
          <div className="search-container">
            <div className="row">
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="d-flex justify-content-center">
                  <div className="col-md-4 col-sm-6 col-8">
                    <Field
                      type="text"
                      className="form-control"
                      id="ghusername"
                      name="ghusername"
                      placeholder="Enter Github username"
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-auto margin-left-3">
                    <button type="submit" className="btn btn-search mb-3">
                      Search
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
            <p className="text-center text-danger fs-6">{error}</p>
          </div>

          <Cards detailsData={detailsData} />

          <div className="user-container">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-12 my-2">
                <UserCard data={data} username={username} />
              </div>
              <div className="col-md-6 col-sm-6 col-12 my-2">
                <PublicRepos data={data} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
