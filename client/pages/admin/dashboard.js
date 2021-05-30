import React, { useEffect, useState, useRef } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons

import BugReport from "@material-ui/icons/BugReport";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";

import { bugs, website, server } from "variables/general.js";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import axios from "axios";

function Dashboard() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [data, setData] = useState({});
  const [balance, setBalance] = useState({ "CENNZ": 0, "CPAY": 0 })
  const [delegates, setDelegates] = useState([]);
  const [delegateIx, setIx] = useState([0])
  const valueRef = useRef('')
  const revokeRef = useRef('')

  function handleData(data) {
    let delegates = [];
    for (let i = 0; i < data.length; i++) {
      delegates.push([data[i].attributes[0].Text])
    }
    console.log(delegates)
    return delegates;
  }

  function handleIx(data) {
    let ix = [];
    for (let i = 0; i < data.length; i++) {
      ix.push(i);
    }
    return ix;
  }

  const addDelegate = () => {
    axios({
      method: 'post',
      url:'http://localhost:7000/addDelegate', 
      data:{
      address: valueRef.current.value,
    }})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const revokeDelegate = () => {
    axios({
      method: 'post',
      url:'http://localhost:7000/revokeDelegate', 
      data:{
      address: revokeRef.current.value,
    }})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    const fetchDelegates = async () => {
      const result = await axios(
        'http://localhost:7000/admin/delegators',
      );

      console.log(result.data);
      let d = await handleData(result.data);
      let ix = await handleIx(result.data);
      setDelegates(d);
      setIx(ix);

    };

    fetchDelegates();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:7000/',
      );
      setData(result.data);
      setBalance({ "CENNZ": result.data.CENNZ, "CPAY": result.data.CPAY });
    };

    fetchData();
  }, []);

  return (
    <div>
      <GridContainer>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="dark">
                <Icon>
                </Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Centrality CENNZ</p>
              <h3 className={classes.cardTitle}>
                {balance.CENNZ} <small>CENNZ</small>
              </h3>
            </CardHeader>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="dark">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Centrality CPAY</p>
              <h3 className={classes.cardTitle}>
                {balance.CPAY} <small>CPAY</small>
              </h3>
            </CardHeader>
          </Card>
        </GridItem>
      
      </GridContainer>
      
      <GridContainer>
            <GridItem xs={12} sm={12} md={12} >
              <CustomTabs
                title="Entities:"
                headerColor="dark"
                tabs={[
                  {
                    tabName: "Delegators",
                    tabIcon: BugReport,
                    tabContent: (
                      <Tasks
                        checkedIndexes={[]}
                        tasksIndexes={delegateIx}
                        tasks={delegates}
                      />
                    ),
                  },
                  {
                    tabName: "Add a delegator",
                    tabIcon: BugReport,
                    tabContent: (
                      <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                          id="standard-full-width"
                          label="Attribute"
                          style={{ margin: 8 }}
                          placeholder="5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
                          helperText="Add Delegator"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputRef={valueRef}
                        />
                        <Button
                          variant="contained"
                          onClick={addDelegate}
                        >
                          Add delegator</Button>
                      </form>
                    )
                  },
                  {
                    tabName: "Revoke a delegator",
                    tabIcon: BugReport,
                    tabContent: (
                      <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                          id="standard-full-width"
                          label="Address"
                          style={{ margin: 8 }}
                          placeholder="5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
                          helperText="Delegator address"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputRef={revokeRef}
                        />
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={revokeDelegate}
                        >
                          Revoke delegator</Button>
                      </form>
                    )
                  }

                ]}
              />
            </GridItem>
          </GridContainer>

    </div>
  );
}

Dashboard.layout = Admin;

export default Dashboard;
