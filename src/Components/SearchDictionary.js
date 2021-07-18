import React, { useState, useEffect } from "react";
import Redux from "redux";
import { connect } from "react-redux";
// import {mapStatetoProps} from 'redux'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
// import AddIcon from '@material-ui/icons/Add';
import { Fab } from "@material-ui/core";
import { postData } from "../redux/actions/actionDic";
import { Add } from "@material-ui/icons";
import axios from "axios";
import Button from "@material-ui/core/Button";

import * as dictActions from "../redux/actions/actionDic";
import { useDispatch, useSelector } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import addDictionaryData from "./addDictionary";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
// import Label from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

let obj = {
  title: "new",
};

const Dictionary = (props) => {
  const dispatch = useDispatch();

  const [title, settitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [postData, setPostData] = useState("");
  const [newWord, setNewWord] = useState("");
  // const [allData, setAllData] = useState([]);

  const allData = useSelector((state) => state.dictionaryData.allData);

  const handleClose = () => {
    setOpenDialog(false);
  };
  const fetchAllData = async () => {
    try {
      await dispatch(dictActions.fetchAll());
    } catch (err) {
      console.log(err);
    }
    // const allDataResponse =
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  // useEffect(() => {
  //   fetchAllData();
  // }, [allData.length]);

  const handleSubmit =async() => {
    console.log("u clicked");
    console.log(dictActions, "act");
   
   try{
    await dispatch( dictActions.postData({ 'title': newWord }))
   }catch(err){
     console.log(err)
   }
   setOpenDialog(false);
  };
  const handleInput = (e) => {
    console.log(e.target.value);
    setNewWord(e.target.value);
  };
  const wordSearch = async(e) => {
    try{
     await dispatch( dictActions.fetchSearchData(e.target.value))
    }catch(err){
      console.log(err)
    }
    
   
  };

  return (
    <Card>
      <CardContent style={{backgroundColor:'purple',color:'white'}}>
      <label style={{color:'white',fontSize:'24px'}}>Vocab</label>
      <TextField id="standard-basic" label="" style={{align:'center',width:'70rem'}} onChange={wordSearch} />
      <SearchIcon  style={{}} />
      </CardContent>
    <CardContent style={{borderRadius:'2rem'}}>
      {allData &&
        allData.map((data) => {
          return (
            <CardContent>
              <Typography>{data.word}</Typography>
              <Typography>{data.definition}</Typography>
            </CardContent>
          );
        })}

      <Fab
        className=""
        color="primary"
        aria-label="add"
        onClick={() => setOpenDialog(true)}
        style={{float:'right'}}
      >
        <Add />
      </Fab>
      <Dialog
        
        open={openDialog}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle align="center"></DialogTitle>
        <DialogContent dividers>
          <DialogTitle>Add</DialogTitle>
        
            <TextField
              id="standard-basic"
              label="Standard"
              onChange={handleInput}
              value={newWord}
            />
        

          
        </DialogContent>
        <DialogActions>
          
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      </CardContent>
    </Card>
  );
};

export default Dictionary;
