import Head from "next/head";
import { Inter } from "@next/font/google";
import { GoGist, GoRepo } from "react-icons/go";
import { FiLink, FiUserPlus, FiUsers } from "react-icons/fi";
import { CgOrganisation } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
import Navbar from "../components/Navbar";
import Link from "next/link";
import axios from "axios";
import { Field, Form, Formik } from "formik";

export default function Home() {
  const [username, setUsername] = useState("ssahibsingh");
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .post("/api/getData", { username })
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
    // console.log(values);
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

          <div className="detail-container">
            <div className="row">
              {detailsData.map((detail) => {
                return (
                  <div className="col-md-3 col-sm-6 col-6 my-1" key={detail.id}>
                    <div className="d-flex border detail h-100 align-items-center">
                      <div className="icon">
                        <span className={`icon-${detail.color}`}>
                          {detail.icon}
                        </span>
                      </div>
                      <div className="detail-content">
                        <h4>{detail.value}</h4>
                        <p>{detail.title}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="user-container">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-12 my-2">
                <div className="detail user-detail-1 border p-3">
                  <div className="d-flex justify-content-between my-3">
                    <div className="">
                      <h2>{data.name ? data.name : username}</h2>
                      {data.name && (
                        <p>
                          <Link
                            href={`https://github.com/${username}`}
                            className="text-decoration-none"
                          >
                            @{username}
                          </Link>
                        </p>
                      )}
                    </div>
                    <div className="mx-2">
                      {data.name && (
                        <Image
                          src={data.avatarUrl}
                          alt={data.name}
                          width={80}
                          height={80}
                        />
                      )}
                    </div>
                  </div>
                  <p>{data.bio}</p>
                  <ul className="list-unstyled">
                    {data.company && (
                      <li>
                        <span className="mx-2">
                          <CgOrganisation />
                        </span>
                        {data.company}
                      </li>
                    )}
                    {data.location && (
                      <li>
                        <span className="mx-2">
                          <IoLocationOutline />
                        </span>
                        {data.location}
                      </li>
                    )}
                    {data.websiteUrl && (
                      <li>
                        <span className="mx-2">
                          <FiLink />
                        </span>
                        <Link
                          href={data.websiteUrl}
                          className="text-decoration-none"
                        >
                          {data.websiteUrl}
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-12 my-2">
                <div className="detail user-detail-1 border p-3">
                  <div className="mt-3">
                    <h4 className="">Public Repositories </h4>
                  </div>
                  {data.repositories && (
                    <p className="text-muted">
                      {data.repositories.nodes.length} /{" "}
                      {data.repositories.totalCount}
                    </p>
                  )}
                  <div className="d-flex justify-content-between">
                    <ul className="list-unstyled">
                      <li></li>
                      {data.repositories &&
                        data.repositories.nodes.map((repo) => {
                          return (
                            <li key={repo.name}>
                              <Link
                                href={repo.url}
                                className="text-decoration-none fs-6"
                              >
                                {repo.name}
                              </Link>
                            </li>
                          );
                        })}
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
