import React, {Component} from 'react';
import Topbar from "../../components/Topbar";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import "video-react/dist/video-react.css"; // import css
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import firebase from "firebase";
import  Loader from "../../components/Loader"




import Snackbar from "@material-ui/core/Snackbar"

import { Player } from 'video-react';




class AddRecette extends Component {
    constructor(props){
        super(props);
        this.state={
            test:45,
            data:{
                nomRecette:"",
                Duree_prepa_repas:"",
                Duree_Cuission:"",
                Nombre_person:"",
                Nombre_calorie:"",
                Pourcentrage_glucides:"",
                Pourcentrage_lipides:"",
                Pourcentrage_proteines:"",
                Gramme_Glucide:"",
                Gramme_Lipide:"",
                Gramme_Proteine:"",
                Ingredients:"",
                Preparation:"",
                photo :"",
                video:"",
                Tendances:"",
                plat:"",



            },
            openAlert: false,
            alertMessage: "",
            alertType: "",
            loading :false,
            percentage:"",
            dataLength:"",
            recettes:[]
        }
}

componentDidMount() {
    firebase.database().ref("recettes/").on("value", (snapshot) => {
        let recettes = snapshot.val();

        let rets =[]
        for (let i =0 ;i<recettes.length;i++){

            rets.push(recettes[i])

        }

        this.setState(   {recettes:rets})





    })
}

    handleChange(event,name){
        if (name==="photo"||name==="video"){
           let data = this.state.data
            data[name]=event.target.files[0]
            this.setState({data:data})

        }else {


            let data = this.state.data
            data[name] = event.target.value
            this.setState({data: data})
        }
}
    uploadImage(event) {


        var photo = event.target.files[0]

        if (photo !== undefined) {


            this.setState({loading: true})


            var storageRef = firebase.storage().ref().child('/recettes/' + photo.name);
            var file = photo;
            var uploadTask = storageRef.put(file);


            uploadTask.on('state_changed', snapshot => {

                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                this.setState({percentage: percentage.toFixed(2)})

                //this.uploadPercent = progress.toFixed(2) + ' %';
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    /* no default */

                }
            }, error => {
                console.log(error);
            }, () => {

                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    console.log('File available at', downloadURL);
                    let data = this.state.data;
                    data.photo = downloadURL;
                    this.setState({
                        data: data
                    });
                    this.setState({loading: false});

                });
            });


        }
    }
    uploadVideo(event) {


        var video = event.target.files[0]


        if (video !== undefined) {
            this.setState({loading: true})
            var storageRef = firebase.storage().ref().child('/recettes/' + video.name);
            var file = video;
            var uploadTask = storageRef.put(file);


            uploadTask.on('state_changed', snapshot => {
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                this.setState({percentage: percentage.toFixed(2)})
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    /* no default */
                }
            }, error => {
                console.log(error);
            }, () => {

                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    console.log('File available at', downloadURL);
                    let data = this.state.data;
                    data.video = downloadURL;
                    this.setState({
                        data: data
                    });
                    this.setState({loading: false});

                });
            });
        }
    };

    verify(){
        let data = this.state.data
        if (
            data.nomRecette===""||
            data.Duree_prepa_repas===""||
            data.Duree_Cuission===""||
            data.Nombre_person===""||
            data.Nombre_calorie===""||
            data.Pourcentrage_glucides===""||
            data.Pourcentrage_lipides===""||
            data.Pourcentrage_proteines===""||
            data.Gramme_Glucide===""||
            data.Gramme_Lipide===""||
            data.Gramme_Proteine===""||
            data.Ingredients===""||
            data.Preparation===""||
            data.photo ===""||
            data.video===""
        ){
            return true
        }else {
            return false
        }
    }


    saveData(){


        let recettes = this.state.recettes
        recettes.push(this.state.data)

        firebase.database().ref("recettes/").set(
            recettes
        ).then(()=>{
            this.setState({openAlert:true,alertMessage:"Recette creer avec success",alertType:'success'})
        })

    }






    render() {

        return (
            <div >
                <Topbar></Topbar>
                {this.state.loading === true &&
                <Loader percentage={this.state.percentage+"%"}>

                </Loader>
                }


                <div className="wrapper">
                    <div className="container-fluid p-5 justify-content-around border border-success">



                                <div className="row justify-content-around align-items-center">
                                <div className="col-md-3">

                                    <TextField InputLabelProps={{
                                        shrink: true,
                                    }} required id="standard-required" label="Nom du repas"  style={{width:"100%"}}
                                     value={this.state.data.nomRecette}
                                    onChange={(e)=>this.handleChange(e,"nomRecette")}/>



                                </div>

                                <div className="col-md-3" >
                                    <div>
                                        <InputLabel id="demo-simple-select-label">Durée preparation du repas</InputLabel>
                                    </div>

                                    <Select
                                        onChange={(e)=>{this.handleChange(e,"Duree_prepa_repas")}}
                                        value={this.state.data.Duree_prepa_repas}
                                        style={{width:"100%"}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    >
                                        <MenuItem value={"5 min"}>5 min </MenuItem>
                                        <MenuItem value={"10 min"}>10 min</MenuItem>
                                        <MenuItem value={"15 min"}>15 min </MenuItem>
                                        <MenuItem value={"20 min "}>20 min </MenuItem>
                                        <MenuItem value={"30 min"}>30 min </MenuItem>
                                        <MenuItem value={"45 min"}>45 min </MenuItem>
                                    </Select>
                                </div>
                                </div>

                                <div className="row justify-content-around mt-3 align-items-center mt-3">
                                <div className="col-md-3" >
                                    <div>
                                        <InputLabel id="demo-simple-select-label">Durée cuission</InputLabel>
                                    </div>

                                    <Select
                                        value={this.state.data.Duree_Cuission}
                                        onChange={(e)=>this.handleChange(e,"Duree_Cuission")}
                                        style={{width:"100%"}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    >
                                        <MenuItem value={"5 min"}>5 min </MenuItem>
                                        <MenuItem value={"10 min"}>10 min</MenuItem>
                                        <MenuItem value={"15 min"}>15 min </MenuItem>
                                        <MenuItem value={"20 min"}>20 min </MenuItem>
                                        <MenuItem value={"30 min"}>30 min </MenuItem>
                                        <MenuItem value={"45 min"}>45 min </MenuItem>
                                    </Select>
                                </div>
                                <div  className="col-md-3">
                                    <div>
                                        <InputLabel id="demo-simple-select-label">Nombre de personnes</InputLabel>
                                    </div>

                                    <Select
                                        value={this.state.data.Nombre_person}
                                        onChange={(e)=>this.handleChange(e,"Nombre_person")}
                                        style={{width:"100%"}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    >
                                        <MenuItem value={"1"}>1 </MenuItem>
                                        <MenuItem value={"2"}>2</MenuItem>
                                        <MenuItem value={"3"}>3 </MenuItem>
                                        <MenuItem value={"4"}>4 </MenuItem>
                                        <MenuItem value={"5"}>5 </MenuItem>
                                        <MenuItem value={"6"}>6 </MenuItem>
                                        <MenuItem value={"7"}>7 </MenuItem>
                                        <MenuItem value={"8"}>8 </MenuItem>
                                        <MenuItem value={"9"}>9 </MenuItem>
                                    </Select>
                                </div>
                                </div>
                                <div className="row justify-content-around  align-items-center mt-3 ">
                                <div className="col-md-3">
                                    <TextField InputLabelProps={{
                                        shrink: true,
                                    }} id="standard-basic" label="Nombre de calories" type="number" style={{width:"100%"}}
                                    value={this.state.data.Nombre_calorie}
                                    onChange={(e)=>this.handleChange(e,"Nombre_calorie")}/>

                                </div>
                                <div className="col-md-3">
                                <div className="row align-items-center mt-3 text-center justify-content-center w-100 ">


                                    <TextField InputLabelProps={{
                                        shrink: true,
                                    }} id="standard-basic" label="Pourcentage glucides" type="number" style={{width:"90%"}}
                                    value={this.state.data.Pourcentrage_glucides}
                                    onChange={(e)=>this.handleChange(e,"Pourcentrage_glucides")}/>
                                    <InputLabel >%</InputLabel>





                                </div>
                                </div>
                                </div>

                        <div className="row justify-content-around align-items-center mt-3">
                            <div className="col-md-3">
                                <div className="row align-items-center mt-3 text-center justify-content-center ">


                                    <TextField  InputLabelProps={{
                                        shrink: true,
                                    }}id="standard-basic" label="Pourcentage Lipides" type="number"  style={{width:"90%"}}
                                    value={this.state.data.Pourcentrage_lipides}
                                    onChange={(e)=>this.handleChange(e,"Pourcentrage_lipides")}/>
                                    <InputLabel >%</InputLabel>

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="row align-items-center mt-3 text-center justify-content-center ">


                                    <TextField  InputLabelProps={{
                                        shrink: true,
                                    }}id="standard-basic" label="Pourcentage Proteines" type="number"  style={{width:"90%"}}
                                    value={this.state.data.Pourcentrage_proteines}
                                    onChange={(e)=>this.handleChange(e,"Pourcentrage_proteines")}/>
                                    <InputLabel >%</InputLabel>





                                </div>
                            </div>


                        </div>

                        <div className="row justify-content-around align-items-center mt-3">
                                <div className="col-md-3">
                                    <div className="row align-items-center mt-3 text-center justify-content-center ">


                                        <TextField InputLabelProps={{
                                            shrink: true,
                                        }} id="standard-basic" label="Gramme glucides" type="number" style={{width:"90%"}}
                                        value={this.state.data.Gramme_Glucide}
                                        onChange={(e)=>this.handleChange(e,"Gramme_Glucide")}/>
                                        <InputLabel >g</InputLabel>





                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="row align-items-center mt-3 text-center justify-content-center ">


                                        <TextField InputLabelProps={{
                                            shrink: true,
                                        }} id="standard-basic" label="Gramme lipides" type="number"  style={{width:"90%"}}
                                        value={this.state.data.Gramme_Lipide}
                                        onChange={(e)=>this.handleChange(e,"Gramme_Lipide")}/>
                                        <InputLabel >g</InputLabel>





                                    </div>
                                </div>
                        </div>
                        <div className="row justify-content-around mt-3">

                            <div className="col-md-3">
                                    <div className="row align-items-center mt-3 text-center justify-content-center ">


                                        <TextField InputLabelProps={{
                                            shrink: true,
                                        }} id="standard-basic" label="Gramme Proteines" type="number" style={{width:"90%"}}
                                        value={this.state.data.Gramme_Proteine}
                                        onChange={(e)=>this.handleChange(e,"Gramme_Proteine")}/>
                                        <InputLabel >g</InputLabel>





                                    </div>
                                </div>
                            <div className="col-md-3">
                                <div>
                                    <InputLabel id="demo-simple-select-label">Plats</InputLabel>
                                </div>

                                <Select
                                    value={this.state.data.plat}
                                    onChange={(e)=>this.handleChange(e,"plat")}
                                    style={{width:"100%"}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >
                                    <MenuItem value={"Petit déjeuner"}>Petit déjeuner </MenuItem>
                                    <MenuItem value={"Entrées"}>Entrées</MenuItem>
                                    <MenuItem value={"Plats principal"}>Plats principal</MenuItem>
                                    <MenuItem value={"Desserts"}>Desserts</MenuItem>
                                    <MenuItem value={"Apéritif dînatoire"}>Apéritif dînatoire </MenuItem>
                                    <MenuItem value={"Snacks"}>Snacks</MenuItem>
                                    <MenuItem value={"Soupes"}>Soupes</MenuItem>
                                    <MenuItem value={"Sauces"}>Sauces</MenuItem>
                                    <MenuItem value={"Shakes & smoothie"}>Shakes & Smoothie</MenuItem>
                                </Select>
                            </div>

                        </div>

                        <div className="row justify-content-around mt-3">


                            <div className="col-md-3">
                                <div>
                                    <InputLabel id="demo-simple-select-label">Tendances</InputLabel>
                                </div>

                                <Select
                                    value={this.state.data.Tendances}
                                    onChange={(e)=>this.handleChange(e,"Tendances")}
                                    style={{width:"100%"}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >
                                    <MenuItem value={"Express"}> Express </MenuItem>
                                    <MenuItem value={"Sans gluten"}>Sans gluten</MenuItem>
                                    <MenuItem value={"Végétariennes"}>Végétariennes</MenuItem>
                                    <MenuItem value={"Compatibles phase Starter"}>Compatibles phase Starter</MenuItem>
                                    <MenuItem value={"Sans Cuisson"}>Sans Cuisson</MenuItem>

                                </Select>
                            </div>
                            <div className="col-md-3">

                            </div>

                        </div>






                        <div className="row mt-5 justify-content-center ">
                            <div className="col-auto text-center">
                            <InputLabel>Ingredients : </InputLabel>
                            </div>
                            <div className="col-md-7">

                                <textarea value={this.state.data.Ingredients}
                                          onChange={(e)=>this.handleChange(e,"Ingredients")} style={{width:"100%",height:"200px"}}></textarea>
                            </div>

                        </div>
                        <div className="row mt-5 justify-content-center ">
                            <div className="col-auto text-center">
                                <InputLabel>Preparations : </InputLabel>
                            </div>
                            <div className="col-md-7">

                                <textarea value={this.state.data.Preparation}
                                          onChange={(e)=>this.handleChange(e,"Preparation")} style={{width:"100%",height:"200px"}}></textarea>
                            </div>

                        </div>

                        <div className="row mt-5 justify-content-center align-items-center ">
                            <div className="col-md-2 text-center">
                                <InputLabel>Upload photo : </InputLabel>
                            </div>
                            <div className="col-md-5">

                                <Button
                                        color="secondary"
                                        variant="contained"
                                        component="label"
                                >
                                    Upload photo
                                    <input
                                        onChange={(e)=>this.uploadImage(e )}


                                        type="file"
                                        style={{ display: "none" }}
                                    />
                                </Button>



                            </div>
                            <div className="col-md-3">

                                {(this.state.data.photo!=="" && this.state.data.photo!=null) &&



                                  <img alt="" src={this.state.data.photo} style={{width:200,height:200}}/>}



                            </div>

                        </div>
                        <div className="row mt-5 justify-content-center align-items-center ">
                            <div className="col-md-2 text-center">
                                <InputLabel>Upload video : </InputLabel>
                            </div>
                            <div className="col-md-5">

                                <Button
                                    color="secondary"
                                    variant="contained"
                                    component="label"
                                >
                                    Upload video
                                    <input
                                        onChange={(e)=>this.uploadVideo(e)}


                                        type="file"
                                        style={{ display: "none" }}
                                    />
                                </Button>



                            </div>
                            <div className="col-md-3">

                               {(this.state.data.video!==""&&this.state.data.video!=null) &&
                               <Player

                                   playsInline
                                   poster="/assets/poster.png"
                                   src={this.state.data.video}
                               />
                               }



                            </div>

                        </div>

                        <div className="row justify-content-center mt-5">
                            <Button




                                style={{background:"#4ca832",color:"white",width:"40%"}}
                                onClick={()=>{this.saveData()}}

                            >
                                Créer une recette
                            </Button>
                        </div>





                    </div>

                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openAlert}
                    autoHideDuration={5000}
                    onClose={this.closeSnackbar}
                >
                    <MySnackbarContentWrapper
                        onClose={this.closeSnackbar}
                        variant={this.state.alertType}
                        message={this.state.alertMessage}
                    />
                </Snackbar>
            </div>


    );
    }
    }

    export default AddRecette;
