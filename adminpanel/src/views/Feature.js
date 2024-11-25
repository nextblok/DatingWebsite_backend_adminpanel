import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
  Modal,
  Input,
  Label,
  Form,
  FormGroup,
  CustomInput,
} from "reactstrap";
import Moment from "moment";
import NotificationAlert from "react-notification-alert";
import ReactTable from "components/ReactTable/ReactTable.js";

const Page = ({ credential }) => {
  const FieldName = "Question"; // display name on page
  const DetailPageLink   = "/admin/feature/"; //link to detail page, by clicking action button
  
  const [rows, setRows] = useState([]); //rows is the data that will be displayed in the table
  const [modalData, setModalData] = useState({}); //one row that will be edited or added in modal
  const [show1, setShow1] = useState(false); //modal for edit or add
  const [show2, setShow2] = useState(false); //modal for delete

  const { apiConfig, ApiCall } = global;
  const notificationAlertRef = React.useRef(null);

  const notify = (message, type) => {
    let options = {};
    options = {
      place: "tr",
      message: message,
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  //fetch inital data from server
  const fetchRows = async () => {
    try {
      const response = await ApiCall(
        apiConfig.feature_get.url,
        apiConfig.feature_get.method,
        credential.loginToken
      );
      if (response.data.result) {
        let rowsFetched = response.data.data;
        console.log(rowsFetched);
        let newRows = rowsFetched.map((row) => {
          return {
            ...row,
            createdAt: Moment(row.createdAt).format("DD/MM/YYYY hh:mm:ss"),
            actions: (
              <div className="actions-right">
                <Button
                  onClick={() => openModal1(row)}
                  color="warning"
                  size="sm"
                  className={classNames("btn-icon btn-link like btn-neutral")}
                  title="Edit"
                >
                  <i className="tim-icons icon-pencil" />
                </Button>
                <Button
                  color="info"
                  size="sm"
                  className={classNames("btn-icon btn-link like btn-neutral")}
                  onClick={() =>
                    (window.location.href = DetailPageLink + row._id)
                  }
                  title="Detail"
                >
                  <i className="tim-icons icon-notes" />
                </Button>
                <Button
                  onClick={() => openModal2(row)}
                  color="danger"
                  size="sm"
                  className={classNames("btn-icon btn-link like btn-neutral")}
                  title="Delete"
                >
                  <i className="tim-icons icon-trash-simple" />
                </Button>
              </div>
            ),
          };
        });
        console.log(newRows);
        setRows(newRows);
      } else {
        notify(response.data.data, "danger");
      }
    } catch (error) {
      notify("Failed", "danger");
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const openModal1 = (data) => {
    setModalData(data);
    setShow1(true);
  };

  const closeModal1 = () => {
    setModalData({});
    setShow1(false);
  };

  const openModal2 = (data) => {
    setModalData(data);
    setShow2(true);
  };

  const closeModal2 = () => {
    setModalData({});
    setShow2(false);
  };

  const save = async (pro) => {
    try {
      const response = await ApiCall(
        apiConfig.feature_upsert.url,
        apiConfig.feature_upsert.method,
        credential.loginToken,
        pro
      );
      if (response.data.result) {
        await fetchRows();
      } else {
        notify(response.data.data, "danger");
      }
    } catch (error) {
      notify("Failed", "danger");
    }
    setModalData({});
    setShow1(false);
  };

  const remove = async (data) => {
    try {
      const response = await ApiCall(
        apiConfig.news_del.url,
        apiConfig.news_del.method,
        credential.loginToken,
        data
      );
      if (response.data.result) {
        const response = await ApiCall(
          apiConfig.news_get.url,
          apiConfig.news_get.method,
          credential.loginToken
        );
        if (response.data.result) {
          setRows(response.data.data);
        } else {
          notify(response.data.data, "danger");
        }
      } else {
        notify(response.data.data, "danger");
      }
    } catch (error) {
      if (error.response) notify(error.response.data.data, "danger");
      else if (error.request) notify("Request failed", "danger");
      else notify("Something went wrong", "danger");
    }
    setModalData({});
    setShow2(false);
  };

  const [data, setData] = useState([]);

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="content">
        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h3">{FieldName}</CardTitle>
              </CardHeader>
              <CardBody>
                <Button color="btn1" size="sm" onClick={() => openModal1({})}>
                  Add {FieldName}
                </Button>
                <div>
                  <ReactTable
                    style={{ width: "100%", borderCollapse: "collapse" }}
                    data={rows}
                    filterable
                    resizable={false}
                    columns={[
                      {
                        Header: "Name",
                        accessor: "name",
                      },
                      {
                        Header: "Label",
                        accessor: "label",
                      },
                      {
                        Header: "Weight",
                        accessor: "weight",
                      },
                      {
                        Header: "Values",
                        accessor: "values",
                        Cell: (row) => (row.value ? row.value.length : 0), //get count of values, row means the accessor, row.value means the values array
                      },
                      {
                        Header: "Actions",
                        accessor: "actions",
                        sortable: false,
                        filterable: false,
                      },
                    ]}
                    defaultPageSize={10}
                    showPaginationTop
                    showPaginationBottom={false}
                    openModal={openModal1}
                    className="-striped -highlight"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {/* modal for edit or add */}
      <Modal isOpen={show1}>
        <div className="modal-header">
          <h4>
            {modalData._id ? "Edit " : "Add "}
            {FieldName}
          </h4>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => closeModal1()}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>
        <div className="modal-body">
          <Form className="form-horizontal">
            <Row>
              <Label md="3">Name</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="text"
                    value={modalData.name}
                    onChange={(e) => {
                      setModalData({ ...modalData, name: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Label</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="text"
                    value={modalData.label}
                    onChange={(e) => {
                      setModalData({ ...modalData, label: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Weight</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="number"
                    value={modalData.weight}
                    onChange={(e) => {
                      setModalData({ ...modalData, weight: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ float: "right", marginRight: "2px" }}>
              <Button color="btn1 btn-sm" onClick={() => save(modalData)}>
                {modalData._id ? "Update" : "Save"}
              </Button>
              <Button color="btn1 btn-sm" onClick={() => closeModal1()}>
                Cancel
              </Button>
            </Row>
          </Form>
        </div>
      </Modal>
      <Modal isOpen={show2}>
        <div className="modal-header">
          <h4>Are you sure you want to delete this {FieldName}?</h4>
        </div>
        <div className="modal-body">
          <Row style={{ float: "right", marginRight: "2px" }}>
            <Button color="btn1 btn-sm" onClick={() => remove(modalData)}>
              Confirm
            </Button>
            <Button color="btn1 btn-sm" onClick={() => closeModal2()}>
              Cancel
            </Button>
          </Row>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  const { LoginReducer } = state;
  return { credential: LoginReducer };
};

export default connect(mapStateToProps)(Page);
