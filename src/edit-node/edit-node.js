import React, { useState } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import JSONDigger from "json-digger";

import { Box, Paper, makeStyles } from "@material-ui/core";
import "./edit-node.css";

const useStyles = makeStyles({
  conainer: {
    border: "unset"
  },
  chart: {
    backgroundImage: "unset"
  }
});

const company = {
  id: "a1",
  name: "ZMVP"
};

const teams = ["Team 1", "Team 2", "Team 3", "Team 4"];

const formatData = (company, teams) => {
  const data = {
    id: company.id,
    name: company.name,
    children: []
  };
  teams.forEach((team) => {
    data.children.push({
      id: team.replace(/\s+/gi, ""),
      name: team,
      parentId: company.id,
      companyId: company.id
    });
  });
  return data;
};

const EditNode = () => {
  const classes = useStyles();
  const datasource = formatData(company, teams);
  const [ds, setDS] = useState(datasource);
  const dsDigger = new JSONDigger(ds, "id", "children");
  const [selectedNode, setSelectedNode] = useState();
  const [newNodeName, setNewNodeName] = useState("");
  const [newChildNodeName, setNewChildNodeName] = useState("");
  console.log("ds", ds);
  const readSelectedNode = (nodeData) => {
    setSelectedNode(nodeData);
    setNewNodeName(nodeData.name);
  };
  const clearSelectedNode = () => {
    setSelectedNode(null);
  };

  const template = ({ nodeData: { name } }) => {
    return (
      <Paper elevation={2}>
        <Box p={2}>{name}</Box>
      </Paper>
    );
  };

  const formatJson = (node, parentId) => {
    const data = {
      id: node.id,
      name: node.name,
      companyId: node.companyId,
      parentId,
      children: []
    };
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        data.children.push(formatJson(child, node.id));
      });
    }
    return data;
  };

  return (
    <div className="edit-chart-wrapper">
      <OrganizationChart
        containerClass={classes.conainer}
        chartClass={classes.chart}
        NodeTemplate={template}
        draggable
        datasource={ds}
        collapsible={false}
        onClickNode={readSelectedNode}
        onClickChart={clearSelectedNode}
      />
    </div>
  );
};

export default EditNode;
