import React, { useEffect, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [inputData, setInputData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleInputValue = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const status = form.status.value;
    const data = { name, status };
    setInputData([...inputData, data]);
    form.reset();
  };

  useEffect(() => {
    if (show === 'active') {
      const activeStatus = inputData.filter((data) => data.status === 'active');
      setFilteredData(activeStatus);
    } else if (show === 'completed') {
      const completedStatus = inputData.filter((data) => data.status === 'completed');
      setFilteredData(completedStatus);
    } else {
      const sortedData = inputData.sort((a, b) => {
        if (a.status === 'active' && b.status !== 'active') {
          return -1;
        } else if (a.status !== 'active' && b.status === 'active') {
          return 1;
        } else if (a.status === 'completed' && b.status !== 'completed') {
          return -1;
        } else if (a.status !== 'completed' && b.status === 'completed') {
          return 1;
        } else {
          return 0;
        }
      });
      setFilteredData(sortedData);
    }
  }, [show, inputData]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6">
          <form
            onSubmit={handleInputValue}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                name="status"
                type="text"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => setShow("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => setShow("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => setShow("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
