import React, { useEffect, useState } from "react";
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

import { bugs, website, server } from "variables/general.js";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import axios from "axios";

function Dashboard() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [data, setData] = useState({});
  const [balance, setBalance] = useState({ "CENNZ": 0, "CPAY": 0 })
  const [delegators, setDelegators] = useState([[null, null, null ]]);
  const [delegatorAddr, setDelegatorAddr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:7000/',
      );
      setData(result.data);
      setBalance({ "CENNZ": result.data.CENNZ, "CPAY": result.data.CPAY });
      setDelegators(result.data.delegators)
      setDelegatorAddr(result.data.delegatorAddresses);
      console.log(bugs)
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
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3, 4, 5, 6, 7]}
                    tasks={[]}
                  />
                ),
              },

            ]}
          />
        </GridItem>

        
      </GridContainer>
    </div>
  );
}

Dashboard.layout = Admin;

export default Dashboard;
