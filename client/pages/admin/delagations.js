import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Quote from "components/Typography/Quote.js";
import Muted from "components/Typography/Muted.js";
import Primary from "components/Typography/Primary.js";
import Info from "components/Typography/Info.js";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Icon from "@material-ui/core/Icon";
import BugReport from "@material-ui/icons/BugReport";


// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import CardIcon from "components/Card/CardIcon.js";


const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

function DelagationsPage() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="dark">
        <h4 className={classes.cardTitleWhite}>Your delegations</h4>
      </CardHeader>
      <CardBody>
      <div>
      
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
              {
                tabName: "Add a delegate",
                tabIcon: BugReport,
              }

            ]}
          />
        </GridItem>

        
      </GridContainer>
    </div>
      </CardBody>
    </Card>
  );
}

DelagationsPage.layout = Admin;

export default DelagationsPage;
