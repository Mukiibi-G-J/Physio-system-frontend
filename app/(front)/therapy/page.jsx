"use client";
import { handleClientScriptLoad } from "next/script";
import React, { useEffect } from "react";
import axios from "../../_lib/axios/axios";
import { convertToObject } from "typescript";
import { useSnackbar } from "notistack";
import { redirect } from "next/dist/server/api-utils";

function Proper({ currentPatient, existmodel, modelopen }) {
  console.log(currentPatient);
  localStorage.setItem("currentPatient_Physio", JSON.stringify(currentPatient));

  console.log(currentPatient, existmodel, modelopen.replace(/'/g, ""));
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* {existmodel === true && ( */}
      <dialog id="my_modal_exists" className="modal">
        <div className="modal-box   bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="font-bold text-lg"></h3>

          <p className="py-4 text-xl text-black">
            <sapn className="font-bold text-lg">
              {currentPatient?.firstname} {currentPatient?.lastname}
            </sapn>
            already exists in the system. Do you want to continue?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* )} */}
      {/* {existmodel === false && ( */}
      <dialog id="my_modal_not_exists" className="modal">
        <div className="modal-box   bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <p className="py-4 text-lg text-black">
            <span className="font-bold text-lg">
              {" "}
              {currentPatient?.firstname} {currentPatient?.lastname}{" "}
            </span>{" "}
            Does not exist in the system. Please click to proceed to creation
          </p>
          <div className="modal-action flex items-centers justify-between ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("form_model_proper").showModal();
                const modal = document.getElementById("my_modal_not_exists");

                if (modal) {
                  modal.removeAttribute("open");
                  modal.remove();
                }
              }}
            >
              Proceed
            </button>
          </div>
        </div>
      </dialog>
      {/* )} */}

      <button
        className="btn"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("my_modal_1").showModal();
        }}
      >
        open modal
      </button>
    </>
  );
}
function FormProper() {
  // get from local storage
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const currentPatient = JSON.parse(
    localStorage.getItem("currentPatient_Physio")
  );
  const formSubmit = async (currentPatient) => {
    closeSnackbar();

    try {
      const response = await axios.post("/patients/create/", {
        firstname: currentPatient?.firstname,
        lastname: currentPatient?.lastname,
        patientno: currentPatient?.patientno,
        gender: currentPatient?.genderid_id === "15M" ? "MALE" : "FEMALE",
        dob: currentPatient?.birthdate?.split("T")[0],
        phoneno: currentPatient?.phone,
        address: currentPatient?.address,
      });
      const modal = document.getElementById("form_model_proper");
      console.log(modal);
      

      if (response.status === 200) {
        enqueueSnackbar("Patient Created", { variant: "success" });
        window.location.reload();
        // const modal = document.getElementById("form_model_proper");
        // console.log(modal);
        // if (modal) {
        //   modal.removeAttribute("open");
        // }
        console.log(response.data);
        

      }
    } catch (error) {
      console.log(error);
      console.error(error);
      enqueueSnackbar("Error creating patient", { variant: "error" });
    }
  };
  return (
    <div>
      <dialog id="form_model_proper" className="modal">
        <div className="modal-box   bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="font-bold text-lg">Create Patient</h3>

          <div className="py-4 text-xl text-black">
            <form onSubmit={formSubmit} action="#" method="post">
              <div className="mb-4.5 flex flex-col ">
                <div className="flex items-center  space-x-4">
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">
                      First name
                    </label>
                    <input
                      value={currentPatient?.firstname}
                      type="text"
                      name="firstname"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:text-white text-[18px]"
                    />
                  </div>

                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">
                      Last name
                    </label>

                    <input
                      readOnly
                      value={currentPatient?.lastname}
                      type="text"
                      name="lastname"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3  text-[18px] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center  space-x-4">
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">
                      Patient No
                    </label>
                    <input
                      value={currentPatient?.patientno}
                      readOnly
                      type="text"
                      name="patientno"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3  text-[18px] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">
                      gender
                    </label>
                    <input
                      readOnly
                      value={
                        currentPatient?.genderid_id === "15M"
                          ? "Male"
                          : "Female"
                      }
                      type="text"
                      name="gender"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3  text-[18px] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center  space-x-4">
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">
                      Date of Birth
                    </label>
                    <input
                      readOnly
                      value={currentPatient?.birthdate?.split("T")[0]}
                      type="text"
                      name="dob"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 text-md text-[18px] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">
                      Phone Number
                    </label>
                    <input
                      value={currentPatient?.phone}
                      type="text"
                      name="phone"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 text-[18px] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center  space-x-4">
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">
                      Address
                    </label>
                    <input
                      value={currentPatient?.address}
                      type="text"
                      name="address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3  text-[18px] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:text-white"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="btn"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    formSubmit(currentPatient);
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* <div className="modal-action">
            <form method="dialog">
              
              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </div> */}
        </div>
      </dialog>
    </div>
  );
}

function TherapySession() {
  const [patientdata, setPatientData] = React.useState([]);
  const [searchpopup, setSearchPopup] = React.useState(false);
  const [currentPatient, setCurrentPatient] = React.useState(null);
  const [existmodel, setExistModel] = React.useState("");
  const [modelopen, setModelOpen] = React.useState("");
  useEffect(() => {
    // reset all states
    setPatientData([]);
    setSearchPopup(false);
    setCurrentPatient(null);
    setExistModel("");
  }, []);

  const handleSearch = async (value) => {
    if (value.length < 2) {
      setPatientData([]);
    }
    if (value.length > 8) {
      setSearchPopup(true);
      console.log(value);
      const response = await axios(
        `/patients/patients_search/?search=${value}`,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setPatientData(response.data);
        console.log(response.data);
      }
    }
  };
  const getPatient = async (patientno) => {
    console.log("onClick");
    setSearchPopup(false);

    try {
      const response = await axios.get(`/patients/detail/${patientno}/`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      console.log(response.data);
      // clear the search results
      if (response.status === 200) {
        if (response.data.patient_exists === true) {
          document.getElementById("my_modal_exists").showModal();
          console.log("it runs");
          setExistModel(true);
          setCurrentPatient(response.data);
        }

        if (response.data.patient_exists === false) {
          document.getElementById("my_modal_not_exists").showModal();

          my_modal_not_exists;
          setExistModel(false);
          setCurrentPatient(response.data);
        }
        e;
      }
      setPatientData([]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <>
        {/* <Breadcrumb pageName="FormLayout" /> */}
        <div className=" w-1/2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form className="p-4">
            <div className="w-full xl:w-1/2">
              <Proper
                existmodel={existmodel}
                currentPatient={currentPatient}
                modelopen={modelopen}
              />
              <label className="mb-2.5 block text-black dark:text-white">
                Search
              </label>
              <input
                onKeyUp={(e) => {
                  console.log(e.target.value);
                  handleSearch(e.target.value);
                }}
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              <FormProper />
            </div>
            {/*  patient data results  div  */}
            {searchpopup && (
              <div className="w-full xl:w-1/2">
                <div className="z-100 w-full rounded  border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  {patientdata.slice(0, 6).map((patient) => (
                    <div
                      key={patient.patientno}
                      className="flex flex-col gap-9"
                    >
                      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div
                          className="border-b border-stroke py-4 px-6.5 dark:border-strokedark"
                          onClick={(e) => {
                            getPatient(patient.patientno);
                          }}
                        >
                          <h3 className="font-medium text-black dark:text-white hover:text-yellow-500">
                            {patient.patientno} {patient.firstname}{" "}
                            {patient.lastname}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>
        <div className="grid grid-cols-12  sm:grid-cols-1">
          <div className="flex flex-col flex-grow">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Daily Therapy
                </h3>
              </div>

              <form action="#">
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col f  xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Last name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your last name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Select subject"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Subject
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="">Type your subject</option>
                        <option value="">USA</option>
                        <option value="">UK</option>
                        <option value="">Canada</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Type your message"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>

                  <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default TherapySession;
