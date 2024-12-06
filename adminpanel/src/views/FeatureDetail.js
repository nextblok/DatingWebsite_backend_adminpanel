import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import Moment from "moment";
import NotificationAlert from "react-notification-alert";
import ReactTable from "components/ReactTable/ReactTable2.js";

const Page = ({ credential }) => {
  const { id } = useParams();
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

  const [userinfo, setUserinfo] = useState({});
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ApiCall(
          apiConfig.feature_get.url,
          apiConfig.feature_get.method,
          credential.loginToken,
          { _id: id }
        );
        if (response.data.result) {
          setData(response.data.data);
        } else {
          notify(response.data.data, "danger");
        }
      } catch (error) {
        notify("Failed", "danger");
      }
    })();
  }, []);

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="content">
        <Button
          color="btn1 btn-sm mb-3"
          onClick={() => {
            window.location.href = "/admin/feature";
          }}
        >
          Go back
        </Button>
        <Row>
          <Col xs={12} md={12}>
            <Card id="pdf">
              <CardHeader>
                <CardTitle tag="h3">
                  <div className="flex-row">
                    {/* {project.name} */}
                    {/* <div style={{ float: "right" }}>
                      {isExport && (
                        <>
                          <span
                            style={{
                              cursor: "pointer",
                              fontSize: 16,
                              color: "rgba(34, 42, 66, 0.7)",
                            }}
                            // onClick={() => exportPDF()}
                          >
                            PDF
                          </span>
                          <span
                            style={{
                              marginLeft: 20,
                              cursor: "pointer",
                              fontSize: 16,
                              color: "rgba(34, 42, 66, 0.7)",
                            }}
                            // onClick={() => exportExcel(pledges, profits)}
                          >
                            Excel
                          </span>
                        </>
                      )}
                    </div> */}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row style={{ marginLeft: 5 }}>
                  <h4>{`Question: ${data.question}`}</h4>
                </Row>
                <Row style={{ marginLeft: 5 }}>
                  <h4>{`Weight: ${data.weight}`}</h4>
                </Row>
                <Row style={{ marginLeft: 5 }}>
                  <h4>Answers: Total {data.answers?.length}</h4>
                </Row>
                <Row style={{ marginLeft: 5 }}>
                  <Button
                    color="primary"
                    size="sm"
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                      const newAnswers = [...data.answers, ""];
                      setData({ ...data, answers: newAnswers });
                    }}
                  >
                    Add Answer
                  </Button>
                </Row>
                {data.answers &&
                  data.answers.map((answer, index) => (
                    <Row
                      key={index}
                      style={{ marginLeft: 25, marginBottom: 10 }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "80%" }}
                        value={answer}
                        onChange={(e) => {
                          const newAnswers = [...data.answers];
                          newAnswers[index] = e.target.value;
                          setData({ ...data, answers: newAnswers });
                        }}
                      />
                      <Button
                        color="danger"
                        size="sm"
                        style={{ marginLeft: 10 }}
                        onClick={() => {
                          const newAnswers = data.answers.filter(
                            (_, i) => i !== index
                          );
                          setData({ ...data, answers: newAnswers });
                        }}
                      >
                        Remove
                      </Button>
                    </Row>
                  ))}
                <Row style={{ marginLeft: 5, marginTop: 15 }}>
                  <Button
                    color="success"
                    onClick={async () => {
                      try {
                        const response = await ApiCall(
                          apiConfig.feature_upsert.url,
                          apiConfig.feature_upsert.method,
                          credential.loginToken,
                          {
                            _id: id,
                            question: data.question,
                            answers: data.answers,
                            weight: data.weight,
                          }
                        );
                        if (response.data.result) {
                          notify("Successfully updated", "success");
                        } else {
                          notify(response.data.data, "danger");
                        }
                      } catch (error) {
                        notify("Failed to update", "danger");
                      }
                    }}
                  >
                    Save Changes
                  </Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { LoginReducer } = state;
  return { credential: LoginReducer };
};

export default connect(mapStateToProps)(Page);
