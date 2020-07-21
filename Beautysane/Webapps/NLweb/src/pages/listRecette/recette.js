import React, {Component} from 'react';
import Topbar from "../../components/TopbarRecettes";

import "video-react/dist/video-react.css"; // import css
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import firebase from "firebase";
import  Loader from "../../components/Loader"
import hourglass from "../../assets/images/hourglass.svg"
import chef_hat from "../../assets/images/chef_hat.svg"

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import ClampLines from 'react-clamp-lines';
import Collapse from '@material-ui/core/Collapse';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Divider from '@material-ui/core/Divider';




import Snackbar from "@material-ui/core/Snackbar"





class recette extends Component {
    constructor(props){
        super(props);
        this.handleclick= this.handleclick.bind(this)
        this.Collapclick= this.Collapclick.bind(this)

        this.state={
            test:45,

            openAlert: false,
            alertMessage: "",
            alertType: "",
            loading :false,
            percentage:"",
            dataLength:"",
            recettes:[],
            val:"",
            open:true,
            colPlat:true,

            coltendance:false,
            colpreparation:false,
            coldifficulte:false,
            colrecette:false,
            coloccasion:false,
            plat:{
                dej:false,
                dess:false,
                ps:false
            }
        }
    }


handleclick(cat,name){
        this.setState({[cat]:{[name]:!this.state[cat][name]}})
}
    Collapclick(name){
        this.setState({[name]:!this.state[name]})
    }

    componentDidMount() {

        if (    this.props.match.params.id==="dejeuner"){
            this.setState({plat:{dej:true}})
        }else if (    this.props.match.params.id==="PlatPrincipal"){
            this.setState({plat:{ps:true}})
        }else if (    this.props.match.params.id==="dessert"){
            this.setState({plat:{dess:true}})
        }


        firebase.database().ref("recettes/").on("value", (snapshot) => {
            let recettes = snapshot.val();

            let rets =[]
            for (let i =0 ;i<recettes.length;i++){

                rets.push(recettes[i])

            }



              this.setState({recettes:rets})



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


                <div className="wrapper w-100">




                  <div className="container-fluid" >
                      <div className="row">
                          <div className="col-md-4 w-100">

                              <div className="card bg-white " style={{borderWidth:1,borderColor:"black"}}>
                                  <div className="row justify-content-around    align-items-center">
                                      <div>
                                          <h2 className="font-weight-bold">FILTRES</h2>
                                      </div>
                                      <div>
                                          <u>Supprimer des filtres</u>
                                      </div>


                                  </div>

                                  <hr style={{height:1, width:"100%",backgroundColor:"black"}}/>
                                  <ListItem button onClick={()=>{this.Collapclick("colPlat")}}>
                                      <ListItemIcon>

                                      </ListItemIcon>
                                      <ListItemText primary="PLAT" />
                                      {this.state.colPlat? <ExpandLess /> : <ExpandMore />}
                                  </ListItem>

                                  <Collapse in={this.state.colPlat} timeout="auto" unmountOnExit>
                                      <div >
                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                              <FormControlLabel
                                                  control={<Checkbox checked={this.state.plat.dej} onChange={()=>this.handleclick("plat","dej")}  />}
                                                  label="Petit déjeuner "
                                              />
                                              </div>
                                                 <div className="col-md-4">
                                              <FormControlLabel
                                                  control={<Checkbox checked={false}  />}
                                                  label="Snacks"
                                              />
                                                 </div>
                                          </div>
                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                              <FormControlLabel
                                                  control={<Checkbox checked={false} name="gilad" />}
                                                  label="Entrées "
                                              />
                                              </div>
                                              <div className="col-md-4">
                                              <FormControlLabel
                                                  control={<Checkbox checked={false} name="gilad" />}
                                                  label="Soupes"
                                              />
                                              </div>
                                          </div>
                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                              <FormControlLabel
                                                  control={<Checkbox checked={this.state.plat.ps}  onChange={()=>this.handleclick("plat","ps")} />}
                                                  label="Plats principal "
                                              />
                                              </div>
                                              <div className="col-md-4">
                                              <FormControlLabel
                                                  control={<Checkbox checked={false} name="gilad" />}
                                                  label="Sauces"
                                              />
                                              </div>
                                          </div>
                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                              <FormControlLabel
                                                  control={<Checkbox checked={this.state.plat.dess}   onChange={()=>this.handleclick("plat","dess")} />}
                                                  label="Dessert"
                                              />
                                              </div>
                                              <div className="col-md-4">
                                              <FormControlLabel
                                                  control={<Checkbox checked={false} name="gilad" />}
                                                  label="Apéritif dînatoire "
                                              />
                                              </div>
                                          </div>
                                      </div>
                                  </Collapse>
                                  <Divider/>

                                  <ListItem button onClick={()=>{this.Collapclick("coltendance")}}>
                                      <ListItemIcon>

                                      </ListItemIcon>
                                      <ListItemText primary="Tendances" />
                                      {this.state.coltendance ? <ExpandLess /> : <ExpandMore />}
                                  </ListItem>

                                  <Collapse in={this.state.coltendance} timeout="auto" unmountOnExit>
                                      <div >
                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={false} name="gilad"  />}
                                                      label="Express"
                                                  />
                                              </div>
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={true} name="gilad" />}
                                                      label="Sans gluten"
                                                  />
                                              </div>
                                          </div>
                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={false} name="gilad" />}
                                                      label="Végétarienne "
                                                  />
                                              </div>
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={false} name="gilad" />}
                                                      label="Compatibles phase Starter"
                                                  />
                                              </div>
                                          </div>
                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={false} name="gilad" />}
                                                      label="Sans cuisson"
                                                  />
                                              </div>
                                              <div className="col-md-4">

                                              </div>
                                          </div>

                                      </div>
                                  </Collapse>
                                  <Divider/>

                                  <ListItem button onClick={()=>this.handleclick("preparation")}>
                                      <ListItemIcon>

                                      </ListItemIcon>
                                      <ListItemText primary="Preparation" />
                                      {this.state.preparation ? <ExpandLess /> : <ExpandMore />}
                                  </ListItem>

                                  <Collapse in={this.state.preparation} timeout="auto" unmountOnExit>
                                      <div >
                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={false} name="gilad"  />}
                                                      label="max 10 min"
                                                  />
                                              </div>
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={true} name="gilad" />}
                                                      label="max 15 min"
                                                  />
                                              </div>
                                          </div>
                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={false} name="gilad" />}
                                                      label="max 30 min  "
                                                  />
                                              </div>
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={false} name="gilad" />}
                                                      label="max 45 min "
                                                  />
                                              </div>
                                          </div>
                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={false} name="gilad" />}
                                                      label="Plus de 45 min "
                                                  />
                                              </div>
                                              <div className="col-md-4">

                                              </div>
                                          </div>

                                      </div>
                                  </Collapse>
                                  <Divider/>
                                  <ListItem button onClick={()=>this.handleclick("difficulte")}>
                                      <ListItemIcon>

                                      </ListItemIcon>
                                      <ListItemText primary="Difficulté" />
                                      {this.state.difficulte ? <ExpandLess /> : <ExpandMore />}
                                  </ListItem>

                                  <Collapse in={this.state.difficulte} timeout="auto" unmountOnExit>
                                      <div >
                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={false} name="gilad"  />}
                                                      label="Facile"
                                                  />
                                              </div>
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={true} name="gilad" />}
                                                      label="Moyenne"
                                                  />
                                              </div>
                                          </div>

                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={false} name="gilad" />}
                                                      label="Difficile"
                                                  />
                                              </div>
                                              <div className="col-md-4">

                                              </div>
                                          </div>

                                      </div>
                                  </Collapse>
                                  <Divider/>
                                  <ListItem button onClick={()=>this.handleclick("recette")}>
                                      <ListItemIcon>

                                      </ListItemIcon>
                                      <ListItemText primary="Recette" />
                                      {this.state.recette ? <ExpandLess /> : <ExpandMore />}
                                  </ListItem>

                                  <Collapse in={this.state.recette} timeout="auto" unmountOnExit>
                                      <div >
                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={false} name="gilad"  />}
                                                      label="Top recette"
                                                  />
                                              </div>
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={true} name="gilad" />}
                                                      label="Toutes les recettes"
                                                  />
                                              </div>
                                          </div>


                                      </div>
                                  </Collapse>
                                  <Divider/>
                                  <ListItem button onClick={()=>this.handleclick("occasion")}>
                                      <ListItemIcon>

                                      </ListItemIcon>
                                      <ListItemText primary="Occasion" />
                                      {this.state.occasion ? <ExpandLess /> : <ExpandMore />}
                                  </ListItem>

                                  <Collapse in={this.state.occasion} timeout="auto" unmountOnExit>
                                      <div >
                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={false} name="gilad"  />}
                                                      label="Chandeleur"
                                                  />
                                              </div>
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={true} name="gilad" />}
                                                      label="Noël"
                                                  />
                                              </div>
                                          </div>
                                          <div className="row justify-content-around">
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={false} name="gilad" />}
                                                      label="Saint Valentin   "
                                                  />
                                              </div>
                                              <div className="col-md-4">
                                                  <FormControlLabel
                                                      control={<Checkbox checked={false} name="gilad" />}
                                                      label="Pàques"
                                                  />
                                              </div>
                                          </div>


                                      </div>
                                  </Collapse>

                              </div>


                          </div>
                          <div className="col-md-8">
                              <div>
                                  <h2   >4 Recettes</h2>
                              </div>
                              <div className="mt-4">



                                  <div className="row">
                                      {this.state.recettes.map((item,key)=>(

                                          (((this.state.plat.dej===true?item.plat.includes("Petit déjeuner"):"")|| (this.state.plat.dess===true?item.plat.includes("Dessert"):"")|| (this.state.plat.ps===true?item.plat.includes("Plats principal"):"")))
                                          &&
                                          <div className="col-md-4 mt-3">
                                              <div className="card" style={{width:"80%",height:"100%"}}>
                                                  <img  className="card-img-top" src={item.photo} style={{width:"100%",height:200}} alt="Card  cap"/>
                                                  <div className="card-body">
                                                      <h5 className="card-title">{item.nomRecette}</h5>
                                                      <div className="row align-items-end">

                                                          <div className="col-md-1">
                                                              <img alt="" src={hourglass}/>

                                                          </div>
                                                          <div>
                                                              <small>{item.Duree_prepa_repas.toString().toUpperCase()} </small>

                                                          </div>
                                                          <div className="col-md-1 ml-2">
                                                              <img alt="" src={chef_hat}/>

                                                          </div>
                                                          <div>
                                                              <small> Facile </small>

                                                          </div>

                                                      </div>

                                                      <div>
                                                          <ClampLines
                                                              text={item.Preparation}
                                                              id="really-unique-id"
                                                              lines={3}
                                                              ellipsis="..."
                                                              buttons={false}
                                                              lessText="Collapse"
                                                              className="custom-class"
                                                              innerElement="p"
                                                          />

                                                      </div>
                                                  </div>

                                                  <div className="card-body">
                                                      <text style={{cursor:"pointer"}} className="card-link"><u style={{color:"black"  }}>Lire la suite</u></text>

                                                  </div>
                                              </div>

                                          </div>
                                      ))}




                                  </div>
                              </div>
                          </div>

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

export default recette;
